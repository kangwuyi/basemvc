/**
 * 描述
 */
module.exports = (gulp, plugins, config) => {
  gulp.task(
    'img',
    () => gulp.src('./public/images/**/*.*')
      .pipe(plugins.imagemin({
        optimizationLevel: config.dependencies.imagemin.pnglevel,
        progressive: true
      }))
      .pipe(gulp.dest('./dist/imagesmini'))
  );
};
