const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';
import mysql_config from './mysql_config';

const serverConfig = {
  development: {
    root: rootPath,
    app: {
      name: 'BaseMVC development'
    },
    port: process.env.PORT || 3000,
    db: mysql_config.development
  },
  test: {
    root: rootPath,
    app: {
      name: 'BaseMVC test'
    },
    port: process.env.PORT || 3000,
    db: mysql_config.test
  },
  production: {
    root: rootPath,
    app: {
      name: 'BaseMVC production'
    },
    port: process.env.PORT || 3000,
    db: mysql_config.production
  }
};

module.exports = serverConfig[env];
