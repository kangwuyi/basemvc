/*
* MYSQL 数据库配置文件
* */
(function () {
  module.exports = {
    development: {
      database: 'basemvc-dev',
      user: 'root',
      password: 'kangjian1990',
      other: {
        dialect: 'mysql',
        host: '192.168.50.25',
        port: '3306',
      }
    },
    test: {
      database: 'tdren-test',
      user: 'root',
      password: '',
      other: {
        dialect: 'mysql',
        host: '192.168.50.25',
        port: '3306',
      }
    },
    production: {
      database: 'tdren-production',
      user: 'root',
      password: '',
      other: {
        dialect: 'mysql',
        host: '192.168.50.25',
        port: '3306',
      }
    }
  };
}).call(this);
