# alimama-cli
阿里妈妈脚手架CLI工具

## 使用方法：

全局安装cli工具：

    npm install -g alimama-cli

在使用工具前请先做好几个准备工作

  + 到gitlab上创建项目相应的仓库 ([Gitlab](http://gitlab.alibaba-inc.com))
  + 到rap上创建相应的项目(非必要) ([RAP](http://rap.alibaba-inc.com))
  + 到黄金令箭上创建项目(非必要) ([黄金令箭](http://log.alibaba-inc.com/gold/part/index.htm))

然后在你的工作目录执行

    mama init

  + 输入你在gitlab创建好的项目的仓库地址(会在当前目录下创建以你仓库名称为名的文件夹)
  + 输入你在RAP上创建好的项目的projectId(非必填)
  + 输入你在黄金令箭上创建好的场景ID[非必填]

系统会自动从[scaffold](http://gitlab.alibaba-inc.com/thx/scaffold)脚手架仓库`clone`代码到你的本地，并且设置`git remote`为你在gitlab上创建的项目，并且`npm install`所有的工具包，你可以指定 `mama init --cnpm|tnpm` 来更改为`cnpm|tnpm install`避免被墙

  ![mama init](https://img.alicdn.com/tps/TB13s6gOXXXXXX9XXXXXXXXXXXX-475-306.png)



## 支持的命令列表：

运行mat本地服务器，默认端口8989，默认启动接口rap化（支持反向代理）

    mama dev

  + `mama dev --port=7777` 可以指定端口，如果指定80端口需sudo权限
  + `mama dev --daily=10.22.34.55` 可以切换接口访问真实daily接口，指定daily的ip地址
  + `mama dev --n=tnpm` 如果项目中node_modules还未安装，会先执行npm包安装，默认npm install，可以指定--n=tnpm用tnpm install

daily分支发布到日常 [powerd by [alimama-deploy](https://www.npmjs.com/package/alimama-deploy)]，其中包含了spmlog打点

    mama daily

master发布到cdn生产环境 [powerd by [alimama-deploy](https://www.npmjs.com/package/alimama-deploy)]，其中包含了spmlog打点

    mama publish

在当前目录下生成预设的view文件，包含view.html, view.js，支持输入目录结构(exp: src/app/views/test)

    mama view
可以指定特定的模板
  + `mama view --table`
  + `mama view --form`

黄金令箭埋点 [powerd by [gulp-magix-spmlog](https://www.npmjs.com/package/gulp-magix-spmlog)]

    mama spmlog
