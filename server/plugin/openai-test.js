const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');
const { OPENAI_API_KEY } = require('../../config');

const openai = new OpenAI({
  // eslint-disable-next-line no-undef
  apiKey: OPENAI_API_KEY,
});

const inputUrl = path.join(process.cwd(), '../docs');
const outputUrl = path.join(process.cwd(), '../docs_CN');

// OpenAI API 密钥 Linux 设置方法 export OPENAI_API_KEY=''

/**
 *
 * @param {Array<object>} fileDataArr 相对地址组成的数组
 */
module.exports = (fileDataArr) => {
  // 变量部分
  const fileDateItem = fileDataArr[0];
  const inputFile = path.resolve(
    inputUrl,
    fileDateItem.fileCategory,
    `${fileDateItem.fileName}.md`,
  );
  const outputFile = path.resolve(
    outputUrl,
    fileDateItem.fileCategory,
    `${fileDateItem.fileName}_CN.md`,
  );

  // 翻译部分
  const markdownContent = fs.readFileSync(inputFile, 'utf8');
  // const markdownFile = inputFile.split('.md')[0];
  const { data, content } = matter(markdownContent);

  const messages = [
    {
      role: 'system',
      content:
        'Please remember to stimulus without translation first, then translate the following Markdown text into Chinese and return it to me in Markdown code format', // 翻译的条件
    },
    { role: 'user', content },
  ];
  openai.chat.completions
    .create({
      model: 'gpt-3.5-turbo-1106',
      messages,
    })
    .then((response) => {
      const translatedContent = response.choices[0].message.content;
      const newMarkdownContent = `---
permalink: ${data.permalink || ''}
order: ${data.order || ''}
---

${translatedContent}`;
      fs.writeFileSync(outputFile, newMarkdownContent, 'utf8');
    })
    .catch((error) => console.error('Error:', error));
};
