const { execSync } = require('child_process');
const path = require('path');

// const fileUrl = process.cwd();
// const fileUrl = path.resolve(process.cwd(), '../docs');
const config = {
  cwd: '../',
};
const patchStr = execSync(
  'git diff newDoc remotes/targetdoc/main -- docs',
  config,
).toString();
const relativeUrl = patchStr.split('+++ b/docs/')[1].split('\n')[0];
console.log(relativeUrl);
// const absoluteInputUrl = path.resolve(fileUrl, relativeUrl);
// const outputUrl = absoluteInputUrl
//   .replace('docs', 'docs_chs')
//   .split('/')
//   .slice(0, -1)
//   .join('/');

/**
 * @param {string} relativeUrl 待翻译文件的相对路径
 */
