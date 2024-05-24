import { FastifyInstance } from 'fastify';
import { AuthController } from 'src/controller/auth';

const routes = [
    {
        path: '/auth',
        controller: AuthController,
    },
];

export const installRoutes = (fastify: FastifyInstance) => {
    routes.forEach(({ path, controller }) => {
        fastify.register((app, _, done) => {
            controller.initialize(app);

            done();
        }, {
            prefix: `/api/${path}`,
        })
    });
};
