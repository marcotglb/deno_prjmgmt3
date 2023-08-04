/*
Export moldels (classes) for some databases objects
*/

import { db } from "../controllers/db3";
import { ColumnType, Generated, Insertable, Selectable, Updateable } from "https://esm.sh/kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Deliverables {
  id: Generated<number>;
  title: string | null;
  delivered: Generated<Timestamp | null>;
  who: string | null;
  father: number | null;
  what: string | null;
  effort: number | null;
  status: string | null;
  completed: Generated<number | null>;
}

export type Deliverable = Selectable<Deliverables>
export type NewDeliverable = Insertable<Deliverables>
export type DeliverableUpdate = Updateable<Deliverables>


export interface Users {
  id: Generated<number>;
  org_id: Generated<number>;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: Generated<string | null>;
}

export type User = Selectable<Users>
export type NewUser = Insertable<Users>
export type UserUpdate = Updateable<Users>


// Keys of this interface are table names.

export interface Database {
  "projects.deliverables": Deliverables,
  "projects.users": Users
}

/*
async function demo() {
  
  const { id } = await db
    .insertInto('projects.users')
    .values({ username: 'Jennifer', firstname: 'Jennifer', lastname: 'Powell', email: "jpowell@gmal.com" })
    .returning('id')
    .executeTakeFirstOrThrow()

  
  const user = await db
    .selectFrom('projects.users')
    .where('users.id', '=', id)
    .selectAll('projects.users')
    .executeTakeFirst()

  if (user) {
    console.info(user)
  }
  
}

demo();
*/

export { db };
