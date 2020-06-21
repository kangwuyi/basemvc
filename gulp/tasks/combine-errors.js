/**
 * 在 stream 中发生一个错误会被直接抛出，使用 stream-combiner2，将一系列的 stream 合并成一个监听器监听 error。
 */
module.exports = (gulp, plugins) => {

  /*
   * 任何在 stream 中发生的错误都不会抛出，而是会被监听器捕获。
   * @method
   *
   */
  gulp.task(
    'combine-errors',
    () => {
      const combined = plugins.streamCombiner2.obj([
        gulp.src('bootstrap/js/*.js'),
        plugins.uglify(),
        gulp.dest('public/bootstrap')
      ]);

      combined.on('error', console.error.bind(console));

      return combined;
    }
  );
};
