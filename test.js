const { execSync } = require('child_process')
// const fs = require('fs')
const gitDiffParser = require('gitdiff-parser').parse

let diffstr = execSync(
  'git diff 3cd846c75048e7c34f77c1ed27046f2be489a7f7 80f1b950472c65ff14adf762c0133d5a29fd11d6 -- .github/workflows/',
  {
    maxBuffer: 1024 ** 6,
  },
).toString()
let res = gitDiffParser(diffstr)
console.log(res[0].hunks[0])
