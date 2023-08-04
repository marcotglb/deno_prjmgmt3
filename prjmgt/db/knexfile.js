// Update with your config settings.

require('dotenv').config()

const { CLIENT, HOST, PG_PORT } = process.env


module.exports = {

  development: {
    client: CLIENT,
    connection: {
      database: 'projects_dev',
      user: 'prjadmin',
      password: 'prjadmin',
      host: HOST,
      port: PG_PORT,
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds',
    },
  },

  production: {
    client: CLIENT,
    connection: {
      database: 'projects',
      user: 'prjadmin',
      password: 'prjadmin',
      host: HOST,
      port: PG_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
