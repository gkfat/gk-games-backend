const TABLE_NAME = 'account_avatar';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.bigInteger('account_id').unsigned();

        table.bigInteger('avatar_id').unsigned();

        table.boolean('in_use');

        // FK
        table
            .foreign('account_id')
            .references('account.id')
            .onDelete('CASCADE');

        // FK
        table.foreign('avatar_id').references('avatar.id').onDelete('CASCADE');

        table.primary(['account_id', 'avatar_id']);
    });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists(TABLE_NAME);
}
