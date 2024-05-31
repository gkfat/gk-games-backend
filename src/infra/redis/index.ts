import config from 'config';
import IORedis from 'ioredis';
import { logger } from 'src/util/logger';

const redis = new IORedis({
    ...config.db.redis,
    retryStrategy(times) {
        const MAX_RETRIES = 30;

        if (times >= MAX_RETRIES) {
            logger.app.fatal(
                `redis reconnection error, max retries(${MAX_RETRIES}) reached.`,
            );
        }

        return 2000;
    },
});

const initEventListener = () => {
    redis.on('connect', () => {
        logger.app.info('redis event connect.');
    });

    redis.on('error', (error) => {
        logger.app.error('receive event error, error: {error}', { error });
    });

    redis.on('reconnecting', () => {
        logger.app.info('receive event reconnecting.');
    });
};

initEventListener();

export default redis;
