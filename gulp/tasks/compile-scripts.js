/**
 * 不同类型的 JavaScript 文件测试、合并
 */
module.exports = (gulp, plugins) => {
  Object.assign(
    plugins,
    {
      compileScripts: (param) => {
        const transpileStream = gulp.src(param.directory + '**/*.' + param.type)
          .pipe(param.linttask())
          .pipe(param.fail)
          .pipe(param.compiletask());
        const jsStream = gulp.src(param.directory + '**/*.js')
          .pipe(plugins.jshint())
          .pipe(plugins.jshint.reporter('fail'));

        return plugins.merge(transpileStream, jsStream)
          .pipe(plugins.combine(param.bundle))

          /* .pipe(Plugin.concat(param.bundle))
                    .pipe(Plugin.uglify()) */
          .pipe(gulp.dest('dist/scripts'));
      }
    }
  );
};

