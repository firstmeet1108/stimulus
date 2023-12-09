const { execSync } = require('child_process');
const path = require('path');

const fileUrl = path.resolve(process.cwd(), '../docs');
// const fileUrl = process.cwd();
const config = {
  cwd: '../',
};
const patchStr = execSync(
  'git diff newDoc remotes/targetdoc/main -- docs',
  config,
).toString();
const relativeUrl = patchStr.split('+++ b/docs/')[1].split('\n')[0];
const absoluteInputUrl = path.resolve(fileUrl, relativeUrl);
console.log(absoluteInputUrl);
const outputUrl = absoluteInputUrl
  .replace('docs', 'docs_chs')
  .split('/')
  .slice(0, -1)
  .join('/');
console.log(outputUrl);

/**
 * @param {string} inputUrl 
 */
function getOutputUrl(inputUrl) {}
