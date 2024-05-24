import assert from 'assert';
import { FastifyInstance } from 'fastify';

export class Controller {
    static initRouter(app: FastifyInstance) {
        assert(false, `initRouter() not implented`);
    }

    static initialize(app: FastifyInstance) {
        this.initRouter(app);
    }
}
