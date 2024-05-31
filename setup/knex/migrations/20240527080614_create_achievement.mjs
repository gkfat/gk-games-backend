const TABLE_NAME = 'achievement';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.bigIncrements('id').unsigned().primary();

        table.string('title');

        table.string('description');

        table.enu('award_type', ['coin', 'item']);

        table.integer('amount');

        table.bigInteger('item_id').unsigned();

        // FK
        table.foreign('item_id').references('item.id').onDelete('CASCADE');
    });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists(TABLE_NAME);
}
