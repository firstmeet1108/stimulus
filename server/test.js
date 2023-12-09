const { execSync } = require('child_process');
const path = require('path');
const translate = require('./plugin/openai-test');

function patchParse(patchStr) {
  const fileDataArr = [];
  const relativeUrl = patchStr.split('+++ b/docs/')[1].split('\n')[0];
  const fileDataItem = {
    fileName: relativeUrl.split('/')[1].split('.md')[0],
    fileCategory: relativeUrl.split('/')[0],
  };
  fileDataArr.push(fileDataItem);
  return fileDataArr;
}

const config = {
  cwd: '../',
};
const patchStr = execSync(
  'git diff newDoc remotes/targetdoc/main -- docs',
  config,
).toString();

if (!patchStr) {
  console.log('无更新');
} else {
  execSync(
    'git diff newDoc remotes/targetdoc/main -- docs > ./server/diff.patch',
    config,
  );
  execSync('git apply ./server/diff.patch', config);
  const fileDataArr = patchParse(patchStr);

  translate(fileDataArr);
}
