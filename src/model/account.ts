import mysql from 'src/infra/mysql';

import AccountAuthModel from './account-auth';
import AvatarModel from './avatar';

const { Model } = mysql;

const graphFetchContent = '[auth, avatars]';

export default class AccountModel extends Model {
    id!: number;
    email!: string;
    name!: string;
    enabled!: boolean;
    created_at!: Date;
    last_login_at!: Date;
    deleted_at!: Date | null;
    auth!: AccountAuthModel[];
    avatars!: AvatarModel[];

    static get tableName() {
        return 'account';
    }

    static get relationMappings() {
        return {
            auth: {
                relation: Model.HasManyRelation,
                modelClass: AccountAuthModel,
                join: {
                    from: 'account.id',
                    to: 'account_auth.account_id',
                },
            },
            avatars: {
                relation: Model.HasManyRelation,
                modelClass: AvatarModel,
                join: {
                    from: 'account.id',
                    through: {
                        from: 'account_avatar.account_id',
                        to: 'account_avatar.avatar_id',
                    },
                    to: 'avatar.id',
                },
            },
        };
    }

    static async findById(id: number) {
        return AccountModel.query()
            .where({ id })
            .withGraphFetched(graphFetchContent)
            .first();
    }

    static async findByEmail(email: string) {
        return AccountModel.query()
            .where({ email })
            .withGraphFetched(graphFetchContent)
            .first();
    }

    static async createAccount(params: {
        accountData: {
            email: string;
            name: string;
        };
        authData: {
            type: 'google';
            identifier: string;
            credential: string;
        };
    }) {
        const { accountData, authData } = params;

        const { id } = await AccountModel.query().insertGraph({
            ...accountData,
            auth: [authData],
        });

        return id;
    }

    static async updateLastLoginTime(id: number) {
        return AccountModel.query().where({ id }).update({
            last_login_at: new Date(),
        });
    }
}
