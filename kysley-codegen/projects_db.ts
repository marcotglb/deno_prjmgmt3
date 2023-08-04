import type { ColumnType } from "kysely";

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

export interface Pet {
  id: Generated<number>;
  name: string | null;
  owner_id: number | null;
  species: string | null;
}

export interface PublicPerson {
  id: Generated<number>;
  gender: string | null;
  first_name: string | null;
  last_name: string | null;
  modified_at: Timestamp | null;
}

export interface PublicPet {
  id: Generated<number>;
  name: string | null;
  owner_id: number | null;
  species: string | null;
}

export interface Users {
  id: Generated<number>;
  org_id: Generated<number>;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: Generated<string | null>;
}

export interface DB {
  deliverables: Deliverables;
  pet: Pet;
  "public.person": PublicPerson;
  "public.pet": PublicPet;
  users: Users;
}
