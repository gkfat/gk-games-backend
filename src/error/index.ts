class ApplicationError extends Error {
    constructor(message?: string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
    }

    toJson() {
        return {
            name: this.name,
            message: this.message,
        };
    }
}

class ConflictError extends ApplicationError {}
class ForbiddenError extends ApplicationError {}
class InternalError extends ApplicationError {}
class InvalidRequestError extends ApplicationError {}
class NotFoundError extends ApplicationError {}
class ServiceUnAvailable extends ApplicationError {}
class TimeoutError extends ApplicationError {}
class UnauthorizedError extends ApplicationError {}
class UnknownError extends ApplicationError {}

export {
    ApplicationError,
    ConflictError,
    ForbiddenError,
    InternalError,
    InvalidRequestError,
    NotFoundError,
    ServiceUnAvailable,
    TimeoutError,
    UnauthorizedError,
    UnknownError,
};
