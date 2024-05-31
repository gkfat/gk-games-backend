import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ForbiddenError } from 'src/error';
import { AuthSchema } from 'src/schema/auth';
import accountService from 'src/service/account';
import authService from 'src/service/auth';
import { Auth } from 'src/types/auth';
import { jwtHelper } from 'src/util/jwt-helper';

import { Controller } from './base';

export class AuthController extends Controller {
    static initRouter(app: FastifyInstance) {
        app.post('/login', {
            schema: AuthSchema.login,
            handler: this.login,
        });
    }

    static async login(
        req: FastifyRequest<{ Body: Auth.Login.Request }>,
        reply: FastifyReply
    ) {
        const result = await authService.loginOrCreate(req.body);

        const account = await accountService.getAccountById(result.id);

        if (account) {
            if (!account.enabled) {
                throw new ForbiddenError();
            }

            const token = await jwtHelper.generateJwt(account);

            return reply.send({
                account,
                token,
            });
        }

        return reply.send(result);
    }
}
