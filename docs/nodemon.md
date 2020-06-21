# nodemon

## 配置的三种方法

### 1. 自定义nodemon.json文件

nodemon.json文件放置在模块根目录。

```
{
    "restartable": "rs",
    "ignore": [
        ".git",
        ".svn",
        "node_modules/**/node_modules"
    ],
    "verbose": true,
    "execMap": {
        "js": "node --harmony"
    },
    "watch": [
    ],
    "env": {
        "NODE_ENV": "development"
    },
    "ext": "js json"
}
```

　配置项代表的含义：

　　restartable：设置重启模式
　　ignore：设置忽略文件，ignore中的匹配的文件不需要监听。
　　verbose：设置日志输出模式，true 详细模式
　　execMap：设置运行服务的后缀名与对应的命令
　　{
　　　　“js”: “node –harmony”
　　}
　　表示使用 nodemon 代替 node
　　watch：监听哪些文件的变化，当变化的时候自动重启
　　ext：监控指定的后缀文件名



### 2. 配置放到项目的 package.json 文件中

 ```
"nodemonConfig": {

  }
 ```

## nodemon

nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

nodemon does **not** require *any* additional changes to your code or method of development. nodemon is a replacement wrapper for `node`, to use `nodemon` replace the word `node` on the command line when executing your script.



# Installation

