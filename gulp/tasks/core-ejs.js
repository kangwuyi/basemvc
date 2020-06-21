/**
 * 描述
 */
module.exports = (gulp, plugins, config) => {

  /*
   * 将 bower 中下载的 JS 文件添加到 EJS 文件中
   * @method wiredep() 将依赖添加到 EJS 标记位置
   * @method gulp.dest 将新的 EJS 文件输出到目标目录
   */
  gulp.task(
    'deps',
    () => gulp.src(config.desktop.ejs.src)
      .pipe(plugins.wiredep())
      .pipe(gulp.dest(config.desktop.ejs.dest))
  );
};
