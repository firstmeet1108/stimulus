---
title: "Stimulus的起源"
summary: ""
permalink: /handbook/origin.html
eleventyNavigation:
  key: Stimulus的起源
  parent: Handbook
  order: 
---
  
# Stimulus的起源

在[Basecamp](https://basecamp.com)我们写了很多JavaScript代码，但我们并不像当代那样使用它来创建“JavaScript应用程序”。我们所有的应用程序都以服务器端渲染的HTML为核心，然后添加一些JavaScript来使它们闪耀起来。

这就是“宏伟的整体”（majestic monolith）的方式。Basecamp在包括原生移动应用程序在内的半打平台上运行，使用Ruby on Rails创建了一组控制器、视图和模型。拥有一个单一的共享接口可以在一个地方更新是关键，可以使小团队能够在多个平台上执行任务。

它使我们能够像昔日那样高效地工作。回到一个单个程序员可以在不受间接性或分布式系统束缚的情况下取得迅猛进展的时代。在人们都认为将服务器端应用程序限制为为基于JavaScript的客户端应用程序生成JSON之前。

这并不意味着这种方式对某些人或某些时候没有价值。只是作为许多应用程序的一般方法，特别是Basecamp，这是整体简单性和生产力的倒退。

这也不意味着单页面JavaScript应用程序的泛滥没有带来真正的好处。其中最重要的好处之一是更快、更流畅的界面，摆脱了整个页面刷新的束缚。

我们也希望Basecamp也能感觉像这样。仿佛我们已经跟随潮流，使用客户端渲染重新编写了所有内容，或者在移动端完全采用原生方式。

这种愿望使我们找到了一个两手准备的解决方案：[Turbo](https://turbo.hotwired.dev)和Stimulus。

### Turbo高飞，Stimulus低行

在我介绍新的、谦逊的JavaScript框架Stimulus之前，请允许我回顾一下Turbo的提出。

Turbo源自在GitHub开发的一种称为[pjax](https://github.com/defunkt/jquery-pjax)的方法。基本概念仍然是一样的。整个页面刷新的速度通常感觉很慢的原因并不是因为浏览器必须处理从服务器发送的一堆HTML。浏览器在这方面非常出色且速度很快。而且在大多数情况下，HTML的大小通常比JSON的大小更大并不重要（尤其是在启用了gzip压缩的情况下）。不，原因在于CSS和JavaScript必须重新初始化和应用到页面上。无论文件本身是否被缓存。如果你有大量的CSS和JavaScript，这可能会非常慢。

为了避免重新初始化，Turbo保持一个持久化的进程，就像单页面应用程序一样。但它大部分是一个看不见的进程。它拦截链接并通过Ajax加载新页面。服务器仍然返回完整的HTML文档。

仅凭这种策略，大多数应用程序中的大多数操作都会感觉非常快（如果它们能够在100-200毫秒内返回服务器响应，这在使用缓存时是完全可能的）。对于Basecamp来说，它将页面与页面之间的转换速度提高了约3倍。它使应用程序具有了单页面应用程序的响应和流畅性，这是其吸引人之处的一个重要因素。

但单靠Turbo并不能解决全部问题。这只能解决程度较粗的部分。在完整页面更改之下，还有一个单页面内的所有细粒度的精确度。比如显示和隐藏元素，复制内容到剪贴板，向列表添加新任务等与现代Web应用程序相关的所有交互。

在使用Stimulus之前，Basecamp使用了一系列不同的风格和模式来应用这些功能。有些代码只是少量的jQuery，有些代码是类似大小的纯JavaScript，还有一些是较大的面向对象子系统。它们通常都是基于一个`data-behavior`属性的显式事件处理。

虽然添加新代码很容易，但这不是一个全面的解决方案，我们拥有太多的内部风格和模式共存。这使得代码的复用变得困难，并且新开发人员很难学习到一种一致的方法。

### Stimulus的三个核心概念

Stimulus将这些模式中最好的部分整合到了一个谦逊且小型的框架中，围绕着三个主要概念：控制器、动作和目标。

它在处理HTML时被设计为一种渐进增强的方式。这样你可以查看一个单独的模板，就知道哪个行为作用于它。以下是一个例子：

```html
<div data-controller="clipboard">
  PIN: <input data-clipboard-target="source" type="text" value="1234" readonly>
  <button data-action="clipboard#copy">复制到剪贴板</button>
</div>
```
  