Either through cloning with git or by using [npm](http://npmjs.org/) (the recommended way):

```
npm install -g nodemon
```

And nodemon will be installed globally to your system path.

You can also install nodemon as a development dependency:

```
npm install --save-dev nodemon
```

With a local installation, nodemon will not be available in your system path. Instead, the local installation of nodemon can be run by calling it from within an npm script (such as `npm start`) or using `npx nodemon`.

# Usage

nodemon wraps your application, so you can pass all the arguments you would normally pass to your app:

```
nodemon [your node app]
```

For CLI options, use the `-h` (or `--help`) argument:

```
nodemon -h
```

Using nodemon is simple, if my application accepted a host and port as the arguments, I would start it as so:

```
nodemon ./server.js localhost 8080
```

Any output from this script is prefixed with `[nodemon]`, otherwise all output from your application, errors included, will be echoed out as expected.

If no script is given, nodemon will test for a `package.json` file and if found, will run the file associated with the *main* property ([ref](https://github.com/remy/nodemon/issues/14)).

You can also pass the `inspect` flag to node through the command line as you would normally:

```
nodemon --inspect ./server.js 80
```

If you have a `package.json` file for your app, you can omit the main script entirely and nodemon will read the `package.json` for the `main` property and use that value as the app.

nodemon will also search for the `scripts.start` property in `package.json` (as of nodemon 1.1.x).

Also check out the [FAQ](https://github.com/remy/nodemon/blob/master/faq.md) or [issues](https://github.com/remy/nodemon/issues) for nodemon.

## Automatic re-running

nodemon was originally written to restart hanging processes such as web servers, but now supports apps that cleanly exit. If your script exits cleanly, nodemon will continue to monitor the directory (or directories) and restart the script if there are any changes.

## Manual restarting

Whilst nodemon is running, if you need to manually restart your application, instead of stopping and restart nodemon, you can type `rs` with a carriage return, and nodemon will restart your process.

## Config files

nodemon supports local and global configuration files. These are usually named `nodemon.json` and can be located in the current working directory or in your home directory. An alternative local configuration file can be specified with the `--config ` option.

The specificity is as follows, so that a command line argument will always override the config file settings:

- command line arguments
- local config
- global config

A config file can take any of the command line arguments as JSON key values, for example:

```
{
  "verbose": true,
  "ignore": ["*.test.js", "fixtures/*"],
  "execMap": {
    "rb": "ruby",
    "pde": "processing --sketch={{pwd}} --run"
  }
}
```

The above `nodemon.json` file might be my global config so that I have support for ruby files and processing files, and I can run `nodemon demo.pde` and nodemon will automatically know how to run the script even though out of the box support for processing scripts.

A further example of options can be seen in [sample-nodemon.md](https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md)

### package.json

If you want to keep all your package configurations in one place, nodemon supports using `package.json` for configuration. Specify the config in the same format as you would for a config file but under `nodemonConfig` in the `package.json` file, for example, take the following `package.json`:

```
{
  "name": "nodemon",
  "homepage": "http://nodemon.io",
  "...": "... other standard package.json values",
  "nodemonConfig": {
    "ignore": ["test/*", "docs/*"],
    "delay": "2500"
  }
}
```

Note that if you specify a `--config` file or provide a local `nodemon.json` any `package.json` config is ignored.

*This section needs better documentation, but for now you can also see `nodemon --help config` ([also here](https://github.com/remy/nodemon/blob/master/doc/cli/config.txt))*.

## Using nodemon as a module

Please see [doc/requireable.md](https://github.com/remy/nodemon/blob/master/doc/requireable.md)

## Using nodemon as child process

Please see [doc/events.md](https://github.com/remy/nodemon/blob/master/doc/events.md#Using_nodemon_as_child_process)

## Running non-node scripts

nodemon can also be used to execute and monitor other programs. nodemon will read the file extension of the script being run and monitor that extension instead of `.js` if there's no `nodemon.json`:

```
nodemon --exec "python -v" ./app.py
```

Now nodemon will run `app.py` with python in verbose mode (note that if you're not passing args to the exec program, you don't need the quotes), and look for new or modified files with the `.py` extension.

### Default executables

Using the `nodemon.json` config file, you can define your own default executables using the `execMap` property. This is particularly useful if you're working with a language that isn't supported by default by nodemon.

To add support for nodemon to know about the `.pl` extension (for Perl), the `nodemon.json` file would add:

```
{
  "execMap": {
    "pl": "perl"
  }
}
```

Now running the following, nodemon will know to use `perl` as the executable:

```
nodemon script.pl
```

It's generally recommended to use the global `nodemon.json` to add your own `execMap` options. However, if there's a common default that's missing, this can be merged in to the project so that nodemon supports it by default, by changing [default.js](https://github.com/remy/nodemon/blob/master/lib/config/defaults.js) and sending a pull request.

## Monitoring multiple directories

By default nodemon monitors the current working directory. If you want to take control of that option, use the `--watch` option to add specific paths:

```
nodemon --watch app --watch libs app/server.js
```

Now nodemon will only restart if there are changes in the `./app` or `./libs` directory. By default nodemon will traverse sub-directories, so there's no need in explicitly including sub-directories.

Don't use unix globbing to pass multiple directories, e.g `--watch ./lib/*`, it won't work. You need a `--watch` flag per directory watched.

## Specifying extension watch list

By default, nodemon looks for files with the `.js`, `.mjs`, `.coffee`, `.litcoffee`, and `.json` extensions. If you use the `--exec` option and monitor `app.py` nodemon will monitor files with the extension of `.py`. However, you can specify your own list with the `-e` (or `--ext`) switch like so:

```
nodemon -e js,pug
```

Now nodemon will restart on any changes to files in the directory (or subdirectories) with the extensions `.js`, `.pug`.

## Ignoring files

By default, nodemon will only restart when a `.js` JavaScript file changes. In some cases you will want to ignore some specific files, directories or file patterns, to prevent nodemon from prematurely restarting your application.

This can be done via the command line:

```
nodemon --ignore lib/ --ignore tests/
```

Or specific files can be ignored:

```
nodemon --ignore lib/app.js
```

Patterns can also be ignored (but be sure to quote the arguments):

```
nodemon --ignore 'lib/*.js'
```

Note that by default, nodemon will ignore the `.git`, `node_modules`, `bower_components`, `.nyc_output`, `coverage` and `.sass-cache` directories and *add* your ignored patterns to the list. If you want to indeed watch a directory like `node_modules`, you need to [override the underlying default ignore rules](https://github.com/remy/nodemon/blob/master/faq.md#overriding-the-underlying-default-ignore-rules).

## Application isn't restarting

In some networked environments (such as a container running nodemon reading across a mounted drive), you will need to use the `legacyWatch: true` which enables Chokidar's polling.

Via the CLI, use either `--legacy-watch` or `-L` for short:

```
nodemon -L
```

Though this should be a last resort as it will poll every file it can find.

## Delaying restarting

In some situations, you may want to wait until a number of files have changed. The timeout before checking for new file changes is 1 second. If you're uploading a number of files and it's taking some number of seconds, this could cause your app to restart multiple times unnecessarily.

To add an extra throttle, or delay restarting, use the `--delay` command:

```
nodemon --delay 10 server.js
```

For more precision, milliseconds can be specified. Either as a float:

```
nodemon --delay 2.5 server.js
```

Or using the time specifier (ms):

```
nodemon --delay 2500ms server.js
```

The delay figure is number of seconds (or milliseconds, if specified) to delay before restarting. So nodemon will only restart your app the given number of seconds after the *last* file change.

If you are setting this value in `nodemon.json`, the value will always be interpreted in milliseconds. E.g., the following are equivalent:

```
nodemon --delay 2.5

{
  "delay": "2500"
}
```

## Gracefully reloading down your script

It is possible to have nodemon send any signal that you specify to your application.

```
nodemon --signal SIGHUP server.js
```

Your application can handle the signal as follows.

```
process.once("SIGHUP", function () {
  reloadSomeConfiguration();
})
```

Please note that nodemon will send this signal to every process in the process tree.

If you are using `cluster`, then each workers (as well as the master) will receive the signal. If you wish to terminate all workers on receiving a `SIGHUP`, a common pattern is to catch the `SIGHUP` in the master, and forward `SIGTERM` to all workers, while ensuring that all workers ignore `SIGHUP`.

```
if (cluster.isMaster) {
  process.on("SIGHUP", function () {
    for (const worker of Object.values(cluster.workers)) {
      worker.process.kill("SIGTERM");
    }
  });
} else {
  process.on("SIGHUP", function() {})
}
```

## Controlling shutdown of your script

nodemon sends a kill signal to your application when it sees a file update. If you need to clean up on shutdown inside your script you can capture the kill signal and handle it yourself.

The following example will listen once for the `SIGUSR2` signal (used by nodemon to restart), run the clean up process and then kill itself for nodemon to continue control:

```
process.once('SIGUSR2', function () {
  gracefulShutdown(function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
```

Note that the `process.kill` is *only* called once your shutdown jobs are complete. Hat tip to [Benjie Gillam](http://www.benjiegillam.com/2011/08/node-js-clean-restart-and-faster-development-with-nodemon/) for writing this technique up.

## Triggering events when nodemon state changes

If you want growl like notifications when nodemon restarts or to trigger an action when an event happens, then you can either `require` nodemon or add event actions to your `nodemon.json` file.

For example, to trigger a notification on a Mac when nodemon restarts, `nodemon.json` looks like this:

```
{
  "events": {
    "restart": "osascript -e 'display notification \"app restarted\" with title \"nodemon\"'"
  }
}
```

A full list of available events is listed on the [event states wiki](https://github.com/remy/nodemon/wiki/Events#states). Note that you can bind to both states and messages.

## Pipe output to somewhere else

```
nodemon({
  script: ...,
  stdout: false // important: this tells nodemon not to output to console
}).on('readable', function() { // the `readable` event indicates that data is ready to pick up
  this.stdout.pipe(fs.createWriteStream('output.txt'));
  this.stderr.pipe(fs.createWriteStream('err.txt'));
});
```

## Using nodemon in your gulp workflow

Check out the [gulp-nodemon](https://github.com/JacksonGariety/gulp-nodemon) plugin to integrate nodemon with the rest of your project's gulp workflow.

## Using nodemon in your Grunt workflow

Check out the [grunt-nodemon](https://github.com/ChrisWren/grunt-nodemon) plugin to integrate nodemon with the rest of your project's grunt workflow.

## Pronunciation

> nodemon, is it pronounced: node-mon, no-demon or node-e-mon (like pokémon)?

Well...I've been asked this many times before. I like that I've been asked this before. There's been bets as to which one it actually is.

The answer is simple, but possibly frustrating. I'm not saying (how I pronounce it). It's up to you to call it as you like. All answers are correct :)

## Design principles

- Fewer flags is better
- Works across all platforms
- Fewer features
- Let individuals build on top of nodemon
- Offer all CLI functionality as an API
- Contributions must have and pass tests

Nodemon is not perfect, and CLI arguments has sprawled beyond where I'm completely happy, but perhaps it can be reduced a little one day.

# gulp-nodemon

gulp + nodemon + convenience

## Install

```
$ npm install --save-dev gulp-nodemon
```

## Usage

Gulp-nodemon is almost exactly like regular nodemon, but it's made for use with gulp tasks.

### **nodemon([options])**

Gulp-nodemon takes an options object [just like the original](https://github.com/remy/nodemon#config-files).

Example below will start `server.js` in `development` mode and watch for changes, as well as watch all `.html` and `.js` files in the directory.

```
gulp.task('start', function (done) {
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  , done: done
  })
})
```

## Synchronous Build Tasks

*NOTE: This feature requires Node v0.12 because of `child_process.spawnSync`.*

Gulp-nodemon can synchronously perform build tasks on restart.

### **{ tasks: [Array || Function(changedFiles)] }**

If you want to lint your code when you make changes that's easy to do with a simple event. But what if you need to wait while your project re-builds before you start it up again? This isn't possible with vanilla nodemon, and can be tedious to implement yourself, but it's easy with gulp-nodemon:

```
nodemon({
  script: 'index.js'
, tasks: ['browserify']
})
```

What if you want to decouple your build processes by language? Or even by file? Easy, just set the `tasks` option to a function. Gulp-nodemon will pass you the list of changed files and it'll let you return a list of tasks you want run.

*NOTE:* If you manually restart the server (`rs`) this function will receive a `changedFiles === undefined` so check it and return the `tasks` because it expects an array to be returned.

```
nodemon({
  script: './index.js'
, ext: 'js css'
, tasks: function (changedFiles) {
    var tasks = []
    if (!changedFiles) return tasks;
    changedFiles.forEach(function (file) {
      if (path.extname(file) === '.js' && !~tasks.indexOf('lint')) tasks.push('lint')
      if (path.extname(file) === '.css' && !~tasks.indexOf('cssmin')) tasks.push('cssmin')
    })
    return tasks
  }
})
```

## Events

gulp-nodemon returns a stream just like any other NodeJS stream, **except for the `on` method**, which conveniently accepts gulp task names in addition to the typical function.

### **.on([event], [Array || Function])**

1. `[event]` is an event name as a string. See [nodemon events](https://github.com/remy/nodemon/blob/master/doc/events.md).
2. `[tasks]` An array of gulp task names or a function to execute.

### **.emit([event])**

1. `event` is an event name as a string. See [nodemon events](https://github.com/remy/nodemon/blob/master/doc/events.md#using-nodemon-events).

## Examples

### Basic Usage

The following example will run your code with nodemon, lint it when you make changes, and log a message when nodemon runs it again.

```
// Gulpfile.js
var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint())
})

gulp.task('develop', function (done) {
  var stream = nodemon({ script: 'server.js'
          , ext: 'html js'
          , ignore: ['ignored.js']
          , tasks: ['lint'] })
          , done: done

  stream
      .on('restart', function () {
        console.log('restarted!')
      })
      .on('crash', function() {
        console.error('Application has crashed!\n')
         stream.emit('restart', 10)  // restart the server in 10 seconds
      })
})
```

***You can also plug an external version or fork of nodemon***

```
gulp.task('pluggable', function() {
  nodemon({ nodemon: require('nodemon'),
            script: 'server.js'})
})
```

### Bunyan Logger integration

The [bunyan](https://github.com/trentm/node-bunyan/) logger includes a `bunyan` script that beautifies JSON logging when piped to it. Here's how you can you can pipe your output to `bunyan` when using `gulp-nodemon`:

```
gulp.task('run', ['default', 'watch'], function(done) {
    var nodemon = require('gulp-nodemon'),
        spawn   = require('child_process').spawn,
        bunyan

    nodemon({
        script: paths.server,
        ext:    'js json',
        ignore: [
            'var/',
            'node_modules/'
        ],
        watch:    [paths.etc, paths.src],
        stdout:   false,
        readable: false,
        done: done
    })
    .on('readable', function() {

        // free memory
        bunyan && bunyan.kill()

        bunyan = spawn('./node_modules/bunyan/bin/bunyan', [
            '--output', 'short',
            '--color'
        ])

        bunyan.stdout.pipe(process.stdout)
        bunyan.stderr.pipe(process.stderr)

        this.stdout.pipe(bunyan.stdin)
        this.stderr.pipe(bunyan.stdin)
    });
})
```

## Using `gulp-nodemon` with React, Browserify, Babel, ES2015, etc.

Gulp-nodemon is made to work with the "groovy" new tools like Babel, JSX, and other JavaScript compilers/bundlers/transpilers.

In gulp-nodemon land, you'll want one task for compilation that uses an on-disk cache (e.g. `gulp-file-cache`, `gulp-cache-money`) along with your bundler (e.g. `gulp-babel`, `gulp-react`, etc.). Then you'll put `nodemon({})` in another task and pass the entire compile task in your config:

```
var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , babel = require('gulp-babel')
  , Cache = require('gulp-file-cache')

var cache = new Cache();

gulp.task('compile', function () {
  var stream = gulp.src('./src/**/*.js') // your ES2015 code
                   .pipe(cache.filter()) // remember files
                   .pipe(babel({ ... })) // compile new ones
                   .pipe(cache.cache()) // cache them
                   .pipe(gulp.dest('./dist')) // write them
  return stream // important for gulp-nodemon to wait for completion
})

gulp.task('watch', ['compile'], function (done) {
  var stream = nodemon({
                 script: 'dist/' // run ES5 code
               , watch: 'src' // watch ES2015 code
               , tasks: ['compile'] // compile synchronously onChange
               , done: done
               })

  return stream
})
```

The cache keeps your development flow moving quickly and the `return stream` line ensure that your tasks get run in order. If you want them to run async, just remove that line.

## Using `gulp-nodemon` with `browser-sync`

Some people want to use `browser-sync`. That's totally fine, just start browser sync in the same task as `nodemon({})` and use gulp-nodemon's `.on('start', function () {})` to trigger browser-sync. Don't use the `.on('restart')` event because it will fire before your app is up and running.
