const { execSync } = require('child_process')
const test = () => {
  try {
    let patchStr = execSync(
      'git diff main remotes/docs/main -- ../docs/ ',
    ).toString()
    if (!patchStr) {
      console.log('无更新')
      return
    }
    execSync('git diff main remotes/docs/main -- ../docs/ > test.patch')
    execSync('git apply test.patch')
    execSync('git add ../docs')
    execSync('git commit -m "Update docs"')
    execSync('git push')
  } catch (e) {
    console.log('Error: ', e)
  }
}
test()
