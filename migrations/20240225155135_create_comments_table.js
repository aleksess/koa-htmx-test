/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comments', table => {
        table.primary('id');
        table.increments('id');
        table.integer('post_id').unsigned();
        table.foreign('post_id').references('posts.id');
        table.text('content');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('comments')
};
