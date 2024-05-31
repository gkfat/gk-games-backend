module.exports = {
    app: {
        name: process.env.APP_NAME,
        port: parseInt(process.env.APP_PORT, 10) || 3000,
    },
    db: {
        knex: {
            client: "mysql2",
            debug: false,
            connection: {
                host: process.env.MYSQL_HOST,
                port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
            },
            pool: {
                max: 5,
                min: 0,
            },
            migrations: {
                extension: "mjs",
                loadExtensions: [".mjs"],
                directory: "setup/knex/migrations",
                tableName: "__migrations__",
                stub: "setup/knex/migration.stub",
            },
            seeds: {
                extension: "mjs",
                loadExtensions: [".mjs"],
                directory: "setup/knex/seeds",
                stub: "setup/knex/seed.stub",
            },
        },
        redis: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    googleAuth: {
        clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
    },
};
