const TABLE_NAME = 'account_status';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.bigIncrements('id').unsigned().primary();

        table.bigInteger('account_id').unsigned();

        table.integer('level');

        table.integer('exp');

        table.integer('exp_next_level');

        table.integer('current_health');

        table.integer('attack');

        table.integer('defense');

        table.decimal('accuracy', 8, 2);

        table.decimal('dodge', 8, 2);

        // FK
        table
            .foreign('account_id')
            .references('account.id')
            .onDelete('CASCADE');
    });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists(TABLE_NAME);
}
