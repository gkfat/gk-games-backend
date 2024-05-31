const TABLE_NAME = "account";

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.bigIncrements("id").unsigned().primary();

        table.string("email").unique().notNullable();

        table.string("name").notNullable();

        table.boolean("enabled").defaultTo(true);

        table
            .timestamp("last_login_at", { precision: 6 })
            .nullable()
            .defaultTo(null);

        table
            .timestamp("created_at", { precision: 6 })
            .defaultTo(knex.fn.now(6))
            .notNullable();

        table
            .timestamp("deleted_at", { precision: 6 })
            .nullable()
            .defaultTo(null);
    });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists(TABLE_NAME);
}
