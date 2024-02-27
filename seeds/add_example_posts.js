/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {title: "Hello world", content: 'This is the first post'},
    {title: "Hello There", content: 'This is the second post'}
  ]);
};
