/**
 * https://www.npmjs.com/package/gulp-sourcemaps
 */
module.exports = (gulp, plugins, config) => {

  /*
   *
   * @method plumber
   * @method sass 编译 CSS
   * @method minifyCSS 压缩 CSS
   * @method prefix 添加 CSS 前缀
   * @method gulp.dest 输出目录
   */
  gulp.task(
    'sass',
    () => plugins.rubySass(config.desktop.sass.src, {sourcemap: true})
      .on('error', function (err) {
        console.error('Error!', err.message);
      })
      .pipe(plugins.sourcemaps.init({largeFile: true}))
      .pipe(plugins.basemvcBrowserSync.stream({match: '**/*.css'}))
      .pipe(plugins.plumber())
      .pipe(plugins.sass())
      .pipe(plugins.cleanCss({compatibility: 'ie8'}))
      .pipe(plugins.autoprefixer())
      .pipe(plugins.sourcemaps.write('../maps', {
        includeContent: false,
        sourceRoot: 'public',
        charset: 'utf8'}))
      .pipe(gulp.dest(config.sass.desktop.dest))
      .pipe(plugins.refresh())
  );
};

/* gulp.src(config.desktop.sass.src)
  .pipe(plugins.plumber())
  .pipe(plugins.sass())
  .pipe(plugins.cleanCss({compatibility: 'ie8'}))
  .pipe(plugins.autoprefixer())
  .pipe(gulp.dest(config.desktop.sass.dest))
  .pipe(plugins.refresh())
  .pipe(plugins.basemvcBrowserSync.stream());
cb(); */
