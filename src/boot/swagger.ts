import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';

export function installSwagger(app: FastifyInstance) {
    app.register(fastifySwagger, {
        swagger: {
            info: {
                title: 'GK games backend API',
                description: '',
                version: '1.0.0',
            },
            host: '',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
    });

    app.register(fastifySwaggerUi, {
        routePrefix: '/documentation',
    });
}
