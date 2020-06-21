/**
 * 描述
 */
module.exports = (gulp) => {

  /*
   * 监控文件系统中的文件变化
   * @event 'unlink' 事件在文件从文件系统中删除时触发
   * @method delete cached.caches 元素从 gulp.remember 缓存中删除
   * @method remember.forget 元素从 gulp.remember 缓存中删除
   */
  /* function watcher(cb) {
   if (!plugins.isProduction) {
     const watcher = gulp.watch(
       ['public\/**\/*.js'],
        gulp.parallel('scripts')
      );
      gulp.watch(
        'app/styles\/**\/*.sass',
        gulp.parallel('styles')
      );
      gulp.watch(
        'dist\/**\/*',
        plugins.bSync.reload
      );
      watcher.on(
        'unlink',
        (filepath) => {
          delete plugins.cached.caches['ugly'][plugins.slash(plugins.path.join(
            __dirname,
            filepath
          ))];
          plugins.remember.forget(
            'ugly',
            plugins.slash(plugins.path.join(
              __dirname,
              filepath
            ))
          );
        }
      );
    }
  } */


  gulp.task('watch',
    () => {
      gulp.watch('./public/css/*.scss', ['sass']);
    }
  );
};

