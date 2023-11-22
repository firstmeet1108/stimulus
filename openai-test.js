const OpenAI = require("openai");
const openai = new OpenAI();
const fs = require("fs");
const matter = require("gray-matter");


// OpenAI API 密钥 Linux 设置方法 export OPENAI_API_KEY=''

module.exports = (inputFile) => {
  // API 请求参数
  const markdownContent = fs.readFileSync(inputFile, "utf8");
  const markdownFile = inputFile;
  const { data, content } = matter(markdownContent);

  const messages = [
    {
      role: "system",
      content:
        "Please remember to stimulus without translation first, then translate the following Markdown text into Chinese and return it to me in Markdown code format", // 翻译的条件
    },
    { role: "user", content: content },
  ];
  openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: messages,
    })
    .then((response) => {
      const translatedContent = response.choices[0].message.content;
      const newMarkdownContent = `---
permalink: ${data.permalink || ""}
order: ${data.order || ""}
---

${translatedContent}`;
      fs.writeFileSync("translated_" + markdownFile, newMarkdownContent, "utf8");
    })
    .catch((error) => console.error("Error:", error));
}