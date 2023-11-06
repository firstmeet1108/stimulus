const { execSync } = require('child_process')
const test = () => {
  try {
    let a = execSync('git diff main remotes/docs/main -- ../docs/').toString()
    console.log(a)
  } catch (e) {
    console.log('Error: ', e)
  }
}
test()
