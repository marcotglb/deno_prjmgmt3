/*
Exports an instance of the database class.
*/

import { DataTypes, Database, Model, PostgresConnector } from "https://deno.land/x/denodb@v1.4.0/mod.ts"; //'https://deno.land/x/denodb/mod.ts';
// deno run --allow-net --allow-read --unstable mod.ts
//import { Client } from 'https://deno.land/x/postgres/mod.ts';
//import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { QueryObjectResult } from 'https://deno.land/x/postgres/query/query.ts';
//import * as log from "https://deno.land/std@0.75.0/log/mod.ts";


const connPars = {
  host: 'localhost',
  hostname: 'localhost', 
  username: 'prjadmin',
  user: 'prjadmin', 
  password: 'prjadmin',
  database: 'projects_dev' 
}


/*
const connPars = {
  host: 'it0lstagu1',
  hostname: 'it0lstagu1',
  username: 'automation',
  user: 'automation',
  password: 'automation',
  database: 'storagedb1',
}
*/


const connector = new PostgresConnector(connPars);

const db = new Database(connector);



const dbClient = new Client(connPars);
//await dbClient.connect();




/*

class User extends Model {
    static table = 'project.users';
  
    static fields = {
      id: { primaryKey: true, autoIncrement: true },
      logon: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      organizationcode: DataTypes.INTEGER,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      auth_type: DataTypes.STRING
    };
  
    static defaults = {
      organizationcode: 1,
      auth_type: 'local'
    };
  }

  db.link([User]);


  const user = new User();

  let users = await User.select('logon').where('logon', 'gimmy').all();
  log.info (users);
  */

export { db, Model, DataTypes, dbClient, QueryObjectResult }
  

