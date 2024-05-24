import knexModule from 'src/infra/mysql/index';

import { logger } from './logger';

const { knexInstance } = knexModule;

export async function runMigrations() {
    try {
        console.log('try migration')
        await knexInstance.migrate.latest();
    } catch(err) {
        logger.app.fatal(`Error running migrations: ${err}`);

        await knexInstance.migrate.rollback();
    }
}
