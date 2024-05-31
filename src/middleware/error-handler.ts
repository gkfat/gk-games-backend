import {
    FastifyError,
    FastifyReply,
    FastifyRequest,
    HookHandlerDoneFunction,
} from 'fastify';
import { NotFoundError } from 'src/error';
import { StatusCodes } from 'http-status-codes';

export function unknownEndpointHandler(
    req: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction,
) {
    if (req.is404) {
        throw new NotFoundError();
    }
    done();
}

export function errorHandler(
    error: FastifyError,
    req: FastifyRequest,
    reply: FastifyReply,
) {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

    switch (error.name) {
    case 'ApplicationError':
        statusCode = StatusCodes.BAD_REQUEST;
        break;
    case 'InternalError':
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        break;
    case 'InvalidRequestError':
        statusCode = StatusCodes.BAD_REQUEST;
        break;
    case 'NotFoundError':
        statusCode = StatusCodes.NOT_FOUND;
        break;
    case 'UnauthorizedError':
        statusCode = StatusCodes.UNAUTHORIZED;
        break;
    case 'ForbiddenError':
        statusCode = StatusCodes.FORBIDDEN;
        break;
    case 'ConflictError':
        statusCode = StatusCodes.CONFLICT;
        break;
    case 'ServiceUnAvailable':
        statusCode = StatusCodes.SERVICE_UNAVAILABLE;
        break;
    case 'TimeoutError':
        statusCode = StatusCodes.GATEWAY_TIMEOUT;
        break;
    default:
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        break;
    }

    reply.status(statusCode).send(error);
}
