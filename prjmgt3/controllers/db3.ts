import {
  Kysely,
  Generated,
  ColumnType,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "https://esm.sh/kysely";
import { PostgreSQLDriver } from "https://deno.land/x/kysely_deno_postgres/mod.ts";

const db = new Kysely({
  dialect: {
    createAdapter() {
      return new PostgresAdapter();
    },
    createDriver() {
      return new PostgreSQLDriver({
        // If connectionString is passed, other options are ignored.
        // connectionString: Deno.env.get('DATABASE_URL'),
        applicationName: "MyApp",
        connection: {
          attempts: 1,
        },
        database: 'projects_dev',
        hostname: "localhost",
        //schema: "projects",
        host_type: "tcp", // "tcp" | "socket"
        password: "prjadmin",
        port: 5432,
        tls: {
          enabled: true,
          enforce: false,
          caCertificates: [],
        },
        user: "prjadmin",
      });
    },
    createIntrospector(db: Kysely<unknown>) {
      return new PostgresIntrospector(db);
    },
    createQueryCompiler() {
      return new PostgresQueryCompiler();
    },
  },
});

/*

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

export interface Users {
  id: Generated<number>;
  org_id: Generated<number>;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: Generated<string | null>;
}

// Keys of this interface are table names.

export interface Database {
  deliverables: Deliverables,
  "projects.users": Users
}

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

export { db, ColumnType };