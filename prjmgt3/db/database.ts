import { Database } from './types.ts' // this is the Database interface we defined earlier
import { Kysely, PostgresAdapter, PostgresIntrospector, PostgresQueryCompiler } from "https://esm.sh/kysely";
import { PostgreSQLDriver } from "https://deno.land/x/kysely_deno_postgres/mod.ts";

export const db = new Kysely<Database>({
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
  log(event) {
    if (event.level === 'query') {
      console.log(event.query.sql)
      console.log(event.query.parameters)
    }
  }
});

