import knexModule from 'src/infra/mysql/index';

import { logger } from './logger';

const { knexInstance } = knexModule;

export async function runMigrations() {
    try {
        logger.app.info('running migrations...');

        await knexInstance.migrate.latest();

        logger.app.info('migrations completed successfully!');
    } catch (err) {
        logger.app.fatal(`Error running migrations: ${err}`);

        await knexInstance.migrate.rollback();
    }
}
