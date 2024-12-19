---
title: MathJax fails to render in hexo icarus
toc: true
thumbnail: https://t.mwm.moe/fj?random=MathJax fails to render in hexo icarus
cover: https://t.mwm.moe/fj?random=MathJax fails to render in hexo icarus
date: 2024-09-27 09:08:11
tags:
    - Bugs
categories:
    - Bugs
---

In the Hexo Icarus theme, when navigating between pages, MathJax doesn't render immediately; it only renders after refreshing the page. 



<!--more-->

This issue occurs because MathJax scripts are not being re-initialized on page transitions, which are typically handled by pjax in themes with smooth page transitions.

To fix this, you can force MathJax to re-render on every end of the pjax event by using the following approach:

```javascript
// listen pjax:end event in pjax.js
document.addEventListener('pjax:end', function () {
    // MathJax is global, can be used directly
    MathJax.typesetPromise();
});

```

