/**
 * Nodemon 服务
 */
const nodemon = require('nodemon');
const debugConfig = require('../config/debug');

/*
 * serverNodemon
 * 服务
 * @method cb() 保证从上一个执行链跳到下一步
 * @param this this 箭头函数使得this从“动态”变成“静态”，所以这里使用 function 定义方法
 * @param func 传递参数，参数类型为函数。用来执行 bowersync 代理服务。
 * @param signal
 * @param isProduction
 */
module.exports = (isProduction, serverbowerSyncFunc, callback, serverFuncCallback) => {

  if (!isProduction) {

    nodemon({
      done: callback,
      stdout: debugConfig.nodemon.basemvc.stdout,
      signal: debugConfig.nodemon.basemvc.signal

      /* , tasks: function (changedFiles) {
        var tasks = [];
        if (!changedFiles) return tasks;
        changedFiles.forEach(function (file) {
          if (path.extname(file) === '.js' && !~tasks.indexOf('lint')) tasks.push('lint')
          if (path.extname(file) === '.css' && !~tasks.indexOf('cssmin')) tasks.push('cssmin')
        });
        return tasks
      } */
    })
      .on('start', function () {
        serverbowerSyncFunc(isProduction, serverFuncCallback);
      })
      .on(
        'readable',
        function () {

          try {
            this.stdout.on(
              'data',
              (chunk) => {
                if (/^Express server listening on port/.test(chunk)) {

                  this.message += chunk.toString('utf8');
                  // plugins.refresh.changed(__dirname);
                }
              }
            );
            this.stdout.pipe(process.stdout);
            this.stderr.pipe(process.stderr);
          } catch (error) {
            console.log(error);
          }
        }
      )
      .on('restart', function () {
        console.log('\x1B[36m%s\x1B[0m', 'restarted');
      })
      .on('crash', function () {
        console.error('Application has crashed!\n');
        // stream.emit('restart', 10)  // restart the server in 10 seconds
      });
  }
};
