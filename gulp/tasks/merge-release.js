/**
 *
 */
module.exports = (gulp, plugins) => {

  // eslint-disable-next-line require-jsdoc
  function bump (cb) {
    plugins.util.log('bumping project2');
    cb();
  }

  function publish (cb) {
    plugins.util.log('publishing project2');
    cb();
  }

  gulp.task('bump', bump);
  gulp.task('publish', publish);
};
