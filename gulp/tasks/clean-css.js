/**
 * 清理 Css 文件夹
 * 删文件都是异步的，命令执行完毕未必已完成了对文件的增删操作。
 */
module.exports = (gulp, plugins, config) => {

  /*
  *
  * @method
  */
  gulp.task(
    'clean:css-desktop',
    (cb) => {

      plugins.del(config.clean.css.desktop.dest, cb)
        .then((data) => {
          console.log('Deleted files and directories:\n', data.join('\n'));
        })
        .catch((data) => {
          console.log('Deleted files and directories:\n', data.join('\n'));
        });
      cb();
    }
  );
};
