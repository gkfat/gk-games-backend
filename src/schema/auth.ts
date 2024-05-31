import { S } from 'fluent-json-schema';
import { responses } from './shared/index';
import { avatarObj } from './avatars';

const login = {
    body: S.object()
        .prop('type', S.enum(['google']).required())
        .prop('idToken', S.string().required()),
    response: {
        ...responses,
        200: S.object()
            .prop('token', S.string())
            .prop(
                'account',
                S.object()
                    .prop('id', S.number())
                    .prop('email', S.string())
                    .prop('name', S.string())
                    .prop('enabled', S.boolean())
                    .prop(
                        'created_at',
                        S.string().format(S.FORMATS.DATE_TIME).required()
                    )
                    .prop(
                        'last_login_at',
                        S.string().format(S.FORMATS.DATE_TIME).required()
                    )
                    .prop('avatars', S.array().items(avatarObj))
            ),
    },
};

export const AuthSchema = {
    login,
};
