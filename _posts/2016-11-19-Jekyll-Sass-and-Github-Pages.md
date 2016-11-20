---
title: Jekyll, Sass and Github Pages
---

Building a website for [Github pages] with the help of [Jekyll] feels nothing short of magic. And if you decide to use Sass for styling, then you get to experience the powerful on-the-fly compilation magic of Github pages when coupled with Jekyll. However, like all good things, there's a catch. <read-more>

There are a couple problems I faced when developing with Jekyll. Now, these might be temporary and I might figure out a way around them in future (which I will share if I do), but for now they are problems.

### Using Sass with Auto-compile

So, Github pages can build your Jekyll site from it's source and along with it, compile any Sass files too. That's really cool. However, one of the reasons developers use a CSS pre-compiler is to squash all dependencies with their own code into a single file to be used in production. To do that, the dependencies must be available to the compiler. Now, to compile Sass files having dependency imports, Github pages needs to have access to the dependencies too. Normally, I manage all dependencies using [Bower] and store them in a `components` directory. Since installing a dependency essentially means cloning it's entire repository into your project for selective use, the `components` directory usually finds it's place on my `.gitignore` list. Anyone who clones the project just needs to run `bower install` to create the `components` folder with all the dependencies listed in the `bower.json` config file. After all, no one wants to bulk up their project repo with countless unused files from the repositories of dependencies. Therein lies the catch. In order for Sass to compile on-the-fly, you need to push the `components` folder with the entire repositories of dependencies to your repository on Github. But, if you're doing that, you're not only unnecessarily bulking up your repository but also defeating the purpose of using a dependency manager. On the other hand, if you pre-compile your Sass files then you're not taking advantage of the on-the-fly Sass compilation. In other words, you have to choose between one of the two and any decent developer will choose the latter. That means, Jekyll's Sass auto-compilation feature is useless if you're using Github pages.

### Cache Bursting

Jekyll is a static file parser, not a backend scripting language. Hence, any attempt to cache burst assets by appending a unique parameter is futile. All Jekyll provided variables including `site.time` are fixed at build time and don't change until you push changes to the repository. So, serving fresh assets with each page load is tougher than usual. There is however a workaround. You could dynamically create the asset elements (`script`, `link`, etc.) with a script upon page load and insert them in the DOM. That way you're free to append any string (random, dateTime, etc.) to the asset links in order to make them unique and hence cache free. If your `script` elements defines a script that needs to run on page load, you could simply set it's `async` property to true. Even so, this requires quite some lines of code for each asset that you need to cache burst.

Inspite of these tiny hurdles, Jekyll is really powerful and does it's job extremely well. To be able to use Jekyll to it's fullest potential, you need to learn it's underlying [Liquid] syntax. It does have little bit of a learning curve but it's worth it.

[Github pages]: https://pages.github.com
[Jekyll]: https://jekyllrb.com/
[Bower]: https://bower.io/
[Liquid]: https://help.shopify.com/themes/liquid