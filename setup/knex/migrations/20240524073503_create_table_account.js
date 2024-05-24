const TABLE_NAME = 'account';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .bigIncrements('id')
            .unsigned()
            .primary();

        table
            .string('username')
            .notNullable()
            .unique();
    });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists(TABLE_NAME);
}
