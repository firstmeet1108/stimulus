---
permalink: /handbook/hello-stimulus.html
order: 02
---

了解 Stimulus 如何工作的最好方法是建立一个简单的控制器。本章将告诉你如何做。

## 先决条件

要继续学习，您需要一个正在运行的 Stimulus -starter 项目的副本，这是一个预先配置的用于探索 Stimulus 的空白板。

我们建议在 Glitch 上重新混合 stimulus-starter，这样你就可以完全在浏览器中工作，而无需安装任何东西:

![](https://calmkin-blog-markdown-note.oss-cn-hangzhou.aliyuncs.com/Typora/imgs202310101451416.gif#alt=IMG_256)

或者，如果您更喜欢使用自己的文本编辑器，则需要克隆并设置 Stimulus 启动器:

```bash
$ git clone https://github.com/hotwired/stimulus-starter.git

$ cd stimulus-starter

$ yarn install

 $ yarn start
```

然后在浏览器中访问 http://localhost:9000/。

(注意，stimulus-starter 项目使用 Yarn 包管理器进行依赖项管理，因此请确保首先安装了 Yarn 包管理器。)

一切从 HTML 开始

让我们从使用文本字段和按钮的简单练习开始。当您单击按钮时，我们将在控制台中显示文本字段的值。

每一个 Stimulus 项目都是从 HTML 开始的。打开 public/index.html，在开始`<body>`标签之后添加以下标记标签:

```html
<div>
  <input type="text" />
  <button>Greet</button>
</div>
```

在浏览器中重新加载页面，您应该会看到文本字段和按钮。

## 控制器将 HTML 带入生活

在其核心，Stimulus 的目的是自动将 DOM 元素连接到 JavaScript 对象。这些对象被称为控制器。

让我们通过扩展框架的内置 controller 类来创建第一个控制器。在 src/controllers/文件夹中创建一个名为 hello_controller.js 的新文件。然后放入以下代码:

```javascript
//src/controllers/hello_controller.js
import { Controller } from '@hotwired/stimulus';
export default class extends Controller {}
```

## 标识符链接控制器与 DOM

接下来，我们需要告诉 Stimulus 这个控制器应该如何连接到 HTML。我们通过在

```html
<div data-controller="hello">
  <input type="text" />
  <button>Greet</button>
</div>
```

标识符充当元素和控制器之间的链接。在这个例子中，标识符 hello 告诉 Stimulus 在 hello_controller.js 中创建一个控制器类的实例。您可以在安装指南中了解有关自动控制器加载工作原理的更多信息。

## 控制器在工作吗?

在浏览器中重新加载页面，您将看到没有任何更改。我们如何知道控制器是否在工作?

一种方法是在`connect()`方法中放入一个日志语句，每次控制器连接到文档时，Stimulus 都会调用该方法。

在 hello_controller.js 中实现`connect()`方法如下:

```javascript
// src/controllers/hello_controller.js
import { Controller } from '@hotwired/stimulus';
export default class extends Controller {
  connect() {
    console.log('Hello, Stimulus!', this.element);
  }
}
```

重新加载页面并打开开发人员控制台。你应该看到`“Hello, Stimulus!”`紧随着我们`<div>`的表示形式。

## Actions 响应 DOM 事件

现在让我们看看如何更改代码，以便在单击“Greet”按钮时显示日志消息。

首先将`connect()`重命名为`greet()`:

```javascript
// src/controllers/hello_controller.js
import { Controller } from '@hotwired/stimulus';
export default class extends Controller {
  greet() {
    console.log('Hello, Stimulus!', this.element);
  }
}
```

我们希望在触发按钮的 click 事件时调用`greet()`方法。在 Stimulus 中，处理事件的控制器方法称为动作方法。

要将我们的 action 方法连接到按钮的 click 事件，打开 public/index.html 并为按钮添加一个 data-action 属性:

```html
<div data-controller="hello">
  <input type="text" />
  <button data-action="click->hello#greet">Greet</button>
</div>
```

## 动作描述符解释

数据操作值 click->hello#greet 称为操作描述符。这个特殊的描述是:

- click 为事件名称

- hello 是控制器的标识符

- greet 是要调用的方法的名称

在浏览器中加载页面并打开开发人员控制台。当您单击“Greet”按钮时，您应该会看到日志消息出现。

## Targets 映射重要元素到控制器属性

我们将通过更改我们的操作来完成练习，以向我们在文本字段中键入的任何

名称打招呼。

为了做到这一点，首先我们需要一个对控制器内输入元素的引用。然后我们可以读取 value 属性来获取它的内容。

Stimulus 让我们将重要元素标记为目标，这样我们就可以通过相应的属性轻松地在控制器中引用它们。打开 public/index.html，给 input 元素添加一个 data-hello-target 属性:

```html
<div data-controller="hello">
  <input data-hello-target="name" type="text" />
  <button data-action="click->hello#greet">Greet</button>
</div>
```

接下来，我们将通过向控制器的目标定义列表中添加 name 来为目标创建一个属性。Stimulus 会自动创建 this.nameTarget 属性，返回第一个匹配的目标元素。我们可以使用这个属性读取元素的值并构建我们的问候语字符串。

我们来试一下。打开 hello_controller.js 并更新如下:

```javascript
// src/controllers/hello_controller.js
import { Controller } from '@hotwired/stimulus';
export default class extends Controller {
  static targets = ['name'];
  greet() {
    const element = this.nameTarget;
    const name = element.value;
    console.log(`Hello, ${name}!`);
  }
}
```

然后在浏览器中重新加载页面并打开开发人员控制台。在输入栏中输入您的姓名，然后点击“Greet”按钮。Hello, world!!

控制器简化重构

我们已经看到，刺激物控制器是 JavaScript 类的实例，其方法可以充当事件处理程序。

这意味着我们有一系列的标准重构技术供我们使用。例如，我们可以通过提取一个 name getter 来清理 greet()方法:

```javascript
// src/controllers/hello_controller.js
import { Controller } from '@hotwired/stimulus';
export default class extends Controller {
  static targets = ['name'];
  greet() {
    console.log(`Hello, ${this.name}!`);
  }
  get name() {
    return this.nameTarget.value;
  }
}
```

## 总结和下一步

恭喜你——你刚刚写了你的第一个刺激控制器!

我们已经介绍了框架中最重要的概念:控制器、actions 和 targets。在下一章中，我们将看到如何将这些放在一起构建一个现实生活中的控制器。
