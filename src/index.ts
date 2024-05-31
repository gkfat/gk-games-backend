import 'dotenv/config';

import { Server } from 'node:http';
import util from 'node:util';

import config from 'config';

import { boot, shutdown } from './boot';
import { logger } from './util/logger';
import { runMigrations } from './util/migration-helper';

let server: Server;

async function handleUncaughtExceptionOrRejection(error: any, promise: any) {
    if (promise) {
        console.error('uncaughtRejection, ', error);
        logger.app.fatal(
            `Unhandled Rejection at: error: ${error}, promise: ${promise}`,
        );
    } else {
        console.error('uncaughtException, ', error);
        logger.app.fatal(`Unhandled Exception at: error: ${error}`);
    }

    if (server) {
        await util
            .promisify(server.close)()
            .catch(() => {});
    }

    shutdown();
}

async function startServer() {
    // run migrations
    await runMigrations();

    // start fastify
    const app = await boot();

    server = app.server;

    process.on('SIGINT', async () => {
        console.log('Received SIGINT. Shutting down gracefully...');
        await shutdown();
    });

    process.on('SIGTERM', async () => {
        console.log('Received SIGTERM. Shutting down gracefully...');
        await shutdown();
    });

    process.on('unhandledRejection', handleUncaughtExceptionOrRejection);
    process.on('uncaughtException', handleUncaughtExceptionOrRejection);

    try {
        await app.listen({
            host: '0.0.0.0',
            port: config.app.port,
        });

        app.log.info(
            `API Document available on http://localhost:${config.app.port}/documentation`,
        );
        app.log.info(`Server started successfully.`);
    } catch (err) {
        app.log.error(err);
        shutdown();
    }
}

startServer();
