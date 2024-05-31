const TABLE_NAME = 'account_item';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.bigIncrements('id').unsigned().primary();

        table.bigInteger('account_id').unsigned();

        table.bigInteger('item_id').unsigned();

        table.integer('sell_price');

        table.decimal('durability', 8, 2);

        // FK
        table
            .foreign('account_id')
            .references('account.id')
            .onDelete('CASCADE');

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
