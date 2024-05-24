import config from 'config';
import knexModule from 'knex';
import objection from 'objection';

const { knex } = knexModule;
const knexInstance = knex(config.db.knex);

objection.Model.knex(knexInstance);

export default {
    knexInstance,
    Model: objection.Model,
};
