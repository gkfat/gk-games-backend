import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { AuthSchema } from 'src/schema/auth';
import authService from 'src/service/auth';

import { Controller } from './base';

export class AuthController extends Controller {
    static initRouter(app: FastifyInstance) {
        app.post('/login', {
            schema: AuthSchema.login,
            handler: this.login,
        });
    }

    static async login(req: FastifyRequest, reply: FastifyReply) {
        const result = await authService.login();
    }

}
