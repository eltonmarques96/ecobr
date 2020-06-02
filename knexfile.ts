import path from 'path';

// require('dotenv').config();

module.exports = {
  client: 'mysql',
  connection: {
    host: '0.0.0.0',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'eco',
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
  useNullAsDefault: true,
};
