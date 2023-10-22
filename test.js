const { execSync } = require('child_process')
// const fs = require('fs')
// const gitDiffParser = require('gitdiff-parser')

let diffstr = execSync('git diff ea3438b4ec784cda5b08099762396fcf38a5d97e e6bbdb35d35ebb6676d45c5d0b9e186ae586600e', {
  maxBuffer: 1024 ** 6,
})
console.log(diffstr.toString())