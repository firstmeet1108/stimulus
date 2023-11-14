const OpenAI = require("openai");
const openai = new OpenAI();
const fs = require("fs");
const matter = require("gray-matter");

// OpenAI API 密钥 Linux 设置方法 export OPENAI_API_KEY=''

const inputFile = "00_the_origin_of_stimulus.md";
const inputText = fs.readFileSync(inputFile, "utf-8");

// API 请求参数
const model = "gpt-3.5-turbo"; // 模型
const messages = [
  {
    role: "system",
    content:
      "Translate the following Markdown text into Chinese and return it to me in Markdown code format. Do not translate the contents of Stimulus and contents inside '---' and '---'.", // 翻译的条件
  },
  { role: "user", content: inputText },
];
openai.chat.completions
  .create({
    model: model,
    messages: messages,
  })
  .then((response) => {
    const translatedText = response.choices[0].message.content;
    console.log(translatedText);

    const outputFile = "output.md";
    fs.writeFileSync(outputFile, translatedText, "utf-8");
    const markdownContent = fs.readFileSync(outputFile, "utf8");

    const { data, content } = matter(markdownContent);

    const match = content.match(/^#\s+(.+)$/m);
    const title = match ? match[1] : "";

    const newMarkdownContent = `---
title: "${title || ""}"
summary: ""
permalink: ${data.permalink || ""}
eleventyNavigation:
  key: ${title || ""}
  parent: Handbook
  order: ${data.order || ""}
---
  ${content}
  `;

    fs.writeFileSync("second-md-file.md", newMarkdownContent, "utf8");
  })
  .catch((error) => console.error("Error:", error));
