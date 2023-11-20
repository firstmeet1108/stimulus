---
permalink: /handbook/origin.html
nav_prefix: Preface
order: 00
---

# The Origin of Stimulus

We write a lot of JavaScript at [Basecamp](https://basecamp.com), but we don’t use it to create “JavaScript applications” in the contemporary sense. All our applications have server-side rendered HTML at their core, then add sprinkles of JavaScript to make them sparkle.

This is the way of the [majestic monolith](https://m.signalvnoise.com/the-majestic-monolith-29166d022228). Basecamp runs across half a dozen platforms, including native mobile apps, with a single set of controllers, views, and models created using Ruby on Rails. Having a single, shared interface that can be updated in a single place is key to being able to perform with a small team, despite the many platforms.

It allows us to party with productivity like days of yore. A throwback to when a single programmer could make rapacious progress without getting stuck in layers of indirection or distributed systems. A time before everyone thought the holy grail was to confine their server-side application to producing JSON for a JavaScript-based client application.

That’s not to say that there isn’t value in such an approach for some people, some of the time. Just that as a general approach to many applications, and certainly the likes of Basecamp, it’s a regression in overall simplicity and productivity.

And it’s also not to say that the proliferation of single-page JavaScript applications hasn’t brought real benefits. Chief amongst which has been faster, more fluid interfaces set free from the full-page refresh.

We wanted Basecamp to feel like that too. As though we had followed the herd and rewritten everything with client-side rendering or gone full-native on mobile.

This desire led us to a two-punch solution: [Turbo](https://turbo.hotwired.dev) and Stimulus.

### Turbo up high, Stimulus down low

Before I get to Stimulus, our new modest JavaScript framework, allow me to recap the proposition of Turbo.

Turbo descends from an approach called [pjax](https://github.com/defunkt/jquery-pjax), developed at GitHub. The basic concept remains the same. The reason full-page refreshes often feel slow is not so much because the browser has to process a bunch of HTML sent from a server. Browsers are really good and really fast at that. And in most cases, the fact that an HTML payload tends to be larger than a JSON payload doesn’t matter either (especially with gzipping). No, the reason is that CSS and JavaScript has to be reinitialized and reapplied to the page again. Regardless of whether the files themselves are cached. This can be pretty slow if you have a fair amount of CSS and JavaScript.

To get around this reinitialization, Turbo maintains a persistent process, just like single-page applications do. But largely an invisible one. It intercepts links and loads new pages via Ajax. The server still returns fully-formed HTML documents.

This strategy alone can make most actions in most applications feel really fast (if they’re able to return server responses in 100-200ms, which is eminently possible with caching). For Basecamp, it sped up the page-to-page transition by ~3x. It gives the application that feel of responsiveness and fluidity that was a massive part of the appeal for single-page applications.

But Turbo alone is only half the story. The coarsely grained one. Below the grade of a full page change lies all the fine-grained fidelity within a single page. The behavior that shows and hides elements, copies content to a clipboard, adds a new todo to a list, and all the other interactions we associate with a modern web application.

Prior to Stimulus, Basecamp used a smattering of different styles and patterns to apply these sprinkles. Some code was just a pinch of jQuery, some code was a similarly sized pinch of vanilla JavaScript, and some again was larger object-oriented subsystems. They all usually worked off explicit event handling hanging off a `data-behavior` attribute.

While it was easy to add new code like this, it wasn’t a comprehensive solution, and we had too many in-house styles and patterns coexisting. That made it hard to reuse code, and it made it hard for new developers to learn a consistent approach.

### The three core concepts in Stimulus

Stimulus rolls up the best of those patterns into a modest, small framework revolving around just three main concepts: Controllers, actions, and targets.

It’s designed to read as a progressive enhancement when you look at the HTML it’s addressing. Such that you can look at a single template and know which behavior is acting upon it. Here’s an example:

```html
<div data-controller="clipboard">
  PIN: <input data-clipboard-target="source" type="text" value="1234" readonly>
  <button data-action="clipboard#copy">Copy to Clipboard</button>
</div>
```

