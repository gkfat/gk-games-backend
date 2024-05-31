const TABLE_NAME = 'account_attribute';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.bigIncrements('id').unsigned().primary();

        table.bigInteger('account_id').unsigned();

        table.bigInteger('race_id').unsigned();

        table.integer('health');

        table.integer('strength');

        table.integer('dextertity');

        table.integer('constitution');

        // FK
        table
            .foreign('account_id')
            .references('account.id')
            .onDelete('CASCADE');

        // FK
        table.foreign('race_id').references('race.id').onDelete('CASCADE');
    });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists(TABLE_NAME);
}
