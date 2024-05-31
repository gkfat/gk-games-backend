import config from 'config';

const knexConfig = config.util.extendDeep(config.db.knex, {
    migrations: {
        directory: 'setup/knex/migrations',
        tableName: '__migrations__',
        stub: 'setup/knex/migration.stub',
    },
    seeds: {
        directory: 'setup/knex/seeds',
        stub: 'setup/knex/seed.stub',
    },
});

export default {
    development: knexConfig,
};
