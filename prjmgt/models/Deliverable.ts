
/*
Exports the Deliverable model.
It is a class representing a database object
*/

import { db, Model, DataTypes } from "../controllers/db.ts"
import * as log from "https://deno.land/std@0.75.0/log/mod.ts";

class Deliverable extends Model {
    static table = 'projects.deliverables';
  
    static fields = {
      id: { primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      deliverd: DataTypes.DATE,
      who: DataTypes.STRING,
      father: DataTypes.INTEGER,
      what: DataTypes.STRING,
      effort: DataTypes.STRING,
      status: DataTypes.STRING
    };
  
    static defaults = {
    };
  }


  
  db.link([Deliverable]);
  
  //let query =  Deliverable.all();
  //log.info (await query);
  
  
  export { Deliverable }