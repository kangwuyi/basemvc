/**
 * Javascript 相关的 Tasks。
 */

module.exports = (gulp, plugins, config) => {

  /*
   * 客户端  bower 组件库的 javascript 代码
   * 还没有压缩合并
   * @plugins mainBowerFiles 支持 bower 组件的动态引入
   */
  gulp.task(
    'script:desktopBower',
    () => {
      const glob = plugins.mainBowerFiles('**/*.js');
      glob.push('public/lib/js/*.js');

      return plugins.readableStreamPipeline(
        gulp.src(
          glob,
          {
            // sourcemaps: true,
            // since: gulp.lastRun('script-desktopBower')
          }
        ),
        plugins.development(plugins.sourcemaps.write(
          '.',
          {
            sourceRoot: 'js-source'
          }
        )),
        gulp.dest(
          'bowerlib',
          {
            cwd: 'dist/'
          }
        ),
        (err) => {
          if (err) {
            console.error('Pipeline failed.', err);
          } else {
            console.log('Pipeline succeeded.');
          }
        }
      );
    }
  );

  /*
   * 移动端  bower 组件库的 javascript 代码
   */
  gulp.task(
    'script:mobileBower',
    (done) => {

      /* return gulp.src(
        config.desktop.javascript.src
        , {
          since: gulp.lastRun('server-mobile')
        }
      )
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.jshint.reporter('fail'));*/
      done();
    }
  );

  /*
   * 检查服务端 javascript 代码
   */
  gulp.task(
    'script:server',
    (done) => {
      gulp.src(
        config.javascript.server.src
      )
        .pipe(plugins.debug({title: 'unicorn:'}))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.jshint.reporter('fail'));
      done();
    }
  );

  /*
   * 检查客户端 javascript 代码
   */
  gulp.task(
    'script:desktop',
    (done) => {

      gulp.src(
        config.javascript.desktop.src
      )
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError());
      done();
    }
  );

  /*
   * 检查移动端 javascript 代码
   */
  gulp.task(
    'script:mobile',
    (done) => {

      /* return gulp.src(
        config.desktop.javascript.src
        , {
          since: gulp.lastRun('server-mobile')
        }
      )
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.jshint.reporter('fail'));*/
      done();
    }
  );

  /*
   * 压缩合并代码，还没有加入更改源文件自动更新
   * @plugins mainBowerFiles 支持 bower 组件的动态引入
   * @method gulp.series 构建依赖链
   * @param glob 选择 public 目录中的所有 js 文件
   * @param sourcemaps 开启 gulp 内置 sourcemap 插件
   * @param since 根据时间戳检查所有文件
   * @method gulp.lastRun: 保证每次只读取新文件，接收参数为 task 名称
   * @method sourcemaps.init 开启 gulp-sourcemaps 组件 sourcemap 插件
   * @method cached 文件传递给缓存，更新缓存里的文件
   * @method remember 每当新文件被 uglify，把其他源文件添加到文件流中
   * @method concat 合并成一个文件
   * @param sourceRoot 将 source root 的重命名为 js-source
   * @method uglify 压缩
   * @param scriptInternal 函数命名
   */
  gulp.task('scripts',
    gulp.series(
      [
        'script:desktopBower',
        'script:server',
        'script:desktop',
        'script:mobile'
      ],
      function scriptInternal (done) {

        plugins.readableStreamPipeline(
          gulp.src(config.javascript.desktop.src),
          plugins.development(plugins.sourcemaps.init()),
          plugins.cached('ugly'),
          plugins.uglify({
            compress: {
              'dead_code': true,
              'drop_debugger': true,
              'unsafe_proto': true,
              'conditionals': true
            },
            mangle: {
              toplevel: true,
              eval: true,
              reserved: '$,require,exports',
              properties: {}
            },
            ie8: true,
            parse: {
              // parse options
            },
            output: {
              beautify: false
            },
            sourceMap: {
              // source map options
            },
            nameCache: null,
            toplevel: false,
            warnings: false
          }),
          plugins.remember('ugly'),
          plugins.concat(config.javascript.desktop.concat),
          plugins.development(plugins.sourcemaps.write(
            '.',
            {
              sourceRoot: 'js-source'
            }
          )),
          gulp.dest('desktop',
            {
              cwd: 'dist/'
            }),
          (err) => {
            if (err) {
              console.error('Pipeline failed.', err);
            } else {
              console.log('Pipeline succeeded.');
            }
          }
        );
        done();
      }
    )
  );
};
