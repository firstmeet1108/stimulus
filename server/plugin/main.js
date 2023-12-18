const { execSync } = require('child_process');
const path = require('path');
const translater = require('./openai-test');

const cwd = path.join(process.cwd(), '../');
const config = {
  cwd,
};

/**
 * requires：git apply已完成
 * @todo 从git diff生成的patch文件中解析出待翻译文件的相对路径
 *
 * @param {string} patchStr git diff 生成的patch文件
 * @returns {Array<object>} 待翻译文件信息组成的数组
 */
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

const diffCommit = () => {
  try {
    const patchStr = execSync(
      'git diff newDoc remotes/targetdoc/main -- docs',
      config,
    ).toString();
    if (!patchStr) {
      console.log('无更新');
      return;
    }
    execSync(
      'git diff newDoc remotes/targetdoc/main -- docs > ./server/diff.patch',
      config,
    );
    execSync('git apply ./server/diff.patch', config);
    const fileDataArr = patchParse(patchStr);
    translater(fileDataArr);
    console.log('翻译完成');
    execSync('git add ./docs ./docs_CN', config);
    execSync('git commit -m "Update docs"', config);
    execSync('git push', config);
    console.log('提交完成');
  } catch (e) {
    console.log('Error: ', e);
  }
};

module.exports = {
  diffCommit,
};
