/*
Export moldels (classes) for some databases objects
*/

import { DataTypes, db, Model } from "../controllers/db.ts";

/*
import * as log from "https://deno.land/std@0.75.0/log/mod.ts";
//import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

import secureKey from "../controllers/SecureKey.ts"

import {
  create,
  getNumericDate,
  Header, 
  Payload,
} //from "https://deno.land/x/djwt/create.ts"; 
 from "https://deno.land/x/djwt/mod.ts";

import { JwtConfig } from "../controllers/Jwt.ts";
*/

class Deliverable extends Model {
  static table = "projects.v_deliverables";

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    top: DataTypes.INTEGER,
    sons: DataTypes.INTEGER,
    title: DataTypes.STRING,
    deliverd: DataTypes.DATE,
    who: DataTypes.STRING,
    father: DataTypes.INTEGER,
    what: DataTypes.STRING,
    effort: DataTypes.INTEGER,
    status: DataTypes.STRING,
    completed: DataTypes.FLOAT,
    sub_effort: DataTypes.INTEGER,
    sub_completed: DataTypes.FLOAT,
  };

  static defaults = {};
}

export interface IUser {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
}

class User extends Model {
  static table = "projects.users";

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    effort: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    org_id: DataTypes.INTEGER,
  };
  static async hashPassword(password: string) {
    /*
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(password, salt);
    */
    return password;
  }

  /*
  static async generateJwt(id: string) {
    // Create the payload with the expiration date (token have an expiry date) and the id of current user (you can add that you want)
    const payload: Payload = {
      id,
      exp: getNumericDate(JwtConfig.expirationTime), //setExpiration(new Date().getTime() + JwtConfig.expirationTime),
    };
    const header: Header = {
      alg: "HS512", //wtConfig.alg as Algorithm,
      typ: JwtConfig.type,
    };

    const key = await secureKey; //.getInstance();
    console.log ('generateJwt. key:', key)

    // return the generated token
    return create(header, payload, key); // JwtConfig.secretKey );
  }
  */

  static defaults = {};
}

class SyncTable_db extends Model {
  static table = "project.sync_tables";

  static fields = {
    table_name: DataTypes.STRING,
    table_schema: DataTypes.STRING,
    deliverd: DataTypes.DATE,
    key: DataTypes.JSON,
    joincond: DataTypes.STRING,
    seqname: DataTypes.STRING,
  };

  static defaults = {};
}

db.link([User, Deliverable, SyncTable_db]);

/*
  const v_users =  V_User.select('*').where({password: 'usa', logon: 'abram'}).all();
  // console.log (query.toString())
  log.info ('Useers: -------------------------')
  log.info (await v_users);


  const deliverables =  Deliverable.select('*').all();
  log.info ('Deliverables: -------------------')
  log.info (await deliverables);
  */

export { Deliverable, SyncTable_db, User };
