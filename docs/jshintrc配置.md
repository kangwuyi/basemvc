# JSHint

## 配置的三种方法

### 1. 自定义.jshintrc文件

一般.jshintrc文件放置在模块根目录，如果没有找到，会一直向上及目录查找，直到找到文件系统的根目录/，如果没找到采用默认规则。

### 2. 配置放到项目的 package.json 文件中

 ```
jshintConfig：{
    "undef": true,
    "unused": true,
    "predef": [ "MY_GLOBAL" ]
}
 ```

例子中的配置规则要求：

- “undef”: 所有使用的变量都必须已定义
- “unused”: 所有定义的变量都必须被使用
- “predef”: 这些变量已定义，检查时不用检测其是否已定义



![img](https:////upload-images.jianshu.io/upload_images/2317271-d4e57ac29334d6ef.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

### 3. 内联配置（Inline configuration）

在js文件中的注释中配置例如：



```javascript
/* jshint undef: true, unused: true */
/* globals MY_GLOBAL */
```

![img](https:////upload-images.jianshu.io/upload_images/2317271-994f521d8f03d295.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

## 配置规则

JSHint配置文件中的规则有3类：

- Enforcing: 这些规则被置为true，JSHint会对代码进行更严格的检查。
- Relaxing: 这些规则被置为true，JSHint会容忍规则中定义的情况出现。
- Environment: 这些规则被置为true，JSHint会认为代码默认有一些全局变量。

### 1. 强制选项(Enforcing options)  如果设为true会产生更多错误提示



```json
{
    "bitwise": true ,  //禁用位运算符，位运算符&在 JavaScript 中使用较少，经常是把 && 错输成 &
    "curly": true , //循环或者条件语句必须使用花括号包围
    "eqeqeq": true , //强制使用三等号
    "es3": true  ,  //兼容低级浏览器 IE 6/7/8/9
    "freeze": true , //禁止重写原生对象的原型，比如 Array，Date
        /*
            Array.prototype.count = function (value) { return 4; };
            // -> Warning: Extending prototype of native object: 'Array'.
            为原生对象添加属性确实看上去很方便，但也带来了潜在的问题
            一是如果项目中有多处为同一个对象添加了同样的属性（或函数），则很可能产生冲突；
            二是如果某段逻辑依赖于对象属性遍历，则可能产生错误。
        */
    "immed": true,
        /** 匿名函数调用必须
            (function() {
               // body
            }());
            而不是
            (function() {
               // body
            })();
            这是为了表明，表达式的值是函数的结果，而不是函数本身
        */
    "indent": 4 , //代码缩进
    "latedef": "nofunc" , //禁止定义之前使用变量，忽略 function 函数声明
    "newcap": true , //构造器函数首字母大写
    "noarg":true , //禁止使用 arguments.caller 和 arguments.callee，未来会被弃用， ECMAScript 5 禁止使用 arguments.callee
    "quotmark": false , //为 true 时，禁止单引号和双引号混用
    "undef": true , //变量未定义
    "unused": true , //变量未使用
    "strict":true , //严格模式
    "maxparams": 4 , //最多参数个数
    "maxdepth": 4  , //最大嵌套深度
    "maxcomplexity":true , //复杂度检测
    "maxlen": 600 ,  //最大行数
    "predef": [
        "before",
        "beforEach",
        "after",
        "afterEach",
        "-toberemoved"
    ]  // 用来自定义一些环境变量，变量前面有有-号表示从环境中移除次变量
    //预定义变量为ReadOnly 不能在js文件的注释中使用
}
```

### 2. 宽松选项(Relaxing options)   如果设为true会产生较少错误提示



```json
{
    "asi": true , //控制“缺少分号”的警告
    "boss": true , //控制“缺少分号”的警告
    "debug": true ,//"debug": true
    "evil": true , //控制 eval 使用警告
    "lastsemic": true ,//检查一行代码最后声明后面的分号是否遗漏
    "laxcomma": true , //检查不安全的折行，忽略逗号在最前面的编程风格
    "loopfunc": true , //检查循环内嵌套 function
    "multistr": true ,//检查多行字符串
    "notypeof": true , //检查无效的 typeof 操作符值
    "sub": true , //person['name'] vs. person.name
    "supernew": true , //new function () { ... } 和 new Object;
    "validthis": true //在非构造器函数中使用 this
}
```

### 3. 环境(Environments)



```js
{
    "browser": true ,//预定义全局变量 document，navigator，FileReader 等
    "devel": true , //定义用于调试的全局变量：console，alert
    "jquery": true, //定义全局变量 $
    "node": true, //定义全局变量  module export等
}
```



## 官网解说

[官网]: https://jshint.com/docs/options/

### [JSHint Options](https://jshint.com/docs/options/#enforcing-options)

This page's content is sourced from [the JSHint project repository](https://github.com/jshint/jshint). If you spot an error, please [open an issue](https://github.com/jshint/jshint/issues/new) or (better yet) [make a pull request](https://github.com/jshint/jshint/compare)!

#### Enforcing options

When set to true, these options will make JSHint produce more warnings about your code.

| [bitwise](https://jshint.com/docs/options/#bitwise)          | This option prohibits the use of bitwise operators such as `^` (XOR), `|` (OR) and others. Bitwise operators are very rare in JavaScript programs and quite often `&` is simply a mistyped `&&`. |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [camelcase](https://jshint.com/docs/options/#camelcase)      | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. JSHint is limiting its scope to issues of code correctness. If you would like to enforce rules relating to code style, check out [the JSCS project](https://github.com/jscs-dev/node-jscs).This option allows you to force all variable names to use either camelCase style or UPPER_CASE with underscores. |
| [curly](https://jshint.com/docs/options/#curly)              | This option requires you to always put curly braces around blocks in loops and conditionals. JavaScript allows you to omit curly braces when the block consists of only one statement, for example:`while (day)  shuffle(); `However, in some circumstances, it can lead to bugs (you'd think that `sleep()` is a part of the loop while in reality it is not):`while (day)  shuffle();  sleep(); ` |
| [enforceall](https://jshint.com/docs/options/#enforceall)    | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. The option cannot be maintained without automatically opting users in to new features. This can lead to unexpected warnings/errors in when upgrading between minor versions of JSHint.This option is a short hand for the most strict JSHint configuration as available in JSHint version 2.6.3. It enables all enforcing options and disables all relaxing options that were defined in that release. |
| [eqeqeq](https://jshint.com/docs/options/#eqeqeq)            | This options prohibits the use of `==` and `!=` in favor of `===` and `!==`. The former try to coerce values before comparing them which can lead to some unexpected results. The latter don't do any coercion so they are generally safer. If you would like to learn more about type coercion in JavaScript, we recommend [Truth, Equality and JavaScript](http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/) by Angus Croll. |
| [es3](https://jshint.com/docs/options/#es3)                  | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. Use `esversion: 3` instead.This option tells JSHint that your code needs to adhere to ECMAScript 3 specification. Use this option if you need your program to be executable in older browsers—such as Internet Explorer 6/7/8/9—and other legacy JavaScript environments. |
| [es5](https://jshint.com/docs/options/#es5)                  | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. Use `esversion: 5` instead.This option enables syntax first defined in [the ECMAScript 5.1 specification](http://es5.github.io/). This includes allowing reserved keywords as object properties. |
| [esversion](https://jshint.com/docs/options/#esversion)      | This option is used to specify the ECMAScript version to which the code must adhere. It can assume one of the following values:`3` - If you need your program to be executable in older browsers—such as Internet Explorer 6/7/8/9—and other legacy JavaScript environments`5` - To enable syntax first defined in [the ECMAScript 5.1 specification](http://www.ecma-international.org/ecma-262/5.1/index.html). This includes allowing reserved keywords as object properties.`6` - To tell JSHint that your code uses [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/index.html) specific syntax. Note that not all browsers implement them.`7` - To enable language features introduced by [ECMAScript 7](https://www.ecma-international.org/ecma-262/7.0/index.html). Notable additions: the exponentiation operator.`8` - To enable language features introduced by [ECMAScript 8](https://www.ecma-international.org/ecma-262/8.0/index.html). Notable additions: async functions, shared memory, and atomics`9` - To enable language features introduced by [ECMAScript 9](https://www.ecma-international.org/ecma-262/9.0/index.html). Notable additions: asynchronous iteration, rest/spread properties, and various RegExp extensions`10` - To enable language features introduced by ECMAScript 10](https://www.ecma-international.org/ecma-262/10.0/index.html). Notable additions: optional catch bindings. |
| [forin](https://jshint.com/docs/options/#forin)              | This option requires all `for in` loops to filter object's items. The for in statement allows for looping through the names of all of the properties of an object including those inherited through the prototype chain. This behavior can lead to unexpected items in your object so it is generally safer to always filter inherited properties out as shown in the example:`for (key in obj) {  if (obj.hasOwnProperty(key)) {    // We are sure that obj[key] belongs to the object and was not inherited.  } } `For more in-depth understanding of `for in` loops in JavaScript, read [Exploring JavaScript for-in loops](http://javascriptweblog.wordpress.com/2011/01/04/exploring-javascript-for-in-loops/) by Angus Croll. |
| [freeze](https://jshint.com/docs/options/#freeze)            | This options prohibits overwriting prototypes of native objects such as `Array`, `Date` and so on.`// jshint freeze:true Array.prototype.count = function (value) { return 4; }; // -> Warning: Extending prototype of native object: 'Array'. ` |
| [futurehostile](https://jshint.com/docs/options/#futurehostile) | This option enables warnings about the use of identifiers which are defined in future versions of JavaScript. Although overwriting them has no effect in contexts where they are not implemented, this practice can cause issues when migrating codebases to newer versions of the language. |
| [globals](https://jshint.com/docs/options/#globals)          | This option can be used to specify a white list of global variables that are not formally defined in the source code. This is most useful when combined with the `undef` option in order to suppress warnings for project-specific global variables.Setting an entry to `true` enables reading and writing to that variable. Setting it to `false` will trigger JSHint to consider that variable read-only.See also the "environment" options: a set of options to be used as short hand for enabling global variables defined in common JavaScript environments.To configure `globals` within an individual file, see [Inline Configuration](http://jshint.com/docs/#inline-configuration). |
| [immed](https://jshint.com/docs/options/#immed)              | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. JSHint is limiting its scope to issues of code correctness. If you would like to enforce rules relating to code style, check out [the JSCS project](https://github.com/jscs-dev/node-jscs).This option prohibits the use of immediate function invocations without wrapping them in parentheses. Wrapping parentheses assists readers of your code in understanding that the expression is the result of a function, and not the function itself. |
| [indent](https://jshint.com/docs/options/#indent)            | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. JSHint is limiting its scope to issues of code correctness. If you would like to enforce rules relating to code style, check out [the JSCS project](https://github.com/jscs-dev/node-jscs).This option sets a specific tab width for your code. |
| [latedef](https://jshint.com/docs/options/#latedef)          | This option prohibits the use of a variable before it was defined. JavaScript has function scope only and, in addition to that, all variables are always moved—or hoisted— to the top of the function. This behavior can lead to some very nasty bugs and that's why it is safer to always use variable only after they have been explicitly defined.Setting this option to "nofunc" will allow function declarations to be ignored.For more in-depth understanding of scoping and hoisting in JavaScript, read [JavaScript Scoping and Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting) by Ben Cherry. |
| [leanswitch](https://jshint.com/docs/options/#leanswitch)    | This option prohibits unnecessary clauses within `switch` statements, e.g.`switch (x) {  case 1:  default:    z(); } `While clauses like these are techincally valid, they do not effect program behavior and may indicate an erroneous refactoring. |
| [maxcomplexity](https://jshint.com/docs/options/#maxcomplexity) | This option lets you control cyclomatic complexity throughout your code. Cyclomatic complexity measures the number of linearly independent paths through a program's source code. Read more about [cyclomatic complexity on Wikipedia](http://en.wikipedia.org/wiki/Cyclomatic_complexity). |
| [maxdepth](https://jshint.com/docs/options/#maxdepth)        | This option lets you control how nested do you want your blocks to be:`// jshint maxdepth:2 function main(meaning) {  var day = true;   if (meaning === 42) {    while (day) {      shuffle();       if (tired) { // JSHint: Blocks are nested too deeply (3).          sleep();      }    }  } } ` |
| [maxerr](https://jshint.com/docs/options/#maxerr)            | This options allows you to set the maximum amount of warnings JSHint will produce before giving up. Default is 50. |
| [maxlen](https://jshint.com/docs/options/#maxlen)            | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. JSHint is limiting its scope to issues of code correctness. If you would like to enforce rules relating to code style, check out [the JSCS project](https://github.com/jscs-dev/node-jscs).This option lets you set the maximum length of a line. |
| [maxparams](https://jshint.com/docs/options/#maxparams)      | This option lets you set the max number of formal parameters allowed per function:`// jshint maxparams:3 function login(request, onSuccess) {  // ... } // JSHint: Too many parameters per function (4). function logout(request, isManual, whereAmI, onSuccess) {  // ... } ` |
| [maxstatements](https://jshint.com/docs/options/#maxstatements) | This option lets you set the max number of statements allowed per function:`// jshint maxstatements:4 function main() {  var i = 0;  var j = 0;   // Function declarations count as one statement. Their bodies  // don't get taken into account for the outer function.  function inner() {    var i2 = 1;    var j2 = 1;     return i2 + j2;  }   j = i + j;  return j; // JSHint: Too many statements per function. (5) } ` |
| [newcap](https://jshint.com/docs/options/#newcap)            | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. JSHint is limiting its scope to issues of code correctness. If you would like to enforce rules relating to code style, check out [the JSCS project](https://github.com/jscs-dev/node-jscs).This option requires you to capitalize names of constructor functions. Capitalizing functions that are intended to be used with `new` operator is just a convention that helps programmers to visually distinguish constructor functions from other types of functions to help spot mistakes when using `this`.Not doing so won't break your code in any browsers or environments but it will be a bit harder to figure out—by reading the code—if the function was supposed to be used with or without new. And this is important because when the function that was intended to be used with `new` is used without it, `this` will point to the global object instead of a new object. |
| [noarg](https://jshint.com/docs/options/#noarg)              | This option prohibits the use of `arguments.caller` and `arguments.callee`. Both `.caller` and `.callee` make quite a few optimizations impossible so they were deprecated in future versions of JavaScript. In fact, ECMAScript 5 forbids the use of `arguments.callee` in strict mode. |
| [nocomma](https://jshint.com/docs/options/#nocomma)          | This option prohibits the use of the comma operator. When misused, the comma operator can obscure the value of a statement and promote incorrect code. |
| [noempty](https://jshint.com/docs/options/#noempty)          | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. JSHint is limiting its scope to issues of code correctness. If you would like to enforce rules relating to code style, check out [the JSCS project](https://github.com/jscs-dev/node-jscs).This option warns when you have an empty block in your code. JSLint was originally warning for all empty blocks and we simply made it optional. There were no studies reporting that empty blocks in JavaScript break your code in any way. |
| [nonbsp](https://jshint.com/docs/options/#nonbsp)            | This option warns about "non-breaking whitespace" characters. These characters can be entered with option-space on Mac computers and have a potential of breaking non-UTF8 web pages. |
| [nonew](https://jshint.com/docs/options/#nonew)              | This option prohibits the use of constructor functions for side-effects. Some people like to call constructor functions without assigning its result to any variable:`new MyConstructor(); `There is no advantage in this approach over simply calling `MyConstructor` since the object that the operator `new` creates isn't used anywhere so you should generally avoid constructors like this one. |
| [noreturnawait](https://jshint.com/docs/options/#noreturnawait) | Async functions resolve on their return value. In most cases, this makes returning the result of an AwaitExpression (which is itself a Promise instance) unnecessary. For clarity, it's often preferable to return the result of the asynchronous operation directly. The notable exception is within the `try` clause of a TryStatement--for more, see "await vs return vs return await":https://jakearchibald.com/2017/await-vs-return-vs-return-await/ |
| [predef](https://jshint.com/docs/options/#predef)            | This option allows you to control which variables JSHint considers to be implicitly defined in the environment. Configure it with an array of string values. Prefixing a variable name with a hyphen (-) character will remove that name from the collection of predefined variables.JSHint will consider variables declared in this way to be read-only.This option cannot be specified in-line; it may only be used via the JavaScript API or from an external configuration file. |
| [quotmark](https://jshint.com/docs/options/#quotmark)        | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. JSHint is limiting its scope to issues of code correctness. If you would like to enforce rules relating to code style, check out [the JSCS project](https://github.com/jscs-dev/node-jscs).This option enforces the consistency of quotation marks used throughout your code. It accepts three values: `true` if you don't want to enforce one particular style but want some consistency, `"single"` if you want to allow only single quotes and `"double"` if you want to allow only double quotes. |
| [regexpu](https://jshint.com/docs/options/#regexpu)          | This option enables warnings for regular expressions which do not include the "u" flag. The "u" flag extends support for Unicode and also enables more strict parsing rules. JSHint will enforce these rules even if it is executed in a JavaScript engine which does not support the "u" flag. |
| [shadow](https://jshint.com/docs/options/#shadow)            | This option suppresses warnings about variable shadowing i.e. declaring a variable that had been already declared somewhere in the outer scope."inner" - check for variables defined in the same scope only"outer" - check for variables defined in outer scopes as wellfalse - same as innertrue - allow variable shadowing |
| [singleGroups](https://jshint.com/docs/options/#singleGroups) | This option prohibits the use of the grouping operator when it is not strictly required. Such usage commonly reflects a misunderstanding of unary operators, for example:`// jshint singleGroups: true delete(obj.attr); // Warning: Unnecessary grouping operator. ` |
| [strict](https://jshint.com/docs/options/#strict)            | This option requires the code to run in ECMAScript 5's strict mode. [Strict mode](https://developer.mozilla.org/en/JavaScript/Strict_mode) is a way to opt in to a restricted variant of JavaScript. Strict mode eliminates some JavaScript pitfalls that didn't cause errors by changing them to produce errors. It also fixes mistakes that made it difficult for the JavaScript engines to perform certain optimizations."global" - there must be a `"use strict";` directive at global level"implied" - lint the code as if there is the `"use strict";` directivefalse - disable warnings about strict modetrue - there must be a `"use strict";` directive at function level;`        this is preferable for scripts intended to be loaded in web        browsers directly because enabling strict mode globally        could adversely effect other scripts running on the same        page ` |
| [trailingcomma](https://jshint.com/docs/options/#trailingcomma) | This option warns when a comma is not placed after the last element in an array or object literal. Due to bugs in old versions of IE, trailing commas used to be discouraged, but since ES5 their semantics were standardized. (See [#11.1.4](http://www.ecma-international.org/ecma-262/5.1/#sec-11.1.4) and [#11.1.5](http://www.ecma-international.org/ecma-262/5.1/#sec-11.1.5).) Now, they help to prevent the same [visual ambiguities](http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.2) that the strict usage of semicolons helps prevent.For example, this code might have worked last Tuesday:`[    b + c ].forEach(print); `But if one adds an element to the array and forgets to compensate for the missing comma, no syntax error is thrown, and a linter cannot determine if this was a mistake or an intentional function invocation.`[    b + c    (d + e) ].forEach(print); `If one always appends a list item with a comma, this ambiguity cannot occur:`[    b + c, ].forEach(print); [    b + c,    (d + e), ].forEach(print); ` |
| [undef](https://jshint.com/docs/options/#undef)              | This option prohibits the use of explicitly undeclared variables. This option is very useful for spotting leaking and mistyped variables.`// jshint undef:true function test() {  var myVar = 'Hello, World';  console.log(myvar); // Oops, typoed here. JSHint with undef will complain } `If your variable is defined in another file, you can use the `global` directive to tell JSHint about it. |
| [unused](https://jshint.com/docs/options/#unused)            | This option warns when you define and never use your variables. It is very useful for general code cleanup, especially when used in addition to `undef`.`// jshint unused:true function test(a, b) {  var c, d = 2;   return a + d; } test(1, 2); // Line 3: 'b' was defined but never used. // Line 4: 'c' was defined but never used. `In addition to that, this option will warn you about unused global variables declared via the `global` directive.When set to `true`, unused parameters that are followed by a used parameter will not produce warnings. This option can be set to `vars` to only check for variables, not function parameters, or `strict` to check all variables and parameters. |
| [varstmt](https://jshint.com/docs/options/#varstmt)          | When set to true, the use of VariableStatements are forbidden. For example:`// jshint varstmt: true var a; // Warning: `var` declarations are forbidden. Use `let` or `const` instead. ` |

#### [Relaxing options](https://jshint.com/docs/options/#relaxing-options)

When set to true, these options will make JSHint produce fewer warnings about your code.

| [asi](https://jshint.com/docs/options/#asi)                  | This option suppresses warnings about missing semicolons. There is a lot of FUD about semicolon spread by quite a few people in the community. The common myths are that semicolons are required all the time (they are not) and that they are unreliable. JavaScript has rules about semicolons which are followed by *all* browsers so it is up to you to decide whether you should or should not use semicolons in your code.For more information about semicolons in JavaScript read [An Open Letter to JavaScript Leaders Regarding Semicolons](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding) by Isaac Schlueter and [JavaScript Semicolon Insertion](http://inimino.org/~inimino/blog/javascript_semicolons). |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [boss](https://jshint.com/docs/options/#boss)                | This option suppresses warnings about the use of assignments in cases where comparisons are expected. More often than not, code like `if (a = 10) {}` is a typo. However, it can be useful in cases like this one:`for (var i = 0, person; person = people[i]; i++) {} `You can silence this error on a per-use basis by surrounding the assignment with parenthesis, such as:`for (var i = 0, person; (person = people[i]); i++) {} ` |
| [debug](https://jshint.com/docs/options/#debug)              | This option suppresses warnings about the `debugger` statements in your code. |
| [elision](https://jshint.com/docs/options/#elision)          | This option tells JSHint that your code uses ES3 array elision elements, or empty elements (for example, `[1, , , 4, , , 7]`). |
| [eqnull](https://jshint.com/docs/options/#eqnull)            | This option suppresses warnings about `== null` comparisons. Such comparisons are often useful when you want to check if a variable is `null` or `undefined`. |
| [esnext](https://jshint.com/docs/options/#esnext)            | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. Use `esversion: 6` instead.This option tells JSHint that your code uses ECMAScript 6 specific syntax. Note that not all browsers implement these features.More info:[Specification for ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/index.html) |
| [evil](https://jshint.com/docs/options/#evil)                | This option suppresses warnings about the use of `eval`. The use of `eval` is discouraged because it can make your code vulnerable to various injection attacks and it makes it hard for JavaScript interpreter to do certain optimizations. |
| [expr](https://jshint.com/docs/options/#expr)                | This option suppresses warnings about the use of expressions where normally you would expect to see assignments or function calls. Most of the time, such code is a typo. However, it is not forbidden by the spec and that's why this warning is optional. |
| [funcscope](https://jshint.com/docs/options/#funcscope)      | This option suppresses warnings about declaring variables inside of control structures while accessing them later from the outside. Even though identifiers declared with `var` have two real scopes—global and function—such practice leads to confusion among people new to the language and hard-to-debug bugs. This is why, by default, JSHint warns about variables that are used outside of their intended scope.`function test() {  if (true) {    var x = 0;  }   x += 1; // Default: 'x' used out of scope.            // No warning when funcscope:true } ` |
| [globalstrict](https://jshint.com/docs/options/#globalstrict) | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. Use `strict: "global"`.This option suppresses warnings about the use of global strict mode. Global strict mode can break third-party widgets so it is not recommended.For more info about strict mode see the `strict` option. |
| [iterator](https://jshint.com/docs/options/#iterator)        | This option suppresses warnings about the `__iterator__` property. This property is not supported by all browsers so use it carefully. |
| [lastsemic](https://jshint.com/docs/options/#lastsemic)      | This option suppresses warnings about missing semicolons, but only when the semicolon is omitted for the last statement in a one-line block:`var name = (function() { return 'Anton' }()); `This is a very niche use case that is useful only when you use automatic JavaScript code generators. |
| [laxbreak](https://jshint.com/docs/options/#laxbreak)        | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. JSHint is limiting its scope to issues of code correctness. If you would like to enforce rules relating to code style, check out [the JSCS project](https://github.com/jscs-dev/node-jscs).This option suppresses most of the warnings about possibly unsafe line breakings in your code. It doesn't suppress warnings about comma-first coding style. To suppress those you have to use `laxcomma` (see below). |
| [laxcomma](https://jshint.com/docs/options/#laxcomma)        | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. JSHint is limiting its scope to issues of code correctness. If you would like to enforce rules relating to code style, check out [the JSCS project](https://github.com/jscs-dev/node-jscs).This option suppresses warnings about comma-first coding style:`var obj = {    name: 'Anton'  , handle: 'valueof'  , role: 'SW Engineer' }; ` |
| [loopfunc](https://jshint.com/docs/options/#loopfunc)        | This option suppresses warnings about functions inside of loops. Defining functions inside of loops can lead to bugs such as this one:`var nums = []; for (var i = 0; i < 10; i++) {  nums[i] = function (j) {    return i + j;  }; } nums[0](2); // Prints 12 instead of 2 `To fix the code above you need to copy the value of `i`:`var nums = []; for (var i = 0; i < 10; i++) {  (function (i) {    nums[i] = function (j) {        return i + j;    };  }(i)); } ` |
| [moz](https://jshint.com/docs/options/#moz)                  | This options tells JSHint that your code uses Mozilla JavaScript extensions. Unless you develop specifically for the Firefox web browser you don't need this option.More info:[New in JavaScript 1.7](https://developer.mozilla.org/en-US/docs/JavaScript/New_in_JavaScript/1.7) |
| [multistr](https://jshint.com/docs/options/#multistr)        | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. JSHint is limiting its scope to issues of code correctness. If you would like to enforce rules relating to code style, check out [the JSCS project](https://github.com/jscs-dev/node-jscs).This option suppresses warnings about multi-line strings. Multi-line strings can be dangerous in JavaScript because all hell breaks loose if you accidentally put a whitespace in between the escape character (`\`) and a new line.Note that even though this option allows correct multi-line strings, it still warns about multi-line strings without escape characters or with anything in between the escape character and a whitespace.`// jshint multistr:true var text = "Hello\ World"; // All good. text = "Hello World"; // Warning, no escape character. text = "Hello\ World"; // Warning, there is a space after \ ` |
| [notypeof](https://jshint.com/docs/options/#notypeof)        | This option suppresses warnings about invalid `typeof` operator values. This operator has only [a limited set of possible return values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof). By default, JSHint warns when you compare its result with an invalid value which often can be a typo.`// 'fuction' instead of 'function' if (typeof a == "fuction") { // Invalid typeof value 'fuction'  // ... } `Do not use this option unless you're absolutely sure you don't want these checks. |
| [noyield](https://jshint.com/docs/options/#noyield)          | This option suppresses warnings about generator functions with no `yield` statement in them. |
| [plusplus](https://jshint.com/docs/options/#plusplus)        | This option prohibits the use of unary increment and decrement operators. Some people think that `++` and `--` reduces the quality of their coding styles and there are programming languages—such as Python—that go completely without these operators. |
| [proto](https://jshint.com/docs/options/#proto)              | This option suppresses warnings about the `__proto__` property. |
| [scripturl](https://jshint.com/docs/options/#scripturl)      | This option suppresses warnings about the use of script-targeted URLs—such as `javascript:...`. |
| [sub](https://jshint.com/docs/options/#sub)                  | **Warning** This option has been deprecated and will be removed in the next major release of JSHint. JSHint is limiting its scope to issues of code correctness. If you would like to enforce rules relating to code style, check out [the JSCS project](https://github.com/jscs-dev/node-jscs).This option suppresses warnings about using `[]` notation when it can be expressed in dot notation: `person['name']` vs. `person.name`. |
| [supernew](https://jshint.com/docs/options/#supernew)        | This option suppresses warnings about "weird" constructions like `new function () { ... }` and `new Object;`. Such constructions are sometimes used to produce singletons in JavaScript:`var singleton = new function() {  var privateVar;   this.publicMethod  = function () {}  this.publicMethod2 = function () {} }; ` |
| [validthis](https://jshint.com/docs/options/#validthis)      | This option suppresses warnings about possible strict violations when the code is running in strict mode and you use `this` in a non-constructor function. You should use this option—in a function scope only—when you are positive that your use of `this` is valid in the strict mode (for example, if you call your function using `Function.call`).**Note:** This option can be used only inside of a function scope. JSHint will fail with an error if you will try to set this option globally. |
| [withstmt](https://jshint.com/docs/options/#withstmt)        | This option suppresses warnings about the use of the `with` statement. The semantics of the `with` statement can cause confusion among developers and accidental definition of global variables.More info:[with Statement Considered Harmful](http://yuiblog.com/blog/2006/04/11/with-statement-considered-harmful/) |

#### [Environments](https://jshint.com/docs/options/#environments)

These options let JSHint know about some pre-defined global variables.

| [browser](https://jshint.com/docs/options/#browser)         | This option defines globals exposed by modern browsers: all the way from good old `document` and `navigator` to the HTML5 `FileReader` and other new developments in the browser world.**Note:** This option doesn't expose variables like `alert` or `console`. See option `devel` for more information. |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| [browserify](https://jshint.com/docs/options/#browserify)   | This option defines globals available when using [the Browserify tool](http://browserify.org/) to build a project. |
| [couch](https://jshint.com/docs/options/#couch)             | This option defines globals exposed by [CouchDB](http://couchdb.apache.org/). CouchDB is a document-oriented database that can be queried and indexed in a MapReduce fashion using JavaScript. |
| [devel](https://jshint.com/docs/options/#devel)             | This option defines globals that are usually used for logging poor-man's debugging: `console`, `alert`, etc. It is usually a good idea to not ship them in production because, for example, `console.log` breaks in legacy versions of Internet Explorer. |
| [dojo](https://jshint.com/docs/options/#dojo)               | This option defines globals exposed by the [Dojo Toolkit](http://dojotoolkit.org/). |
| [jasmine](https://jshint.com/docs/options/#jasmine)         | This option defines globals exposed by [the Jasmine unit testing framework](https://jasmine.github.io/). |
| [jquery](https://jshint.com/docs/options/#jquery)           | This option defines globals exposed by the [jQuery](http://jquery.com/) JavaScript library. |
| [mocha](https://jshint.com/docs/options/#mocha)             | This option defines globals exposed by the "BDD" and "TDD" UIs of the [Mocha unit testing framework](http://mochajs.org/). |
| [module](https://jshint.com/docs/options/#module)           | This option informs JSHint that the input code describes an ECMAScript 6 module. All module code is interpreted as strict mode code. |
| [mootools](https://jshint.com/docs/options/#mootools)       | This option defines globals exposed by the [MooTools](http://mootools.net/) JavaScript framework. |
| [node](https://jshint.com/docs/options/#node)               | This option defines globals available when your code is running inside of the Node runtime environment. [Node.js](http://nodejs.org/) is a server-side JavaScript environment that uses an asynchronous event-driven model. This option also skips some warnings that make sense in the browser environments but don't make sense in Node such as file-level `use strict` pragmas and `console.log` statements. |
| [nonstandard](https://jshint.com/docs/options/#nonstandard) | This option defines non-standard but widely adopted globals such as `escape` and `unescape`. |
| [phantom](https://jshint.com/docs/options/#phantom)         | This option defines globals available when your core is running inside of the PhantomJS runtime environment. [PhantomJS](http://phantomjs.org/) is a headless WebKit scriptable with a JavaScript API. It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG. |
| [prototypejs](https://jshint.com/docs/options/#prototypejs) | This option defines globals exposed by the [Prototype](http://www.prototypejs.org/) JavaScript framework. |
| [qunit](https://jshint.com/docs/options/#qunit)             | This option defines globals exposed by [the QUnit unit testing framework](http://qunitjs.com/). |
| [rhino](https://jshint.com/docs/options/#rhino)             | This option defines globals available when your code is running inside of the Rhino runtime environment. [Rhino](http://www.mozilla.org/rhino/) is an open-source implementation of JavaScript written entirely in Java. |
| [shelljs](https://jshint.com/docs/options/#shelljs)         | This option defines globals exposed by [the ShellJS library](http://documentup.com/arturadib/shelljs). |
| [typed](https://jshint.com/docs/options/#typed)             | This option defines globals for typed array constructors.More info:[JavaScript typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) |
| [worker](https://jshint.com/docs/options/#worker)           | This option defines globals available when your code is running inside of a Web Worker. [Web Workers](https://developer.mozilla.org/en/Using_web_workers) provide a simple means for web content to run scripts in background threads. |
| [wsh](https://jshint.com/docs/options/#wsh)                 | This option defines globals available when your code is running as a script for the [Windows Script Host](http://en.wikipedia.org/wiki/Windows_Script_Host). |
| [yui](https://jshint.com/docs/options/#yui)                 | This option defines globals exposed by the [YUI](http://yuilibrary.com/) JavaScript framework. |

#### [Unstable](https://jshint.com/docs/options/#unstable)

These options enable behavior which is subject to change between major releases of JSHint. Exercise caution when enabling them in automated environments (e.g. continuous integration).

| [bigint](https://jshint.com/docs/options/#bigint)            | [The BigInt proposal](https://github.com/tc39/proposal-bigint) extends the language's grammer for numeric literals to support integer values of arbitrary precision. It also introduces a new value of the `typeof` operator, "bigint".Mathematical operations which use both BigInt and traditional ECMAScript Number values may not have the intended effect. Due to the weakly-typed nature of the language, JSHint is unable to identify such cases. |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [exports.unstable = {](https://jshint.com/docs/options/#exports.unstable = {) | Unstable options allow control for parsing and linting of proposed additions to the JavaScript language. Just like the language features they describe, the presence and behavior of these options is volatile; JSHint reserves the right to remove or modify them between major version releases. |

### Command-line Interface

The JSHint CLI can be installed via npm (see [the Installation page](https://jshint.com/install) for instructions).

Contents: [Specifying Input](https://jshint.com/docs/cli/#specifying-input) · [Specifying Linting Options](https://jshint.com/docs/cli/#specifying-linting-options) · [Special Options](https://jshint.com/docs/cli/#special-options) · [Ignoring Files](https://jshint.com/docs/cli/#ignoring-files) · [Flags](https://jshint.com/docs/cli/#flags)

#### Specifying Input

The `jshint` executable accepts file system paths as command-line arguments. If a provided path describes a file, the executable will read that file and lint the JavaScript code it contains:

```
$ jshint myfile.js
myfile.js: line 10, col 39, Octal literals are not allowed in strict mode.

1 error
```

If a provided path describes a file system directory, JSHint will traverse the directory and any subdirectories recursively, reading all JavaScript files and linting their contents:

```
$ tree a-directory/
a-directory/
├── file-1.js
└── nested
    └── file-2.js

1 directory, 2 files

$ jshint a-directory/
a-directory/file-1.js: line 3, col 1, 'with' is not allowed in strict mode.

a-directory/nested/file-2.js: line 3, col 3, Unreachable 'void' after 'return'.

2 errors
```

If a file path is a dash (`-`) then JSHint will read from standard input.

#### Specifying Linting Options

The `jshint` executable is capable of applying [linting options](https://jshint.com/docs/options) specified in an external [JSON](http://json.org/)-formatted file. Such a file might look like this:

```
{
  "curly": true,
  "eqeqeq": true,
  "nocomma": true
}
```

`jshint` will look for this configuration in a number of locations, stopping at the first positive match:

1. The location specified with the `--config` [flag](https://jshint.com/docs/cli/#flags)
2. A file named `package.json` located in the current directory or any parent of the current directory (the configuration should be declared as the `jshintConfig` attribute of that file's JSON value)
3. A file named `.jshintrc` located in the current directory or any parent of the current directory
4. A file named `.jshintrc` located in the current user's "home" directory (where defined)

If this search yields no results, `jshint` will lint the input code as if no linting rules had been enabled.

The command-line interface offers some [special options](https://jshint.com/docs/cli/#special-options) in addition to [the ones available in other contexts](https://jshint.com/docs/options)

#### Special Options

The following options concern the file system and are only available from within configuration files (i.e. not from inline directives or the API):

##### `extends`

Use another configuration file as a "base". The value of this option should be a file path to another configuration file, and the path should be relative to the current file.

For example, you might define a `.jshintrc` file in the top-level directory of your project (say, `./.jshintrc') to specify the [linting options](https://jshint.com/docs/options) you would like to use in your entire project:

```
{
  "undef": true,
  "unused": true
}
```

You may want to re-use this configuration for your project's automated tests, but also [allow for global variables](http://localhost:4000/docs/options#globals) that are specific to the test environment. In this case, you could create a a new file in their test directory, (`./test/.jshintrc` for example), and include the following configuration:

```
{
  "extends": "../.jshintrc",
  "globals": {
    "test": false,
    "assert": false
  }
}
```

##### `overrides`

Specify options that should only be applied to files matching a given path pattern.

The following configuration file [disallows variable shadowing](https://jshint.com/docs/options#shadow) for *all* files and [allows expressions as statements](https://jshint.com/docs/options#expr) for only those files ending in `-test.js`:

```
{
  "shadow": false,
  "overrides": {
    "lib/*-test.js": {
      "expr": true
    }
  }
}
```

#### Ignoring Files

`jshint` can be configured to ignore files based on their location in the filesystem. You may create a dedicated "ignore" file to list any number of file names, file paths, or file path patterns that should not be linted. Path patterns will be interpreted using [the `minimatch` npm module](https://www.npmjs.com/package/minimatch), which itself is based on [the Unix filename matching syntax, fnmatch](http://linux.die.net/man/3/fnmatch).

```
build/
src/**/tmp.js
```

`jshint` will look for this configuration in a number of locations, stopping at the first positive match:

1. The location specified with the `--exclude-path` [flag](https://jshint.com/docs/cli/#flags)
2. A file named `.jshintignore` located in the current directory or any parent of the current directory

If this search yields no results, `jshint` will not ignore any files.

#### Flags

##### `--config`

Explicitly sets the location on the file system from which `jshint` should load linting options.

```
$ jshint --config ../path/to/my/config.json
```

##### `--reporter`

Allows you to modify JSHint's output by replacing its default output function with your own implementation.

```
$ jshint --reporter=myreporter.js myfile.js
```

This flag also supports two pre-defined reporters: *jslint*, to make output compatible with JSLint, and *checkstyle*, to make output compatible with CheckStyle XML.

```
$ jshint --reporter=checkstyle myfile.js
<?xml version="1.0" encoding="utf-8"?>
<checkstyle version="4.3">
  <file name="myfile.js">
    <error line="10" column="39" severity="error"
      message="Octal literals are not allowed in strict mode."/>
  </file>
</checkstyle>
```

See also: [Writing your own JSHint reporter](https://jshint.com/docs/reporters/).

##### `--verbose`

Adds message codes to the JSHint output.

##### `--show-non-errors`

Shows additional data generated by JSHint.

```
$ jshint --show-non-errors myfile.js
myfile.js: line 10, col 39, Octal literals are not allowed in strict mode.

1 error

myfile.js:
  Unused variables:
    foo, bar
```

##### `--extra-ext`

Allows you to specify additional file extensions to check (default is .js).

##### `--extract=[auto|always|never]`

Tells JSHint to extract JavaScript from HTML files before linting:

```
tmp ☭ cat test.html
<html>
  <head>
    <title>Hello, World!</title>
    <script>
      function hello() {
        return "Hello, World!";
      }
    </script>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <script>
      console.log(hello())
    </script>
  </body>
</html>

tmp ☭ jshint --extract=auto test.html
test.html: line 13, col 27, Missing semicolon.

1 error
```

If you set it to *always* JSHint will always attempt to extract JavaScript. And if you set it to *auto* it will make an attempt only if file looks like it's an HTML file.

##### `--exclude`

Allows you to specify directories which you DON'T want to be linted.

##### `--exclude-path`

Allows you to provide your own .jshintignore file. For example, you can point JSHint to your .gitignore file and use it instead of default .jshintignore.

##### `--prereq`

Allows you to specify prerequisite files i.e. files which include definitions of global variables used throughout your project.

##### `--help`

Shows a nice little help message similar to what you're reading right now.

##### `--version`

Shows the installed version of JSHint.

### Documentation

JSHint is a program that flags suspicious usage in programs written in JavaScript. The core project consists of a library itself as well as a CLI program distributed as a Node module.

More docs: [List of all JSHint options](https://jshint.com/docs/options/) · [Command-line Interface](https://jshint.com/docs/cli/) · [API](https://jshint.com/docs/api/) · [Writing your own reporter](https://jshint.com/docs/reporters/) · [FAQ](https://jshint.com/docs/faq/)

#### Basic usage

First, check out [the installation instructions](https://jshint.com/install/) for details on how to install JSHint in your preferred environment. Both the command line executable and the JavaScript API offer unique ways to configure JSHint's behaviour. The most common usages are:

- [As a command-line tool](https://jshint.com/docs/cli/) (via [Node.js](https://nodejs.org/))
- [As a JavaScript module](https://jshint.com/docs/api/)

Regardless of your preferred environment, you can control JSHint's behavior through specifying any number of [linting options](https://jshint.com/docs/options/). In addition, JSHint will honor any directives declared within the input source code--see [the section on in-line directives](https://jshint.com/docs/#inline-configuration) for more information.

#### Configuration

JSHint comes with a default set of warnings but it was designed to be very configurable. There are three main ways to configure your copy of JSHint: you can either specify the configuration file manually via the `--config` flag, use a special file `.jshintrc` or put your config into your projects `package.json` file under the `jshintConfig` property. In case of `.jshintrc`, JSHint will start looking for this file in the same directory as the file that's being linted. If not found, it will move one level up the directory tree all the way up to the filesystem root. (Note that if the input comes from stdin, JSHint doesn't attempt to find a configuration file)

This setup allows you to have different configuration files per project. Place your file into the project root directory and, as long as you run JSHint from anywhere within your project directory tree, the same configuration file will be used.

Configuration file is a simple JSON file that specifies which JSHint options to turn on or off. For example, the following file will enable warnings about undefined and unused variables and tell JSHint about a global variable named `MY_GLOBAL`.

```
{
  "undef": true,
  "unused": true,
  "globals": {
    "MY_GLOBAL": true
  }
}
```



#### Inline configuration

In addition to using configuration files you can configure JSHint from within your files using special comments. These comments start with a label such as `jshint` or `globals` (complete list below) and are followed by a comma-separated list of values. For example, the following snippet will enable warnings about undefined and unused variables and tell JSHint about a global variable named `MY_GLOBAL`.

```
/* jshint undef: true, unused: true */
/* globals MY_GLOBAL */
```

You can use both multi- and single-line comments to configure JSHint. These comments are function scoped meaning that if you put them inside a function they will affect only this function's code.

#### Directives

通过配置文件指定项目中的JavaScript代码需要遵守的规则，但是在实际项目中，存在某个文件需要特别的处理，或者是某个文件的某个方法需要特别的宽容的情况，对于这种情况，JSHint提供了一些指令内嵌到JavaScript代码中，在JSHint检查的时候会根据指令进行处理。JSHint提供的指令有：

| 参数     | 说明                                         |
| -------- | -------------------------------------------- |
| jshint   | 设置JSHint规则                               |
| jslint   | 设置JSHint兼容的JSLint规则                   |
| globals  | 设置全局变量的处理                           |
| exported | 告诉JSHint，当前文件会导出一些全局变量       |
| ignore   | 忽略一些代码，可忽略一段代码，也可忽略仅一行 |

Here's a list of configuration directives supported by JSHint:

| 参数     | 描述                                                         | eg                                                           |
| :--: | :--: | :--: |
| jshint   | A directive for setting JSHint options.                      | `/* jshint strict: true */`                                  |
| jslint   | A directive for setting JSHint-compatible JSLint options.    | `/* jslint vars: true */`                                    |
| globals  | A directive for telling JSHint about global variables that are defined elsewhere. If value is `false` (default), JSHint will consider that variable as read-only. Affects the `undef` option. | `/* globals MY_LIB: false */`                                |
|          | You can also blacklist certain global variables to make sure they are not used anywhere in the current file. | `/* globals -BAD_LIB */`                                     |
| exported | A directive for telling JSHint about global variables that are defined in the current file but used elsewhere. Affects the `unused` option. | `/* exported EXPORTED_LIB */`                                |
| members  | A directive for telling JSHint about all properties you intend to use. **This directive is deprecated.** |                                                              |
| ignore   | A directive for telling JSHint to ignore a block of code.    | `// Code here will be linted with JSHint.<br/>/* jshint ignore:start */<br/>// Code here will be ignored by JSHint.<br/>/* jshint ignore:end */` |
|          | All code in between `ignore:start` and `ignore:end` won't be passed to JSHint so you can use any language extension such as [Facebook React](http://facebook.github.io/react/). Additionally, you can ignore a single line with a trailing comment: | `ignoreThis(); // jshint ignore:line`                        |



#### Options

Most often, when you need to tune JSHint to your own taste, all you need to do is to find an appropriate option. Trying to figure out how JSHint options work can be confusing and frustrating (and we're working on fixing that!) so please read the following couple of paragraphs carefully.

JSHint has two types of options: enforcing and relaxing. The former are used to make JSHint more strict while the latter are used to suppress some warnings. Take the following code as an example:

```
function main(a, b) {
  return a == null;
}
```

This code will produce the following warning when run with default JSHint options:

```
line 2, col 14, Use '===' to compare with 'null'.
```

Let's say that you know what you're doing and want to disable the produced warning but, in the same time, you're curious whether you have any variables that were defined but never used. What you need to do, in this case, is to enable two options: one relaxing that will suppress the `=== null` warning and one enforcing that will enable checks for unused variables. In your case these options are `unused` and `eqnull`.

```
/*jshint unused:true, eqnull:true */
function main(a, b) {
  return a == null;
}
```

After that, JSHint will produce the following warning while linting this example code:

```
demo.js: line 2, col 14, 'main' is defined but never used.
demo.js: line 2, col 19, 'b' is defined but never used.
```

Sometimes JSHint doesn't have an appropriate option that disables some particular warning. In this case you can use `jshint` directive to disable warnings by their code. Let's say that you have a file that was created by combining multiple different files into one:

```
"use strict";
/* ... */

// From another file
function b() {
  "use strict";
  /* ... */
}
```

This code will trigger a warning about an unnecessary directive in function `b`. JSHint sees that there's already a global "use strict" directive and informs you that all other directives are redundant. But you don't want to strip out these directives since the file was auto-generated. The solution is to run JSHint with a flag `--verbose` and note the warning code (W034 in this case):

```
$ jshint --verbose myfile.js
myfile.js: line 6, col 3, Unnecessary directive "use strict". (W034)
```

Then, to hide this warning, just add the following snippet to your file:

```
/* jshint -W034 */
```

A couple things to note:

1. This syntax works only with warnings (code starts with `W`), it doesn't work with errors (code starts with `E`).
2. This syntax will disable all warnings with this code. Some warnings are more generic than others so be cautious.

To re-enable a warning that has been disabled with the above snippet you can use:

```
/* jshint +W034 */
```

This is especially useful when you have code which causes a warning but that you know is safe in the context. In these cases you can disable the warning as above and then re-enable the warning afterwards:

```
var y = Object.create(null);
// ...
/*jshint -W089 */
for (var prop in y) {
    // ...
}
/*jshint +W089 */
```

[This page](https://jshint.com/docs/options/) contains a list of all options supported by JSHint.

##### Switch statements

By default JSHint warns when you omit `break` or `return` statements within switch statements:

```
switch (cond) {
case "one":
  doSomething(); // JSHint will warn about missing 'break' here.
case "two":
  doSomethingElse();
}
```

If you really know what you're doing you can tell JSHint that you intended the case block to fall through by adding a `/* falls through */` comment:

```
switch (cond) {
case "one":
  doSomething();
  /* falls through */
case "two":
  doSomethingElse();
}
```

## 其他参考
### Gulp集成

安装JSHint的Gulp插件：`npm install gulp-jshint --save-dev`

编写运行JSHint的任务：
```js
var jshint = require('gulp-jshint');

gulp.task('hint', function () {
    gulp.src('./app/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
```
