/**
 * 描述
 */
module.exports = (gulp, plugins, config) => {
  gulp.task('filter-scripts',
    () => {
      // 在所有需要编译的文件的后缀自定义添加 babel，并忽略掉设定的自定义文件夹下后缀包含 babel 的文件
      const babelFilter = plugins.filter(
        '*.babel.js',
        {
          restore: true
        });
      const vendorFilter = plugins.filter(
        '!vendor/**/*.js',
        {
          restore: true
        });

      return gulp.src(
        config.javascript.desktop.src,
        {
          since: gulp.lastRun('testScript')
        }
      )
        .pipe(vendorFilter)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.failAfterError())
        .pipe(babelFilter)
        .pipe(plugins.babel())
        .pipe(babelFilter.restore)
        .pipe(vendorFilter.restore)
        .pipe(plugins.combine('main-2333.js'))
        .pipe(gulp.dest('dist'));
    }
  );
};
