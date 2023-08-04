import { helpers, RouterContext } from "../deps.ts";
import * as log from "https://deno.land/std@0.74.0/log/mod.ts";


import { db } from '../db/database.ts';
import { UserUpdate, User, NewUser } from '../db/types'

export async function findUser(criteria: Partial<User>) {
  let query = db.selectFrom('projects.users')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
  }

  return await query.selectAll().execute()
}


async function updateUser(id: number, updateWith: UserUpdate) {
  await db.updateTable('projects.users').set(updateWith).where('id', '=', id).execute()
}


async function createUser(user: NewUser) {
  return await db.insertInto('projects.users')
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow()
}


class UserCtrl {
  async get(ctx: RouterContext, next: Function) {
    log.info("UserCtrl.get(...)");
    //let top = ctx.request.url;
    // await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
    let top = ctx.request.url.searchParams.get("top");
    let params = helpers.getQuery(ctx, { mergeParams: true });
    console.log("UserCtrl.get(...). top=", top, params);

    //let users = await User.get();
    let users = await findUser({});

    log.info(`Found ${users.length} rows`);
    ctx.response.body = users ? users : "undefined";
  }

  async patch(ctx: RouterContext) {
    let updated: any;
    log.info("UserCtrl.patch(...)");
    let body = await ctx.request.body().value;
    log.info(
      `body.value: ${JSON.stringify(body.value)} body.filter: ${
        JSON.stringify(body.filter)
      }`,
    );

    try {
      //updated = await User.where(body.filter).update(body.value);

      updated = await updateUser(body.filter, body.value);

    } catch (error) {
      ctx.response.body = { error: error };
      log.error(error);
      return;
    }
    log.info(`Updated Users ${updated}`);
    ctx.response.body = updated;
  }

  async post(ctx: RouterContext) {
    let added: any;
    log.info("UserCtrl.post(...)");
    let body = await ctx.request.body().value;
    delete body.id;
    log.info(body);
    try {
      //added = await User.create(body);

      added = await createUser(body)

    } catch (error) {
      ctx.response.body = { error: error };
      log.error(error);
      return;
    }
    log.info(`Added User ${JSON.stringify(added)}`);
    ctx.response.body = added;
  }

  async insertOne(user) {
    log.info(user);
    try {
      //let added = await User.create({ ...user });

      let added = await createUser({...user});

      return added;
    } catch (error) {
      log.error(error);
      return null;
    }
  }
}

const userCtrl = new UserCtrl();

export default userCtrl;
