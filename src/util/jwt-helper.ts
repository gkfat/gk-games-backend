import config from 'config';
import { FastifyRequest } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ms from 'ms';
import { UnauthorizedError } from 'src/error';
import redis from 'src/infra/redis';
import { Dto } from 'src/types/dto';
import { uuidHelper } from 'src/util/uuid';

async function generateJwt(account: Dto.Account) {
    const { secret, expiresIn } = config.jwt;

    const cachedJti = await redis.get(`token:${account.id}`);
    const jti = cachedJti ?? uuidHelper.getBase64Uuid();

    const token = jwt.sign(account, secret, {
        expiresIn,
        algorithm: 'HS256',
        jwtid: jti,
    });

    const ttl = ms(expiresIn);

    await redis.set(`token:${account.id}`, jti, 'PX', ttl);

    return token;
}

interface JwtDecoded extends JwtPayload {
    jti: string;
    account: Dto.Account;
}

function decodeJwt(token: string) {
    const { secret } = config.jwt;

    return jwt.verify(token, secret) as JwtDecoded;
}

async function validateJti(account_id: number, jti: string) {
    const cachedJti = await redis.get(`token:${account_id}`);

    return cachedJti === jti;
}

async function validateJwt(req: FastifyRequest) {
    try {
        const standard = 'Bearer ';
        if (
            !req.headers.authorization ||
            req.headers.authorization.indexOf(standard) < 0
        ) {
            throw new UnauthorizedError();
        }

        const token = req.headers.authorization.replace(standard, '');

        const decodedJwt = decodeJwt(token);

        const { jti, account } = decodedJwt;
        const isValidJti = await validateJti(account.id, jti);

        if (isValidJti) {
            return true;
        }
        throw new UnauthorizedError();
    } catch (err) {
        throw new UnauthorizedError();
    }
}

export const jwtHelper = {
    generateJwt,
    validateJwt,
};
