// eslint-disable-next-line valid-jsdoc
/**
 * 将 concat 和 uglify 步骤抽离出来，实现复用。
 */
module.exports = (gulp, plugins) => {

  /*
   * 合并执行步骤
   * @param output
   * @method streamCombiner2 合并 stream
   */
  Object.assign(
    plugins,
    {
      combine: (output) => plugins.streamCombiner2.obj(
        plugins.concat(output),
        plugins.uglify()
      )
    }
  )
  ;
};
