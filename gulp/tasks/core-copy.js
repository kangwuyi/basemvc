/**
 * 描述
 */
module.exports = (gulp) => {

  gulp.task(
    'copy',
    () => gulp.src('public')
      .pipe(gulp.dest('dist'))
  );
};
