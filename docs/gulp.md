# gulp文档
## Task文件命名方式
基础 task 用 **core-** 开头
merge

noodle 笨蛋


zoo 动物园


命令行

表明是生产环境

gulp --env=prod

### Using multiple sources in one task
```
// npm install --save-dev gulp merge-stream

var gulp = require('gulp');
var merge = require('merge-stream');

gulp.task('test', function() {
  var bootstrap = gulp.src('bootstrap/js/*.js')
    .pipe(gulp.dest('public/bootstrap'));

  var jquery = gulp.src('jquery.cookie/jquery.cookie.js')
    .pipe(gulp.dest('public/jquery'));

  return merge(bootstrap, jquery);
});
```
gulp.src will emit files in the order they were added:
```
// npm install gulp gulp-concat

var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {
  return gulp.src(['foo/*', 'bar/*'])
    .pipe(concat('result.txt'))
    .pipe(gulp.dest('build'));
});
```
## Using external config file
Beneficial because it's keeping tasks DRY and config.json can be used by another task runner, like grunt.

config.json
```
{
  "desktop" : {
    "src" : [
      "dev/desktop/js/**/*.js",
      "!dev/desktop/js/vendor/**"
    ],
    "dest" : "build/desktop/js"
  },
  "mobile" : {
    "src" : [
      "dev/mobile/js/**/*.js",
      "!dev/mobile/js/vendor/**"
    ],
    "dest" : "build/mobile/js"
  }
}
```
gulpfile.js
```
// npm install --save-dev gulp gulp-uglify merge-stream
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');

var config = require('./config.json');

function doStuff(cfg) {
  return gulp.src(cfg.src)
    .pipe(uglify())
    .pipe(gulp.dest(cfg.dest));
}

gulp.task('dry', function() {
  // return a stream to signal completion
  return merge([
    doStuff(config.desktop),
    doStuff(config.mobile)
  ])
});
```
