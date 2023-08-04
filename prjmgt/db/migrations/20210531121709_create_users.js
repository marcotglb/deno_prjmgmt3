
exports.up = function (knex) {

    return knex.schema.withSchema('projects')
        .createTable('users', function (table) {
            table.increments().primary(),
                table.smallint('org_id').notNullable().defaultTo(0),           
                table.string('username', 64).notNullable(),
                table.string('firstname', 64).notNullable(),
                table.string('lastname', 64).notNullable(),
                table.string('email', 256).notNullable()
        })
}
exports.down = function (knex) {
    return knex.schema.withSchema('projects')
        .dropTable('users')
}