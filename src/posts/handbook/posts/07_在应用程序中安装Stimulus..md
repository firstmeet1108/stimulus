---
permalink: /handbook/installing.html
order: 07
---

要在你的应用中安装刺激物，把`@hotwired/ Stimulus npm`包添加到你的 JavaScript 包中。或者，在**[stimulus.js](https://unpkg.com/@hotwired/stimulus/dist/stimulus.js)** 脚本中导入 `<script type="module">`标签。

## 使用 Stimulus for Rails

如果你把 Stimulus for Rails 和 import map 一起使用，集成会自动从 app/javascript/controllers 加载所有的控制器文件。

### 控制器文件名映射到标识符

将控制器文件命名为[identifier]\_controller.js，其中 identifier 对应于 HTML 中每个控制器的 data-controller 标识符。

Rails 的 Stimulus 通常使用下划线分隔文件名中的多个单词。控制器文件名中的每个下划线转换为其标识符中的破折号。

还可以使用子文件夹命名控制器。命名空间控制器文件路径中的每个正斜杠在其标识符中变成两个破折号。

如果你愿意，你可以在控制器文件名的任何地方使用破折号而不是下划线。刺激对它们一视同仁。

| 如果你的控制器文件被命名为…   | 它的标识符将是… |
| ----------------------------- | --------------- |
| clipboard_controller.js       | 剪贴板.         |
| date_picker_controller.js     | 日期选择.       |
| users/list_item_controller.js | 用户列表项.     |
| local-time-controller.js      | 本地时间.       |

如果你正在使用 Webpack 作为你的 JavaScript 打包器，你可以使用@hotwired/ Stimulus - Webpack -helpers 包来获得与 Stimulus for Rails 相同的自动加载行为。首先添加包，然后像这样使用它:

```javascript
import { Application } from '@hotwired/stimulus';
import { definitionsFromContext } from '@hotwired/stimulus-webpack-helpers';
window.Stimulus = Application.start();
const context = require.context('./controllers', true, /\.js$/);
Stimulus.load(definitionsFromContext(context));
```

### 在其他构建系统下使用

Stimulus 也适用于其他构建系统，但不支持控制器自动加载。相反，你必须显式地加载和注册控制器文件到你的应用程序实例:

```javascript
/ src/application.js
import { Application } from "@hotwired/stimulus"
import HelloController from "./controllers/hello_controller"
import ClipboardController from "./controllers/clipboard_controller"
  window.Stimulus = Application.start()
  Stimulus.register("hello", HelloController)
  Stimulus.register("clipboard", ClipboardController)
```

如果你正在使用像 esbuild 这样的构建器来使用 stimulus-rails，你可以使用 stimulus:manifest:update Rake 任务和。/bin/rails generate stimulus [controller] generator 来自动更新位于 app/javascript/controllers/index.js 的控制器索引文件。

### 在无构建系统下使用

如果你不喜欢使用构建系统，你可以在
