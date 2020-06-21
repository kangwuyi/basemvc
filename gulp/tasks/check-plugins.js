// eslint-disable-next-line valid-jsdoc
/**
 * Gulp backlist, 检查 gulp 组建是否符合标准。
 */
module.exports = (gulp, plugins) => {

  // eslint-disable-next-line global-require
  const packageModule = require('../../package');
  const blackListURL = 'https://raw.githubusercontent.com/gulpjs/plugins/master/src/blackList.json';

  /*
   *
   * @method redirect 证书
   */
  gulp.task(
    'check-plugins',
    () => plugins.nodeFetch(
      blackListURL,
      {
        redirect: 'manual'
      }
    )
      .then(function (response) {
        return response.text();
      })
      .then(function (result) {
        return JSON.parse(result);
      })
      .then(function (blackList) {
        return new Promise(function (resolve, reject) {
          ['dependencies', 'devDependencies'].forEach(function (el) {
            Object.keys(packageModule[el]).forEach(function (key) {
              if (blackList[key]) {
                reject(`You are using ${key}. Not good!`);
              }
            });
          });
          resolve('Everything okay!');
        });
      })
  );
};
