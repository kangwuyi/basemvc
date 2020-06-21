/*
* babel-register 代码使用ES6
* */
require('babel-register')({
  presets: ['env'],
});

const express = require('express');
const config = require('../config/server-config');
const db = require('../app/models');

const www = express();

module.exports = require('../config/express')(www, config);

db.sequelize
  .sync()
  .then(() => {
    if (!module.parent) {
      www.listen(config.port, () => {
        console.log(
          '\x1B[36m%s\x1B[0m',
          '##############################################\n' +
          '## Here is /basemvc/bin/www.                ##\n' +
          '## Express server listening on port ' +
          config.port + '.   ##\n' +
          '##############################################');
      });
    }
  })
  .catch((e) => {
    throw new Error(e);
  });

