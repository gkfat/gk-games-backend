const TABLE_NAME = 'battle';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.bigIncrements('id').unsigned().primary();

        table.bigInteger('owner_id').unsigned();

        table.bigInteger('opponent_id').unsigned();

        table.boolean('is_opponent_npc');

        table.enu('result', ['win', 'lose']);

        // FK
        table.foreign('owner_id').references('account.id').onDelete('CASCADE');

        // FK
        table
            .foreign('opponent_id')
            .references('account.id')
            .onDelete('CASCADE');

        table
            .timestamp('created_at', { precision: 6 })
            .defaultTo(knex.fn.now(6))
            .notNullable();

        table.timestamp('end_at', { precision: 6 }).nullable().defaultTo(null);
    });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists(TABLE_NAME);
}
