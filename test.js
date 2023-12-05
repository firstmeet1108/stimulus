const fs = require('fs');
const matter = require('gray-matter');

const markdownContent = fs.readFileSync('first-md-file.md', 'utf8');

const { data, content } = matter(markdownContent);

const match = content.match(/^#\s+(.+)$/m);
const title = match ? match[1] : '';

const newMarkdownContent = `---
title: "${title || ''}"
summary: ""
permalink: ${data.permalink || ''}
eleventyNavigation:
  key: ${title || ''}
  parent: Handbook
  order: ${data.order || ''}
---
${content}
`;

fs.writeFileSync('second-md-file.md', newMarkdownContent, 'utf8');
