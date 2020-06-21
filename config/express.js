const express = require('express');
const glob = require('glob');
const session = require('express-session');
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const partials = require('express-partials');
const cookieConfig = require('../config/cookie-config');
// var MongoStore = require('connect-mongo')(session);

module.exports = (app, config) => {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  app.use(favicon(__dirname + '/../public/favicon.ico'));
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');
  app.use(partials());

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser('lifeissimpebutyoumadeitcomplicated'));
  app.use(compress());
  app.use(express.static(config.root + '/dist'));
  app.use(methodOverride());

  // session
  app.use(session({
    secret: cookieConfig.cookieSecret,
    key: cookieConfig.key,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },

    /*store: new MongoStore({
      db:cookieConfig.db,
      host:cookieConfig.host,
      port:cookieConfig.port,
      url: 'mongodb://localhost/blog'
    }),*/
    resave: true,
    saveUninitialized: false
  }));

  // flash
  app.use(flash());
  // 设置flash
  app.use(function (req, res, next) {
    res.locals.error = req.flash('error') || '';
    res.locals.success = req.flash('success') || '';
    next();
  });


  const controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach((controller) => {
    require(controller)(app);
  });

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  return app;
};
