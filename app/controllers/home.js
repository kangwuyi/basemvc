const express = require('express');
const router = express.Router();
const db = require('../models');
// const logger = require('morgan');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res) => {
  db.Article.findAll().then((articles) => {
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
    // return next();
  })
    .catch((error) => {
      console.log('Error: ', error);
    });

});
