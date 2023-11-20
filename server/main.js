const { execSync } = require('child_process');

const config = {
  cwd: '../',
};
const test = () => {
  try {
    const patchStr = execSync(
      'git diff main remotes/docs/main -- docs ',
      config,
    ).toString();
    if (!patchStr) {
      console.log('无更新');
      return;
    }
    execSync('git diff newDoc remotes/targetdoc/main -- docs > ./server/test.patch', config);
    execSync('git apply ./server/test.patch', config);
    execSync('git add ./docs', config);
    execSync('git commit -m "Update docs"', config);
    execSync('git push', config);
  } catch (e) {
    console.log('Error: ', e);
  }
};
test();
