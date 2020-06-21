/**
 * https://www.browsersync.io/docs/options#option-files
 * Browser-sync 服务
 */
const basemvcBrowserSync = require('browser-sync')
  .create('BasemvcServer');
const debugConfig = require('../config/debug');

/*
 * serverbowerSync
 * 服务
 * @method browserSync 运行服务器
 * @method cb() 保证从上一个执行链跳到下一步
 * @param port browserSync对http://localhost:3000实现的代理端口
 * @param basemvcBrowserSync 实例 basemvc browserSync
 * @param files 必须带上，不带上修改文件不会刷新
 */
module.exports = (isProduction, serverFuncCallback) => {

  basemvcBrowserSync.init({
    proxy: {
      target: 'http://127.0.0.1:3000',
      // , ws: true,
      proxyReq: [
        function (proxyReq) {
          proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
        }]
    },
    browser: 'google-chrome',
    notify: true,
    port: 4001,
    open: 'local',
    logLevel: debugConfig.browserSync.basemvc.logLevel,
    logPrefix: 'BasemvcServer',
    ghostMode: false,
    files: '**',
    online: false,
    logSnippet: true,
    serveStatic: [{
      route: '/dist',
      dir: ['./css', './js']
    }],
    callbacks: {
      ready: function () {

        serverFuncCallback(function () {
          console.log('设置回调，还没相好干嘛，留着待用');
        });
      }
    }
  }, function () {
    console.log('browser refreshed.');
  });
};
