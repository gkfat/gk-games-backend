import { IConfig } from 'config';
import { RedisOptions } from 'ioredis';
import { Knex } from 'knex';

declare module 'config' {
    interface IConfig {
        app: {
            name: string;
            port: number;
        },
        db: {
            knex: Knex.Config,
            redis: RedisOptions,
        },
    }
}
