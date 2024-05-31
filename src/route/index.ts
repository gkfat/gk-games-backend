import { FastifyInstance } from 'fastify';
import { AuthController } from 'src/controller/auth';
import { AvatarController } from 'src/controller/avatar';

const routes = [
    {
        path: 'auth',
        controller: AuthController,
    },
    {
        path: 'avatars',
        controller: AvatarController,
    },
];

export const installRoutes = (fastify: FastifyInstance) => {
    routes.forEach(({ path, controller }) => {
        fastify.register(
            (app, _, done) => {
                controller.initialize(app);

                done();
            },
            {
                prefix: `/api/${path}`,
            }
        );
    });
};
