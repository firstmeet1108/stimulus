---
permalink: /handbook/origin.html
order: 
---

# 刺激的起源

在[Basecamp](https://basecamp.com)我们编写大量的JavaScript代码，但我们不使用它来创建当今意义上的“JavaScript应用程序”。我们所有的应用程序都以服务器端渲染的HTML为核心，然后添加少量的JavaScript来使它们闪耀起来。

这是[宏伟的巨石](https://m.signalvnoise.com/the-majestic-monolith-29166d022228)的方式。Basecamp在半打平台上运行，包括原生移动应用程序，使用的是由Ruby on Rails创建的一组控制器、视图和模型。具有单一共享接口，可以在一个地方更新是关键，可以让一个小团队表现出色，尽管有许多平台。

它使我们能够像从前那样高效地工作。回到了单个程序员可以在不被层层间接或分布式系统困扰的情况下快速取得进展的时代。在每个人都认为圣杯是将他们的服务器端应用程序限制为为基于JavaScript的客户端应用程序生成JSON之前。

这并不是说这种方法对某些人在某些时候没有价值。只是对于许多应用程序和Basecamp这样的应用程序来说，它是对整体简单性和生产率的倒退。

并不是说单页面JavaScript应用程序的普及没有带来真正的好处。其中最主要的好处之一就是更快、更流畅的界面，摆脱了整个页面的刷新。

我们也希望Basecamp也有这种感觉。仿佛我们已经跟随群体重新用客户端渲染重写了所有内容，或者在移动端完全采用原生应用程序。

这种愿望引导我们提出了一个双重解决方案：[Turbo](https://turbo.hotwired.dev)和Stimulus。

### Turbo高能，Stimulus低调

在我介绍Stimulus之前，让我回顾一下Turbo的命题。

Turbo源自GitHub开发的[pjax](https://github.com/defunkt/jquery-pjax)方法。基本概念保持不变。全页面刷新通常感觉慢不是因为浏览器需要处理从服务器发送的大量HTML。浏览器在这方面表现得非常出色和快速。在大多数情况下，HTML负载相对于JSON负载的更大并不重要（尤其是在使用gzip的情况下）。问题在于CSS和JavaScript需要被重新初始化并重新应用到页面上。尽管文件本身已被缓存。如果有大量的CSS和JavaScript，这可能会相当慢。

为了避免这种重新初始化，Turbo始终保持一个持久的进程，就像单页面应用程序一样。但它主要是一个隐形的进程。它拦截链接并通过Ajax加载新页面。服务器仍然返回完整的HTML文档。

仅凭这个策略，大多数应用程序中的大多数操作都会感觉非常快（如果它们能在100-200ms内返回服务器响应，这在缓存的情况下是非常可能的）。对于Basecamp，它加快了页面之间的转换速度约3倍。它赋予应用程序一种响应和流畅性的感觉，这一直是单页面应用程序吸引人的巨大吸引力。

但Turbo本身只是故事的一半。它是粗粒度的一半。在完整页面更改之下，还有单页面中所有的细粒度的忠实度。显示和隐藏元素的行为、将内容复制到剪贴板、向列表中添加新的待办事项，以及我们与现代Web应用程序关联的所有其他交互。

在引入Stimulus之前，Basecamp使用了一系列不同的样式和模式来应用这些特效。一些代码只是少量的jQuery，一些代码是同样大小的JavaScript原生代码，而另一些则是更大规模的面向对象子系统。它们通常基于一个`data-behavior`属性上的显式事件处理来工作。

虽然很容易像这样添加新的代码，但这并不是一个全面的解决方案，我们拥有太多内部样式和模式共存。这使得代码重用变得困难，也使得新开发人员学习一种一致的方法变得困难。

### Stimulus的三个核心概念

Stimulus将这些模式中最好的部分汇集成了一个简单的小型框架，它围绕着三个主要概念：控制器、动作和目标。

当你看到它所处理的HTML时，它被设计为一种渐进增强。这样你可以看着一个单一模板就知道哪种行为正在作用于它。以下是一个例子：

```html
<div data-controller="clipboard">
  PIN：<input data-clipboard-target="source" type="text" value="1234" readonly>
  <button data-action="clipboard#copy">复制到剪贴板</button>
</div>
```

你可以阅读它并对正在发生的事情有一个相当好的了解。即使不了解Stimulus或不看控制器代码本身。这几乎就像是伪代码。这与阅读一个片段的HTML，其中有一个外部JavaScript文件应用事件处理程序是非常不同的。它也保持了许多当今JavaScript框架中已经失去的责任分离。

正如你所看到的，Stimulus并不在乎创建HTML。相反，它依附于现有的HTML文档。在大多数情况下，HTML是在服务器端渲染时（首次访问或通过Turbo）或通过改变DOM的Ajax请求时呈现的。

Stimulus专注于操作这个现有的HTML文档。有时意味着添加隐藏元素的CSS类，或者将其动画显示或突出显示。有时意味着将元素重新排列成组。有时意味着操纵元素的内容，比如当我们将可缓存的UTC时间转换为可显示的本地时间时。

有时你可能希望Stimulus创建新的DOM元素，你绝对可以自由地去做。我们甚至可能会添加一些功能来使它未来更容易。但这只是少数情况。重点是在操作而不是创建元素上。

### Stimulus与主流JavaScript框架的区别

这使得Stimulus与大多数当代JavaScript框架非常不同。几乎所有的框架都致力于通过某种模板语言将JSON转换为DOM元素。许多使用这些框架来生成一个空白页面，然后通过这种JSON-to-template渲染方法仅填充通过这种方式创建的元素。

Stimulus还在状态问题上有所不同。大多数框架都有一种方式在JavaScript对象中保持状态，然后根据该状态渲染HTML。Stimulus正好相反。状态存储在HTML中，因此控制器可以在页面更改时被丢弃，但当缓存的HTML再次出现时，它们可以重新初始化。

这确实是一种非常不同的范式。我敢肯定，许多习惯于使用现代框架的资深JavaScript开发人员会对此嗤之以鼻。嗨，尽管继续嗤之以鼻吧。如果你对于在像React + Redux这样的复杂性和工作所需的努力感到满意，那么Turbo + Stimulus对你来说可能不会有吸引力。

另一方面，如果你对你正在从事的工作不满意，觉得不值得采用当今技术所暗示的强大复杂性和应用程序分离，那么你可能会在我们的方法中找到庇护。

### Stimulus和相关思想是从实践中提炼出来的

在Basecamp，我们多个不同版本的Basecamp和其他应用程序中多年来一直使用这种架构。GitHub也使用了类似的方法取得了很好的效果。这不仅仅是对“现代”Web应用程序的主流理解的一种有效替代，它是一种非常引人注目的替代。

事实上，它感觉就像我们在开发[Ruby on Rails](https://rubyonrails.org/)时Basecamp所具有的那种秘密武器。当代主流方法是毫无必要的复杂，而我们可以做得更多、更快，所需的资源更少。

此外，你甚至不必选择。Stimulus和Turbo与其他更繁重的方法配合效果很好。如果你的应用程序中的80%不需要重型工具，可以考虑使用我们的两全其美。然后对于那些真正可以从中受益的应用程序部分，再使用繁重的工具。

在Basecamp，当需要时我们确实使用了几种较重的方法。我们的日历倾向于使用客户端渲染。我们的文本编辑器是[Trix](https://trix-editor.org/)，它是一个完全成型的文本处理器，作为一组Stimulus控制器是没有意义的。

这一套替代框架是关于尽可能避免繁重的工作。保持在请求-响应范式中，处理并发生的许多、许多互动。然后在需要高度忠实度时再使用昂贵的工具。

最重要的是，这是一个小团队的工具包，希望在使用更费力的主流方法的大型团队的忠实度和覆盖范围上有所竞争。

试试吧。

---

David Heinemeier Hansson