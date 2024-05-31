import { headerSchema, responses } from './shared/index';
import { S } from 'fluent-json-schema';

export const avatarObj = S.object()
    .prop('id', S.number())
    .prop('title', S.string())
    .prop('description', S.string())
    .prop('image_url', S.string());

const list = {
    headers: headerSchema,
    response: {
        ...responses,
        200: S.array().items(avatarObj),
    },
};

export const AvatarsSchema = {
    list,
};
