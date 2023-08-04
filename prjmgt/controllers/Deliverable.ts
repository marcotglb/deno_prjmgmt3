import { helpers, RouterContext } from "../deps.ts";
import * as log from "https://deno.land/std/log/mod.ts";
import { Deliverable } from "../models/Database.ts";

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
    let deliverables = await Deliverable.where(params).get();
    log.info(`Found ${deliverables.length} rows`);
    ctx.response.body = deliverables ? deliverables : "undefined";
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
      await Deliverable.where(body.filter).update(body.value);
      updated = await Deliverable.where(body.filter).get();
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
      deleted = await Deliverable.where(body).delete();
      //updated = await Deliverable.where(body.filter).get();
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
      added = await Deliverable.create(body);
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
