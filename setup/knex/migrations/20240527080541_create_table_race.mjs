const TABLE_NAME = "race";

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.bigIncrements("id").unsigned().primary();

        table.string("title");

        table.string("description");

        table.enu("type", ["human", "gkbot", "beast", "ethereal_clan"]);

        table.integer("health");

        table.integer("strength");

        table.integer("dexterity");

        table.integer("constitution");

        table.string("image_url");
    });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists(TABLE_NAME);
}
