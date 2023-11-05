const { execSync, exec } = require('child_process')
// const fs = require('fs')
// const { promisify } = require('util')
// const writeFile = promisify(fs.writeFile)

const HEAD = require('./head')

;(async () => {
  try {
    execSync('git diff main remotes/docs/main -- docs/ > test.patch').toString()
    execSync('git apply test.patch').toString()
    execSync('git add ./docs').toString()
    execSync('git commit -m "Update docs"').toString()
    execSync('git push').toString()
  } catch (e) {
    console.log('Error: ', e)
  }
})()
