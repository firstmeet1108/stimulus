const { execSync } = require('child_process')
// const fs = require('fs')
// const gitDiffParser = require('gitdiff-parser')

let diffstr = execSync('git diff ac94753c508262a43c3bd58d88c76aa65525b613 339472c12642c3e3c4f92cf02039fe62632eb085', {
  maxBuffer: 1024 ** 6,
})
console.log(diffstr.toString())