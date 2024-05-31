import mysql from 'src/infra/mysql';
import AvatarModel from './avatar';

const { Model } = mysql;

export default class AccountAvatarModel extends Model {
    account_id!: number;
    avatar_id!: number;
    in_use!: boolean;

    static get tableName() {
        return 'account_avatar';
    }

    static get relationMappings() {
        return {
            avatar: {
                relation: Model.HasManyRelation,
                modelClass: AvatarModel,
                join: {
                    from: 'account_avatar.avatar_id',
                    to: 'avatar.id',
                },
            },
        };
    }
}
