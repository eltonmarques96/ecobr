import knex from 'knex';

require('dotenv').config();

const connection = knex({
  client: process.env.DB_DATABASE,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE,
  },
});

export default connection;
