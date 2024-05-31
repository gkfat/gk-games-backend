import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { Controller } from './base';
import avatarsService from 'src/service/avatars';
import { AvatarsSchema } from 'src/schema/avatars';

export class AvatarController extends Controller {
    static initRouter(app: FastifyInstance) {
        app.get('', {
            handler: this.list,
            schema: AvatarsSchema.list,
        });
    }

    static async list(req: FastifyRequest, reply: FastifyReply) {
        const result = await avatarsService.list();

        return reply.send(result);
    }
}
