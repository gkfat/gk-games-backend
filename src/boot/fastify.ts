import 'dotenv/config';

import {
    fastify,
    FastifyInstance,
} from 'fastify';
import { installRoutes } from 'src/route';
import { logger } from 'src/util/logger';

import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';

function installMiddleware(app: FastifyInstance) {
    app.register(fastifyHelmet)

    app.register(fastifyCors, {
        origin: '*'
    });
}

export default async () => {
    const app = fastify({
        logger: logger.app
    });

    app.get('/health', (req, reply) => {
        reply.send('ok');
    })

    installMiddleware(app);
    installRoutes(app);

    return app;
}
