import mysql from 'src/infra/mysql';

const { Model } = mysql;

export default class AccountModel extends Model {
    static get tableName() {
        return 'account';
    }


}
