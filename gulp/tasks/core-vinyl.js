/**
 * 描述
 */
module.exports = (gulp, plugins) => {

  /*
   *
   * @method browserify 创建流
   * @method vinylSourceStream 传递编辑好的文件内容
   * @method sourcemap
   */
  const vinylBundle = plugins.browserify(
    {
      entries: ['app/scripts/main.js']
    }
  );
  gulp.task(
    'vinyl-script',
    () => vinylBundle.bundle()
      .pipe(plugins.vinylSourceStream('main.min.js'))
      .pipe(plugins.vinylBuffer())
      .pipe(plugins.sourcemap.init(
        {
          loadMaps: true
        }))
      .pipe(plugins.uglify())
      .pipe(plugins.sourcemap.write('.'))
      .pipe(gulp.dest('dist/scripts'))
  );
};
