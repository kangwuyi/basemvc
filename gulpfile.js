/**
 * Gulp 文件gulpLoadPlugins()
 */

'use strict';

/*
 * 引入组件
 * @method gulpLoadPlugins() 自动引入 package.json 中带有“gulp-”的 gulp 组件
 */

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const gulpConfig = require('./config/gulp-config');
const gulpTaskList = require('fs').readdirSync('./gulp/tasks/');

/*
 * 将组件注入 gulpLoadPlugins
 * @module slash{Function} 管理独立文件路径
 * @module through2{Function} 创建管道中的步骤
 * @module yargs{Object} 解析参数
 * @param yargsArgv {Function}
 */
/* eslint-disable global-require */
Object.assign(
  plugins,
  {del: require('del')},
  {slash: require('slash')},
  {nodemon: require('nodemon')},
  {yargsArgv: require('yargs').argv},
  {path: require('path')},
  {through2: require('through2')},
  {mainBowerFiles: require('main-bower-files')},
  {browserSync: require('browser-sync')},
  {browserify: require('browserify')},
  {readableStreamPipeline: require('readable-stream').pipeline},
  {streamCombiner2: require('stream-combiner2')},
  {vinylSourceStream: require('vinyl-source-stream')},
  {vinylBuffer: require('vinyl-buffer')},
  {vinylPaths: require('vinyl-paths')},
  {nodeFetch: require('node-fetch')},
  {streamqueue: require('streamqueue').obj},
  {wiredepStream: require('wiredep').stream},
  {watchify: require('watchify')},
  {lodashAssign: require('lodash.assign')},
  {requireDir: require('./gulp/lib/require-dir')},
  {serverNodemon: require('./bin/nodemon')},
  {serverbowerSync: require('./bin/bowersync')},
  {debugConfig: require('./config/debug')}
  // , {cluster = require('cluster')}
);
gulpTaskList.forEach(function (taskFile) {
  require('./gulp/tasks/' + taskFile)(gulp, plugins, gulpConfig);
});

/*
 * 区分开发环境、测试环境、生产环境管道
 * @method noop
 * @return {through.obj} 为流创建一个新的步骤
 * @param isProduction
 * @param development 开发环境(DEV) Development environment
 * @param production 生产环境(PRO) Production environment
 * @param featureAcceptanceTest 功能验收测试环境(FAT) Feature Acceptance Test environment
 * @param userAcceptanceTest 用户验收测试环境(UAT) User Acceptance Test environment
 * @param yargsArgv{Object}
 */
const noop = function () {

  const through = require('through2');
  // eslint-disable-next-line no-undef
  return through.obj();
};
const isProduction = (plugins.yargsArgv.env === 'prod');

Object.assign(plugins, {
  isProduction: isProduction,
  noop: noop,
  development: function (task) {
    return isProduction ? noop() : task;
  },
  production: function (task) {
    return isProduction ? task : noop();
  }
});
