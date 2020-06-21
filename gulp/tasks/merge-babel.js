/**
 *
 */
module.exports = (gulp, plugins) => {

  /*
   * 合并  和 部分 js
   * @param
   * @method
   */
  gulp.task(
    'coffee',
    () => plugins.compileScripts(
      {
        linttask: plugins.eslint,
        fail: plugins.eslint.failAfterError(),
        compiletask: plugins.babel,
        directory: 'src/scripts-es6/',
        type: 'es',
        bundle: 'main-3.2.js'
      })
  );
};
