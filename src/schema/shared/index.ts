import { S } from 'fluent-json-schema';

export const headerSchema = S.object().prop(
    'Authorization',
    S.string().required()
);

export const responses = {
    400: S.object().prop('error', S.string()).prop('message', S.string()),
    401: S.object().prop('error', S.string()).prop('message', S.string()),
    404: S.object().prop('error', S.string()).prop('message', S.string()),
    500: S.object().prop('error', S.string()).prop('message', S.string()),
};
