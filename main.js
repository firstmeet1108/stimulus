const { execSync } = require('child_process')
;(async () => {
  try {
    execSync('git diff main remotes/docs/main -- docs/ > test.patch').toString()
    // execSync('git apply test.patch').toString()
    // execSync('git add ./docs').toString()
    // execSync('git commit -m "Update docs"').toString()
    // execSync('git push').toString()
  } catch (e) {
    console.log('Error: ', e)
  }
})()
