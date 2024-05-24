import { FastifyBaseLogger } from 'fastify';
import pino from 'pino';
import PinoPretty from 'pino-pretty';

const stream = PinoPretty({
    colorize: true,
    translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
    singleLine: true,
    ignore: 'reqId,pid,hostname',
});

const Pino: FastifyBaseLogger = pino(
    {
        level: 'info',
    },
    stream,
);

export const logger = {
    app: Pino.child({ name: 'app' }),
};
