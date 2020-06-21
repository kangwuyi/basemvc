# gitattributes
### 命令行

#### safecrlf 设置为 true

```
# 拒绝提交包含混合换行符的文件
git config --global core.safecrlf true
```

#### autocrlf 在不同平台不同设置

1. Windows
	```
	# 提交时转换为LF，检出时转换为CRLF
	git config --global core.autocrlf true
	```
2. Mac Or Linux
	```
	提交时转换为LF，检出时不转换
	git config --global core.autocrlf input
	```

|               | 参数  |                                    |
| ------------- | ----- | ---------------------------------- |
| core.autocrlf | true  | 提交时转换为LF，检出时转换为CRLF   |
|               | input | 提交时转换为LF，检出时不转换       |
|               | false | 提交检出均不转换                   |
| core.safecrlf | true  | 拒绝提交包含混合换行符的文件       |
|               | false | 允许提交包含混合换行符的文件       |
|               | warn  | 提交包含混合换行符的文件时给出警告 |



## .gitattributes 文件

gitattributes 文件以行为单位设置一个路径下所有文件的属性，eg：

```
 {要匹配的文件模式 属性1 属性2 ...}
```

描述：一行中，一个属性。

### 换行符

| 换行符 |                                          |
| ------ | ---------------------------------------- |
| CRLF   | Windows系统                              |
| LF     | Unix系统（包括Linux，MacOS近些年的版本） |



## 规则

1.在一个Git库中可以有多个 gitattributes 文件：
属性设置的优先级(从高到低)：

```
/Project/info/attributes
/Project/my_path/.gitattributes
/Project/.gitattributes
```

2.可以为所有Git库设置统一的 gitattributes 文件：

```
git config --get core.attributesFile
git config --global --get core.attributesFile
```



## 参数

这些属性会影响存储在库中的内容复制到工作树中的文件时，命令，如`git checkout`和`git merge`运行。它们也会影响 Git 如何将存储在库中工作树中的内容存储在`git add`和`git commit`之上。

### text

控制行尾的规范性。如果一个文本文件是规范的，则Git库汇总该文件的行尾总是LF。
 文件的行尾自动转换。如果是文本文件，则在文件入Git库时，行尾自动转换为LF。如果已经在入Git库中的文件的行尾是GRLF，则文件在入Git库时，不再转换为LF。

text 有4种状态：

| 参数        | 描述                                                   |
| ----------- | ------------------------------------------------------ |
| text        | 设置                                                   |
| -text       | 不设置                                                 |
| text=string | 设置值                                                 |
| 未声明      | 通常不出现该属性即可；为了覆盖其他文件中的声明 `!text` |

eg:

```
*           text=auto		# 设置 text=auto，表示对任何文件的行尾自动转换。如果是文本文件，则在文件入Git库时，行尾自动转换为LF；如果已经在入Git库中的文件的行尾为CRLF，则该文件在入Git库时，不再转换为LF。
*.txt       text			# 对于.txt文件，标记为文本文件，并进行行尾规范化。
*.jpg       -text			# 对于`.jpg`文件，标记为非文本文件，不进行任何的行尾转换。
*.vcproj    text eol=crlf	# 对于.vcproj文件，标记为文本文件，在文件入Git库时进行规范化，行尾转换为LF。在检测到出工作目录时，行尾自动转换为GRLF。
*.sh        text eol=lf		# 对于sh文件，标记为文本文件，在文件入Git库时进行规范化，即行尾为LF。在检出到工作目录时，行尾也不会转换为CRLF（即保持LF）。
*.py        eol=lf			# 对于py文件，只针对工作目录中的文件，行尾为LF。CRLF，LF都是用来表示文本换行的方式。CR代表回车，对应字符\r。LF表示换行，对应字符\n。
```

### eol

设置行末字符。该属性设置了要在工作目录中使用的特定行结束样式。

| 参数     | 描述                                             |
| -------- | ------------------------------------------------ |
| eol=lf   | 入库时将行尾规范为LF，检出时禁止将行尾转换为CRLF |
| eol=crlf | 入库时将行尾规范为LF，检出时将行尾转换为CRLF     |

### diff

diff 属性影响 Git 对特殊文件生成差异的方式。它可以告诉 Git 是否为路径生成文本补丁还是将路径视为二进制文件。
      它也可以影响在 hunk 头部显示的@@ -k,l +n,m @@，告诉 Git 使用外部命令来生成差异，或者是在生成差异之前让 Git 将二进制文件转换为文本文件。
      设置diff：如果一个路径设置diff属性，它将被视为文本文件，即使它包含一些通常从不会出现在文本文件的字节值，例如NUL。
      不设置diff：没有设置diff属性的路径会生成differ二进制文件（如果启用了二进制补丁，会生成二进制补丁）。
      不确定：未指明diff属性的路径首先会检查其内容，如果它看起来像文本文件并且小于core.bigFileThreshold，则将其视为文本文件，否则将生成differ二进制文件。
              core.bigFileThreshold：所有平台上的默认值为512MiB。大于此大小的文件将被缩减，而不会尝试增量压缩。
      字符串：diff是使用指定的diff驱动程序显示的。每个驱动程序可以指定一个或多个选项。如下部分所述。驱动程序foo是由Git的配置文件中diff.foo的配置值定义的。
      定义一个外部的diff驱动程序：diff驱动程序的定义是在gitconfig中完成的，并不是在gitattributes文件中，所以严格来说，这里并不适合谈论它。
