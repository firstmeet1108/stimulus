const { execSync } = require('child_process')
const fs = require('fs')
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile)
const gitDiffParser = require('gitdiff-parser')

const HEAD = require('./head')
let newCommit = ''
let diffstr = ''

try {
  // 切换分支至subscription/main
  execSync('git checkout remotes/subscription/main')
  console.log('切换分支至subscription/main')

  // 获取当前分支最新commit号
  newCommit = execSync('git rev-parse HEAD').toString().replace(/\n/g, '')
  console.log('获取当前分支最新commit号:' + newCommit)

  // 判断当前分支是否有变更
  if (HEAD === newCommit) {
    console.log('commit号未变更 无需进行diff对比')

    execSync('git checkout main')
    console.log('返回主分支')

    return
  }

  // 对指定文件进行diff对比
  diffstr = execSync(`git diff ${HEAD} ${newCommit} -- docs/`).toString()
  console.log('获取diff对比文本')
  let res = gitDiffParser(diffstr)
  console.log(res)

  // 切换分支至main
  execSync('git checkout main')
  console.log('返回主分支')

  // 更新HEAD commit号
  writeFile('./head.js', `module.exports = ${JSON.stringify(newCommit)}`)
    .then(() => {
      console.log('写入成功')
    })
    .catch((err) => {
      console.log(err)
    })
} catch (err) {
  console.log(err)
}
