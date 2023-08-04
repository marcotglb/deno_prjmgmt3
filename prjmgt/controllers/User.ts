import { helpers, RouterContext } from "../deps.ts";
import * as log from "https://deno.land/std@0.74.0/log/mod.ts";
import { User } from "../models/Database.ts";



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
    let users = await User.get();
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
      updated = await User.where(body.filter).update(body.value);
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
      added = await User.create(body);
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
      let added = await User.create({ ...user });
      return added;
    } catch (error) {
      log.error(error);
      return null;
    }
  }
}

const userCtrl = new UserCtrl();

export default userCtrl;
