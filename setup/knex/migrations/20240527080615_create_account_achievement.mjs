const TABLE_NAME = 'account_achievement';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.bigInteger('account_id').unsigned();

        table.bigInteger('achievement_id').unsigned();

        table.boolean('claimed');

        // FK
        table
            .foreign('account_id')
            .references('account.id')
            .onDelete('CASCADE');

        // FK
        table
            .foreign('achievement_id')
            .references('achievement.id')
            .onDelete('CASCADE');

        table
            .timestamp('created_at', { precision: 6 })
            .defaultTo(knex.fn.now(6))
            .notNullable();

        table.primary(['account_id', 'achievement_id']);
    });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists(TABLE_NAME);
}
