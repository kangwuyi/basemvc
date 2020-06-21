/**
 * https://www.browsersync.io/docs/api
 */

module.exports = (gulp, plugins, config) => {

  /*
   * 清理 nodemon 服务进程
   */
  gulp.task(
    'kill:nodemonServerProcess',
    (cb) => {
      cb();
    }
  );

  /*
   *
   * @param default 命名 task
   * @param clean 先执行 clean
   * @param reload 通知所有浏览器有关已更改文件的信息，并将导致浏览器刷新或在可能的情况下注入文件
   */
  gulp.task(
    'default',
    gulp.series(
      [
        'clean:css-desktop',
        'clean:javascript-desktop',
        'script:server'
        // 'sass'
      ],

      gulp.parallel('styles', 'scripts'),
      gulp.series(
        [
          'kill:nodemonServerProcess'
        ],
        (cb) => {
          if (!plugins.isProduction) {
            plugins.refresh.listen();
          }

          plugins.serverNodemon(plugins.isProduction, plugins.serverbowerSync, cb, function (func) {

            gulp.watch(
              config.javascript.desktop.src,
              gulp.parallel('scripts')
            );
            gulp.watch(config.sass.desktop.src,
              gulp.parallel('styles')
            );
            gulp.watch('app/views/*.ejs').on(
              'change',
              plugins.browserSync.get('BasemvcServer').reload
            );
            func();
            cb();
          });
        }
      )
    )
  );
};
