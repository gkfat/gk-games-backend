const TABLE_NAME = "item";

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.bigIncrements("id").unsigned().primary();

        table.string("title");

        table.string("description");

        table.enu("type", ["weapon", "armor", "card", "potion"]);

        table.string("image_url");

        table.enu("effect", [
            "health",
            "attack",
            "defense",
            "accuracy",
            "dodge",
        ]);

        table.integer("point");

        table.integer("price");

        table.enu("rarity", ["common", "rare", "epic", "legendary"]);
    });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists(TABLE_NAME);
}
