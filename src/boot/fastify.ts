import 'dotenv/config';

import { fastify, FastifyInstance } from 'fastify';
import {
    errorHandler,
    unknownEndpointHandler,
} from 'src/middleware/error-handler';
import { installRoutes } from 'src/route';
import { logger } from 'src/util/logger';
import { installSwagger } from './swagger';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';

function installMiddleware(app: FastifyInstance) {
    app.register(fastifyHelmet);

    app.register(fastifyCors, {
        origin: '*',
    });
}

function installErrorHandler(app: FastifyInstance) {
    app.addHook('onRequest', unknownEndpointHandler);
    app.setErrorHandler(errorHandler);
}

export default async () => {
    const app = fastify({
        logger: logger.app,
    });

    installSwagger(app);

    app.get('/health', (req, reply) => {
        reply.send('ok');
    });

    installErrorHandler(app);

    installMiddleware(app);

    installRoutes(app);

    return app;
};
