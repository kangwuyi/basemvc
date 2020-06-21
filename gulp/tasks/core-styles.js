/**
 * 描述
 */
module.exports = (gulp, plugins) => {

  /*
   * css 文件与 scss 文件编译后合并
   * @method mainBowerFiles() 选中 bower 组件中的文件加入流队列
   * @method streamqueue() 流有序执行
   */
  gulp.task('styles',
    (done) => {
      plugins.streamqueue(gulp.src(plugins.mainBowerFiles('**/*.css')),
        gulp.src('public/lib/css/lib.css')
          .pipe(plugins.cssimport()),
        gulp.src('public/sass/main.scss')
          .pipe(plugins.sass())
      )
        .pipe(plugins.autoprefixer())
        .pipe(plugins.concat('main.css'))
        .pipe(gulp.dest('dist/styles'));
      done();
    },
    (err) => {
      if (err) {
        console.error('Pipeline failed.', err);
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  );
};
