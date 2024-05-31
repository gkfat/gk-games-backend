import mysql from 'src/infra/mysql';

const { Model } = mysql;

export default class AvatarModel extends Model {
    id!: number;
    title!: string;
    description!: string;
    image_url!: string;

    static get tableName() {
        return 'avatar';
    }

    static async list() {
        return AvatarModel.query();
    }
}
