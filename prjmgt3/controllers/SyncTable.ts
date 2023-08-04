import { RouterContext } from "../deps.ts";
import * as log from "https://deno.land/std@0.74.0/log/mod.ts";
import { SyncTable, syncTableQuery } from "../models/SyncTable.ts";

class SyncTableCtrl {
  async get(ctx: RouterContext) {
    log.info("SyncTales.get(...)");
    let body = await ctx.request.body().value;
    log.info(body);
    let syncTables = await syncTableQuery.query(body);
    log.info(`Found ${syncTables.length} rows`);
    ctx.response.body = syncTables ? syncTables : "undefined";
  }
  async post(ctx: RouterContext) {
    log.info("SyncTables.post(...)");
    let body = await ctx.request.body().value;
    log.info(body);
    let syncTable: any;
    let _meta = body._meta;
    delete body._meta;
    if (_meta.action == "triggerDel") {
      let keys = [];
      for (let k in body.key) {
        keys.push(k);
      }
      syncTable = await (new SyncTable(body)).triggerDel(
        { schema: body.table_schema, name: body.table_name }
      );
      log.info(`Trigger added ${syncTable}`);
      ctx.response.body = syncTable ? syncTable : "undefined";
    } else if (_meta.action == "triggerAdd") {
      let keys = [];
      for (let k in body.key) {
        keys.push(k);
      }
      syncTable = await (new SyncTable(body)).triggerAdd(
        { schema: body.table_schema, name: body.table_name },
        keys,
      );
      log.info(`Trigger added ${syncTable}`);
      ctx.response.body = syncTable ? syncTable : "undefined";
    } else if (_meta.action == "add") {
      syncTable = await (new SyncTable(body)).add();
      log.info(`Added ${syncTable}`);
      ctx.response.body = syncTable ? syncTable : "undefined";
    } else if (_meta.action == "upd") {
      syncTable = await (new SyncTable(body)).upd();
      log.info(`Updated ${syncTable}`);
      ctx.response.body = syncTable ? syncTable : "undefined";
    } else if (_meta.action == "del") {
      syncTable = await (new SyncTable(body)).del();
      log.info(`Deleted ${syncTable}`);
      ctx.response.body = "undefined";
    }
  }
}

const syncTableCtrl = new SyncTableCtrl();

export default syncTableCtrl;
