/**
 * 在管道中删除文件
 */
module.exports = (gulp, plugins) => {

  /*
	*
	* @plugins vinylPaths
	*/
  gulp.task('clean:tmp', function () {
    return gulp.src('tmp/*')
      .pipe(plugins.stripDebug())
      .pipe(gulp.dest('dist'))
      .pipe(plugins.vinylPaths(plugins.del));
  });
};
