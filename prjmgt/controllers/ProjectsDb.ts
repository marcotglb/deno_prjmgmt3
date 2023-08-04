import { DataTypes, Database, Model, Relationships } from 'https://deno.land/x/denodb/mod.ts';
import * as log from "https://deno.land/std@0.75.0/log/mod.ts";

const db = new Database('postgres', {
  host: 'localhost',
  username: 'prjadmin',
  password: 'prjadmin',
  database: 'projects',
});

export { db, Model, DataTypes, Relationships }
  

