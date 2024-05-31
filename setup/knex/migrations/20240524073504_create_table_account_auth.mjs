const TABLE_NAME = "account_auth";

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.bigInteger("account_id").unsigned();

        table.enu("type", ["google"]);

        table.string("identifier", 255).notNullable();

        table.string("credential", 1024);

        // account_id FK to account
        table
            .foreign("account_id")
            .references("account.id")
            .onDelete("CASCADE");

        // 同帳號不能擁有多個相同的驗證方式
        table.primary(["type", "account_id"]);

        // 同個驗證資料不能被多個帳號持有
        table.unique(["type", "identifier"]);
    });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists(TABLE_NAME);
}
