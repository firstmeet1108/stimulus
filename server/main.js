const { execSync } = require('child_process');
const translater = require('./openai-test');

const config = {
  cwd: '../',
};
const diffCommit = () => {
  try {
    const patchStr = execSync(
      'git diff newDoc remotes/targetdoc/main -- docs',
      config,
    ).toString();
    const originFile = patchStr.split('+++ b/docs/')[1].split('\n')[0];
    if (!patchStr) {
      console.log('无更新');
      return;
    }
    execSync(
      'git diff newDoc remotes/targetdoc/main -- docs > ./server/diff.patch',
      config,
    );
    execSync('git apply ./server/diff.patch', config);
    translater(`../docs/${originFile}`);

    execSync('git add ./docs', config);
    execSync('git commit -m "Update docs"', config);
    execSync('git push', config);
  } catch (e) {
    console.log('Error: ', e);
  }
};

module.exports = {
  diffCommit,
};
