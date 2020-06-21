// eslint-disable-next-line valid-jsdoc
/**
 *
 */
module.exports = (gulp, plugins) => {

  /*
   * 合并 coffee 和 部分 js
   * @param
   * @method
   */
  const variations = [
    {
      linttask: plugins.coffeelint,
      fail: plugins.coffeelint.reporter('fail'),
      compiletask: plugins.coffee,
      directory: 'src/scripts/',
      type: 'coffee',
      bundle: 'main-3.1.js'
    }

    /* , {
      linttask: Plugin.coffeelint
      , fail: Plugin.coffeelint.reporter('fail')
      , compiletask: Plugin.coffee
      , directory: 'src/scripts/'
      , type: 'coffee'
      , bundle: 'main-3.1.js'
    }*/
  ];

  gulp.task(
    'coffee',
    () => {
      const streams = variations.map(function (el) {
        return plugins.compileScripts(el);
      });
      return plugins.merge(streams);
    }
  );
};
