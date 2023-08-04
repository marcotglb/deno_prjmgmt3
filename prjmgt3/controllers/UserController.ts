//import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
// import * as bcrypt from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts';
//import hash from "https://deno.land/x/object_hash/mod.ts";


/*
import {
  compare as passwordVerify,
  hash as passwordHash,
} from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
*/


import { helpers, RouterContext } from "../deps.ts";
import * as log from "https://deno.land/std/log/mod.ts";

import { generateJwt } from "./Jwt.ts"

import { db } from '../db/database.ts';
import { Users, SelUser, UserUpdate, NewUser } from '../db/types.ts'
//import Users from "../../prjmgt-vue3/src/components/users/Users.js";


async function hashPassword(password: string) {
  /*
  const salt = await bcrypt.genSalt(8);
  return await bcrypt.hash(password, salt);
  */
  return password;
}


export async function findUser(criteria: Partial<SelUser>) {
  let query = db.selectFrom('projects.users')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id) 
  }

  if (criteria.username) {
    console.log('Searching user by username:', criteria.username)
    query = query.where('username', '=', criteria.username) 
  }

  return await query.selectAll().execute()
}

export async function findOneUser(criteria: Partial<SelUser>) {
  return (await findUser(criteria))[0];
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

export async function deleteUser(id: number) {
  return await db.deleteFrom('projects.users').where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}

class UserController {
  async create(values: any) {
    // Call static user method
    const password = await hashPassword(values.password);

    const user: Users = {
      id: null,
      org_id: null,
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: password,
    };
    console.log ('UserController.Create. user:', user)

    //await User.create(user as any);
    await createUser(user as any);

    return values;
  }
  async delete(id: number) {
    //await User.deleteById(id);
    await deleteUser(id)
  }

  getAll() {
    //return User.all();
    return findUser({});

  }

  getOne(id: string) {
    //return User.where("id", id).first();
    return findUser({id: id});
  }

  async update(id: number, values: any) {
    //await User.where("id", id).update(values as any);
    //return this.getOne(id);

    await updateUser(id, values);
    return findUser({id: id});

  }


  async patch(ctx: RouterContext) {
    let updated: any;
    log.info("UserCtrl.patch(...)");
    let body = await ctx.request.body().value;
    log.info(
      `body.value: ${JSON.stringify(body)} body.filter: ${
        JSON.stringify(body.filter)
      }`,
    );
    try {
      updated = await updateUser(body.filter.id, body.value);

    } catch (error) {
      ctx.response.body = { error: error };
      log.error(error);
      return;
    }
    log.info(`Updated Userss ${updated}`);
    ctx.response.body = updated;
  };


  async login(username: string, password: string) {
    //console.log ('username:', username, '  password:', password)
    
    //const user = await User.where("username", username).first();
    let user = await findOneUser({username: username});
    console.log('user:', user);
    if (!user || !(  password == user.password /*await bcrypt.compare(password, user.password)*/ )) {
      return {jwt: null, ...user};
    }
    delete user.password;
    return {jwt: await generateJwt(user.id as string), ...user};

  }
}

export { UserController }