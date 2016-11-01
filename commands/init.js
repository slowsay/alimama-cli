/**
 * 项目初始化命令
 * @params
 */
let exec = require('child_process').exec
let fs = require('fs')
let colors = require('colors')
let readline = require('readline')
let util = require('../util/util')
let params = util.parseParams(process.argv)

module.exports = function() {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  //读取index.html，写入rap的projectId
  let setRapProjectId = function(projectId, name) {
    let fileName = name + '/index.html'
    let data = fs.readFileSync(fileName, 'utf8')
    let result = data.replace(/\/\/rap\.alibaba\-inc\.com\/rap\.plugin\.js\?projectId\=\d+/, '//rap.alibaba-inc.com/rap.plugin.js?projectId=' + projectId)

    fs.writeFileSync(fileName, result, 'utf8')
  }

  //读取gulpfile.js更改spmlog的logkey
  let setSpmLogkey = function(logkey, name) {
    let fileName = name + '/gulpfile.js'
    let data = fs.readFileSync(fileName, 'utf8')
    let result = data.replace(/logkey\s*\:\s*\'.+\'/, "logkey: '" + logkey + "'")

    fs.writeFileSync(fileName, result, 'utf8')
  }

  /*
    根据项目名称创建项目目录，并clone脚手架代码到本地，然后更改git remote为项目git地址
   */
  rl.question('【请输入项目名称】：'.yellow, function(name) {
    rl.question('【请输入gitlab上创建好的仓库git地址】：'.yellow, function(gitUrl) {
      rl.question('【请输入RAP上建好的项目的projectId,非必填】：'.yellow, function(projectId) {
        rl.question('【请输入埋点用的黄金令箭logkey,非必填】：'.yellow, function(logkey) {

          if (!gitUrl) {
            console.error('项目地址不能为空'.red)
            rl.close()
            return
          }

          if (!name) {
            console.error('项目名称不能为空'.red)
            rl.close()
            return
          }

          let commands = [
            'mkdir ' + name,
            'cd ' + name,
            'git init',
            'git remote add origin git@gitlab.alibaba-inc.com:thx/scaffold.git',
            'git pull origin master',
            'git remote set-url origin ' + gitUrl
          ]

          //执行clone scaffold脚手架仓库命令
          util.execCommand(commands).then(function() {
            if (projectId) {
              setRapProjectId(projectId, name)
            }
            if (logkey) {
              setSpmLogkey(logkey, name)
            }

            //设置完projectId，logkey之后，提交代码并开始安装npm包
            let lastCommands = [
              'cd ' + name, //要进入目录才行
              'git add . -A',
              'git commit -m "first commit by alimama-cli"',
              'git push origin master',
              'echo 【开始安装项目相关的npm包，请稍等...】'
            ]

            //默认用npm install安装包，可以配置mama init --n=cnpm 来选择cnpm install
            let npmInstallCommand = 'npm install'
            if (params.n) {
              npmInstallCommand = params.n + ' install'
            }
            lastCommands.push(npmInstallCommand)

            util.execCommand(lastCommands).then(function() {
              console.log('【项目初始化完成】'.green)
            })
          })

          rl.close()
        })
      })
    })
  })

}