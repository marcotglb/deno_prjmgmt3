import { helpers, RouterContext } from "../deps.ts";
import * as log from "https://deno.land/std/log/mod.ts";

import { db } from '../db/database.ts';
import { DeliverableUpdate, Deliverable, NewDeliverable } from '../db/types.ts'


export async function findDeliverable(criteria: Partial<Deliverable>) {
  let query = db.selectFrom('projects.v_deliverables')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id)
  }

  if (criteria.top) {
    console.log('top:', criteria.top)
    query = query.where('father', '=', criteria.top)
  }

  log.info(query.compile());

  let deliverables = await query.selectAll().execute();
  return deliverables;
}


async function updateDeliverable(id: number, updateWith: DeliverableUpdate) {
  return await db.updateTable('projects.deliverables').set(updateWith).where('id', '=', id)
  .returningAll()
  .executeTakeFirst()
}


async function createDeliverable(deliverable: NewDeliverable) {
  return await db.insertInto('projects.deliverables')
    .values(deliverable)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function deleteDeliverable(id: number) {
  return await db.deleteFrom('projects.deliverables').where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}

class DeliverableCtrl {
  async get(ctx: RouterContext, next: Function) {
    log.info("DeliverableCtrl.get(...)");
    //let top = ctx.request.url;
    // await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
    let top = ctx.request.url.searchParams.get("top");
    let params = helpers.getQuery(ctx, { mergeParams: true });
    console.log("DeliverableCtrl.get(...). top=", top, params);

    // let deliverables = await Deliverable.where(params).get();
    let deliverables = await findDeliverable(params);

    log.info(`Found ${deliverables.length} rows`);
    ctx.response.body = deliverables ? deliverables : [];
  }

  async patch(ctx: RouterContext) {
    let updated: any;
    log.info("DeliverableCtrl.patch(...)");
    let body = await ctx.request.body().value;
    log.info(
      `body.value: ${JSON.stringify(body)} body.filter: ${
        JSON.stringify(body.filter)
      }`,
    );
    try {
      /*
      await Deliverable.where(body.filter).update(body.value);
      updated = await Deliverable.where(body.filter).get();
      */

      updated = await updateDeliverable(body.filter.id, body.value);


    } catch (error) {
      ctx.response.body = { error: error };
      log.error(error);
      return;
    }
    log.info(`Updated Deliverables ${updated}`);
    ctx.response.body = updated;
  }

  async delete(ctx: RouterContext) {
    let deleted: any;
    log.info("DeliverableCtrl.del(...)");
    let body = await ctx.request.body().value;
    log.info(`body.value: ${JSON.stringify(body)} body.data: ${JSON.stringify(body)}`);
    try {

      //deleted = await Deliverable.where(body).delete();
      deleted = await deleteDeliverable(body.id);

    } catch (error) {
      ctx.response.body = { error: error };
      log.error(error);
      return;
    }
    log.info(`Deleted Deliverables ${deleted}`);
    ctx.response.body = deleted;
  }

  async post(ctx: RouterContext) {
    let added: any;
    log.info("DeliverableCtrl.post(...)");
    let body = await ctx.request.body().value;
    delete body.id;
    log.info(body);
    try {
      //added = await Deliverable.create(body);

      added = createDeliverable(body);

    } catch (error) {
      ctx.response.body = { error: error };
      log.error(error);
      return;
    }
    log.info(`Added Deliverabled ${JSON.stringify(added)}`);
    ctx.response.body = added;
  }
}

const deliverableCtrl = new DeliverableCtrl();

export default deliverableCtrl;
