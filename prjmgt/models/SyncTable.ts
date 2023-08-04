/*
Exports the SyncTable model.
It is a class representing a business object
*/

import * as log from "https://deno.land/std@0.74.0/log/mod.ts";
import { SyncTable_db } from "../models/Database.ts";
import { dbClient, QueryObjectResult } from "../controllers/db.ts";

class BusinessObject {
  /*
  constructor(public data: any) {
    return this;
  }
  */
}

interface SyncTableData {
  table_name: string;
  key: any;
  joincond: string;
  seqname: string;
  table_schema: string;
}

class SyncTable extends BusinessObject {
  sync_table: SyncTable_db;
  constructor(public data: SyncTableData) {
    super();
    this.sync_table = new SyncTable_db();
    return this;
  }
  async add() {
    log.info("SyncTable.add()");
    let syncTableRow = { ...this.data };
    syncTableRow.key = JSON.stringify(syncTableRow.key);
    let rows;
    let query;
    try {
      this.sync_table = await SyncTable_db.create(syncTableRow);
    } catch (error) {
      log.error(error);
    }
    //this.sync_table = rows;
    console.log("rows:", rows);
    return this.sync_table;
  }
  upd() {
  }

  del() {
  }

  async sequencePatch() {
    log.info("SyncTable.triggerAdd()");
    let result;
    let nextSeqValue;
  
    try {
      nextSeqValue = await dbClient.queryObject (`select nextval('${this.data.table_schema}.${this.data.seqname}')`); 
      log.info(`Next sequence value: ${nextSeqValue}`);
      //result = await dbClient.queryObject (`alter sequence ${this.data.seqname} increment by 10 restart with ${nextSeqValue}`);
     //queries.push (dbClient.queryObject (`create trigger sync_upd after update on "${table.schema}"."${table.name}" for each row execute function sync_update(${keys});`));
    } catch (error) {
      log.error(error);
    }
    
    log.info(JSON.stringify(nextSeqValue));
    return nextSeqValue;
  }

  async triggerAdd(table: any, keys: any) {
    log.info("SyncTable.triggerAdd()");
    let result;
    let queries: Promise<QueryObjectResult<any>>[] = [];
    queries.push (dbClient.queryObject (`create trigger sync_upd after update on "${table.schema}"."${table.name}" for each row execute function sync_update(${keys});`));
    queries.push (dbClient.queryObject (`create trigger sync_del after delete on "${table.schema}"."${table.name}" for each row execute function sync_update(${keys});`));
    queries.push (dbClient.queryObject (`create trigger sync_ins after insert on "${table.schema}"."${table.name}" for each row execute function sync_update(${keys});`));
    try {
      result = Promise.all(queries);
     //queries.push (dbClient.queryObject (`create trigger sync_upd after update on "${table.schema}"."${table.name}" for each row execute function sync_update(${keys});`));
    } catch (error) {
      log.error(error);
    }
    
    log.info(JSON.stringify(result));
    return result;
  }

  async triggerDel(table: any) {
    log.info("SyncTable.triggerDel()");
    let result;
    let queries: Promise<QueryObjectResult<any>>[] = [];
    queries.push (dbClient.queryObject (`drop trigger sync_upd on "${table.schema}"."${table.name}"`));
    queries.push (dbClient.queryObject (`drop trigger sync_del on "${table.schema}"."${table.name}"`));
    queries.push (dbClient.queryObject (`drop trigger sync_ins on "${table.schema}"."${table.name}"`));
    try {
      result = Promise.all(queries);
     //queries.push (dbClient.queryObject (`create trigger sync_upd after update on "${table.schema}"."${table.name}" for each row execute function sync_update(${keys});`));
    } catch (error) {
      log.error(error);
    }
    
    log.info(JSON.stringify(result));
    return result;
  }

}

class SyncTableQuery {
  async query(query: any) {
    log.info("SyncTableQuery()", query);
    let collection = await SyncTable_db.all();
    return collection;
  }
}

const syncTableQuery = new SyncTableQuery();

export { SyncTable, syncTableQuery };
