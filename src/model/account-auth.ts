import mysql from 'src/infra/mysql';

import AccountModel from './account';

const { Model } = mysql;

export default class AccountAuthModel extends Model {
    id!: number;
    account_id!: number;
    type!: 'google';
    identifier!: string;
    credential!: string;

    static get tableName() {
        return 'account_auth';
    }

    static get relationMappings() {
        return {
            account: {
                relation: Model.BelongsToOneRelation,
                modelClass: AccountModel,
                join: {
                    from: 'account_auth.account_id',
                    to: 'account.id',
                },
            },
        };
    }

    static async findByIdentifier(data: {
        type: 'google';
        identifier: string;
    }) {
        return AccountAuthModel.query()
            .where({
                type: data.type,
                identifier: data.identifier,
            })
            .first();
    }

    static async createAccountAuth(data: {
        account_id: number;
        type: 'google';
        identifier: string;
        credential: string;
    }) {
        const { account_id, type, identifier, credential } = data;

        await AccountAuthModel.query().insert({
            account_id,
            type,
            identifier,
            credential,
        });
    }
}