eg:   将文件标记为二进制
eg:   {*.js eol=lf}
eg:   {*.json eol=lf}
eg:   {*.jsx eol=lf}
eg:   {*.ts eol=lf}

### crlf

向后兼容

```javascript
crlf			text
-crlf			-text
crlf=input		eol=lf
```

### ident

描述：为路径设置ident属性，路径中的blob对象中的$Id$将会被替换为$Id:char_40_hexadecimal_name

当`ident`为路径设置属性时，Git 用blob对象中的`$Id:`替换`$Id$`，后面跟着40个字符的十六进制 blob 对象名称，后面跟着美元符号`$`。任何以worktree文件开头`$Id:`和结尾的字节序列`$`在登记时被`$Id$`替换。

### filter

一个`filter`属性可以设置为一个字符串值，用于命名配置中指定的过滤器驱动程序。

过滤器驱动程序由一个`clean`命令和一个`smudge`命令组成，其中任何一个都可以不指定。结帐时，当`smudge`指定命令时，该命令从其标准输入中输入blob对象，其标准输出用于更新工作树文件。同样，该`clean`命令用于在签入时转换工作文件的内容。默认情况下，这些命令只处理一个blob并终止。例如`git add --all`，如果使用长时间运行的`process`过滤器来替代`clean`和/或`smudge`过滤器，则例如，Git 可以在单个Git 命令的整个生命周期内通过单个过滤器命令调用来处理所有 blob 。如果长时间运行`process`过滤器配置，那么它始终优先于配置的单个 blob 过滤器。有关用于与`process`过滤器通信的协议的说明，请参阅下面的部分。

内容过滤的一个用途是将内容按摩成更适合平台，文件系统和用户使用的形状。对于这种操作模式，这里的关键词是“更方便”，而不是“把某些不可用的东西变成可用的”。换句话说，目的是如果某人取消了过滤器驱动程序的定义，或者没有合适的过滤器程序，该项目仍然可以使用。

内容过滤的另一个用途是存储不能直接在存储库中使用的内容（例如，引用 Git 外部存储的真实内容的 UUID 或加密的内容），并在结帐时将其转换为可用的形式（例如下载外部内容或解密加密的内容）。

这两个过滤器的行为不同，默认情况下，过滤器被视为前者，将内容按摩到更方便的形状。配置中缺少的过滤器驱动程序定义或以非零状态退出的过滤器驱动程序不是错误，而是使过滤器成为无操作中继。

您可以声明过滤器通过将过滤器<driver> .需要配置变量设置为`true`，将本身不可用的内容转换为可用内容。

例如，在.gitattributes 中，您可以为路径分配`filter`属性。

```javascript
*.c        filter=indent
```

然后，您可以在.git / config 中定义一个“filter.indent.clean”和“filter.indent.smudge”配置来指定一对命令，以在源文件签入时修改C程序的内容（“clean “运行）并检出（因为命令是”cat“，所以不做任何更改）。

```javascript
[filter "indent"]
        clean = indent
        smudge = cat
```

为了获得最佳效果，`clean`如果运行两次（“清洁→清洁”应该相当于“清洁”），并且多个`smudge`命令不应该改变`clean`输出（“污迹→污迹→清洁”应当相当以“清洁”）。请参阅下面的合并部分。

“indent”过滤器在这方面表现良好：它不会修改已经正确缩进的输入。在这种情况下，缺少污迹过滤器意味着干净的过滤器`must`接受自己的输出而不修改它。

如果过滤器`must`成功以使存储的内容可用，则可以在配置中声明过滤器是`required`：

```javascript
[filter "crypt"]
        clean = openssl enc ...
        smudge = openssl enc -d ...
        required
```

过滤器命令行上的序列“％f”被替换为过滤器正在处理的文件的名称。过滤器可能会在关键字替换中使用它。例如：

```javascript
[filter "p4"]
        clean = git-p4-filter --clean %f
        smudge = git-p4-filter --smudge %f
```

请注意，“％f”是正在处理的路径的名称。根据正在过滤的版本，磁盘上的相应文件可能不存在，或者可能具有不同的内容。所以，smudge 和 clean 命令不应该尝试访问磁盘上的文件，而只能用作标准输入提供给他们的内容的过滤器。

@参数 利用命令clean,smudge
描述：

@参数 whitespace
描述：对应core.whitespace配置变量
      在执行git diff, git apply时是否考虑空格。
     export-ignore,export-subst，打包相关的属性

@参数 delta
描述：即Delta压缩
      对于delta=false的路径中的blob对象，不会进行Delta压缩
      encoding，为GUI工具（如gitk, git-gui）设置字符编码，以正确显示匹配的文件内容
      如果该属性未设置，或设置了无效值，则GUI工具会使用配置变量gui.encoding的值。

@参数 merge
描述：与merge.default配置变量一起确定如何合并文件。在执行git merge, git revert和git cherry-pick时，如何考虑文件的版本
Git内置的merge驱动：
merge=text
merge=binary
merge=union



#名称

gitattributes - 定义每个路径的属性

#概要

$GIT_DIR/info/attributes, .gitattributes
