
exports.up = function (knex) {

    return knex.schema.withSchema('projects')
        .createTable('deliverables2', function (table) {
            table.increments().primary(),
                table.integer('father').notNullable(),
                table.string('title', 64).notNullable(),
                table.string('who', 64).notNullable(),
                table.smallint('effort'),
                table.timestamp('delivered', 64).defaultTo(knex.fn.now()),
                table.text('what')
        })
}
exports.down = function (knex) {
    return knex.schema.withSchema('projects')
        .dropTable('deliverables2')
}


/*
exports.up = function(knex) {

    return knex.schema
        .createTable('users', function(table) {
            table.increments().primary()
            table.string('name', 255).notNullable()
            table.string('email', 255).notNullable()
            table.string('password', 255).notNullable()
            table
                .boolean('account_verified')
                .notNullable()
                .defaultTo(false)
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
        .createTable('posts', function(table) {
            table.increments().primary()
            table.string('title', 255).notNullable()
            table.string('body', 255).notNullable()
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
            table
                .integer('user_id')
                .references('id')
                .inTable('users')
        })
        .createTable('comments', function(table) {
            table.increments().primary()
            table.string('comment', 255).notNullable()
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
            table
                .integer('user_id')
                .references('id')
                .inTable('users')
            table.string('user_name', 255).notNullable()
            table
                .integer('post_id')
                .references('id')
                .inTable('posts')
        })
}

exports.down = function(knex) {
    return knex.schema.dropTable('posts').dropTable('users').dropTable('comments')
}
*/
