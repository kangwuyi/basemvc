/*
 * 清理 Script 文件夹
 * 删文件都是异步的，命令执行完毕未必已完成了对文件的增删操作。
 * @param 'dist\/js\/**\/*' 使用一个通配模式匹配 `js` 文件夹中的所有东西
 * @param '!dist\/image\/**\/*' 不删掉特定文件，所以取反这个匹配模式
 * @method cb() 不使用文件流的时候
 * ，应用 cb 回调函数通知 task 任务完成，避免同步出错误
 */
module.exports = (gulp, plugins, config) => {

  /*
  *
  * @method
  */
  gulp.task(
    'clean:javascript-desktop',
    (cb) => {

      plugins.del(config.clean.javascript.desktop.dest, cb)
        .then((data) => {
          console.log('Deleted files and directories:\n', data.join('\n'));
        });
      cb();
    }
  );
};
