/* eslint-disable @typescript-eslint/no-unused-vars */

import { IConfig } from 'config';
import { RedisOptions } from 'ioredis';
import { Knex } from 'knex';

declare module 'config' {
    interface IConfig {
        app: {
            name: string;
            port: number;
        };
        db: {
            knex: Knex.Config;
            redis: RedisOptions;
        };
        jwt: {
            secret: string;
            expiresIn: string;
        };
        googleAuth: {
            clientId: string;
        };
    }
}
