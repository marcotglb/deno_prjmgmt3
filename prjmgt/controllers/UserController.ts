//import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
// import * as bcrypt from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts';
//import hash from "https://deno.land/x/object_hash/mod.ts";


/*
import {
  compare as passwordVerify,
  hash as passwordHash,
} from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
*/

import { generateJwt } from "./Jwt.ts"
import { IUser, User } from "../models/Database.ts";
./run.sh

class UserController {
  async create(values: any) {
    // Call static user method
    const password = await User.hashPassword(values.password);

    const user: IUser = {
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password,
    };
    console.log ('UserController.Create. user:', user)
    await User.create(user as any);

    return values;
  }
  async delete(id: string) {
    await User.deleteById(id);
  }

  getAll() {
    return User.all();
  }

  getOne(id: string) {
    return User.where("id", id).first();
  }

  async update(id: string, values: any) {
    await User.where("id", id).update(values as any);
    return this.getOne(id);
  }

  async login(username: string, password: string) {
    //console.log ('username:', username, '  password:', password)
    const user = await User.where("username", username).first();
    if (!user || !(  password == user.password /*await bcrypt.compare(password, user.password)*/ )) {
      return {jwt: null, ...user};
    }
    delete user.password;
    return {jwt: await generateJwt(user.id as string), ...user};

  }
}

export { UserController }