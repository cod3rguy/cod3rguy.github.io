---
title: Build System for React Rookies
---

I had been meaning to use build systems for my Javascript projects for a while but never really got around to it until I dived into React. Writing JSX in ES2015 made me realize that developing in React without a build system would be crazy. However, setting up a build system was tougher that I imagined. I had to learn so many different tools and commands that they almost overwhelmed me. Eventually, I set up my build system using Gulp which I will be sharing in this post.<read-more>

To start off, let me quickly explain what a build system is and why we need one. Modern web development comprises of several layers of abstraction for markup, styling and scripting. These layers of abstraction need to boiled down to regular HTML, CSS and Javascript that browsers can understand. The power, simplicity and efficiency of using pre-processors