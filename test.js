const { execSync } = require('child_process')
// const fs = require('fs')
const gitDiffParser = require('gitdiff-parser').parse

let diffstr = execSync('git diff ac94753c508262a43c3bd58d88c76aa65525b613 933b52b0209e4c8e4f04acd30cb6edfa712a2da9', {
  maxBuffer: 1024 ** 6,
}).toString()
let res = gitDiffParser(diffstr)
console.log(res[1].hunks)

