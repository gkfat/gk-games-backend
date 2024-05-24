import { S } from 'fluent-json-schema';

const login = {
    body: S.object()
        .prop('type', S.enum(['password', 'google']).required())
        .prop('email', S.string().required())
        .prop('password', S.string().required()),
};

export const AuthSchema = {
    login,
};
