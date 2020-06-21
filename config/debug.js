/*
 * Debug 参数设置文件
 */
(function () {

  module.exports =  {
    browserSync: {
      basemvc: {
        logLevel: 'info'
        // logLevel: "debug", //debug级别以上的日志
        // logLevel: "info", //info级别以上的日志
        // logLevel: "silent", //不打印任何日志到控制台
      }
    }
    ,nodemon:{
      basemvc: {
        stdout: true
        // false // important: this tells nodemon not to output to console
        ,signal:'SIGTERM'
        // SIGTERM
        // SIGINT
        // SIGUSR2
      }
    }
  };
}).call(this);
