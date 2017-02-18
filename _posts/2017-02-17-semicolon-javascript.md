---
title: Semicolon-less Javascript
---

I have been programming in Javascript for a while now. However, I just recently learned that Javascript code can be written without semicolons too. Too many times I have beat myself up over some bugged code for hours at end only to realize that it was all because of a missing semicolon. Now, to learn that Javascript code can work without semicolons feels amazing yet frustrating at the same time.<read-more>

Apparently this feature has been around for a while; I wonder how it has escaped me for so long. It's called [Automatic Semicolon Insertion (ASI)][1]. The Javascript community seems divided on this matter. While some are eagerly using this feature and switching to a *semicolon-less* coding style, others are holding on to the *traditional way*. I think there is no *right way* and it all depends on the preference of the coder. That being said, ASI is a powerful feature of Javascript which every good developer should at least learn about (if not use it).

I'm not going to explain the rules of ASI here. A detailed explanation can be found on the official [ECMAScript documentation][1] or here's a descriptive [blog post][2] for busy people by [Bradley Braithwaite][3]. What I'll do, however, is list some tips which may help anyone willing to explore the semicolon-less style of coding in Javascript.

- ASI doesn't work inside `for` loop's definition (even if it's broken over multiple lines). You have to manually insert semicolons there.

```javascript
// Example

// Incorrect
for(let i = 0
    i < 100
    i++)

// Correct
for(let i = 0;
    i < 100;
    i++){}

```  

- If your `for` loop doesn't have a body, make sure to append an empty pair of curly braces to it's definition. This prevents ASI from confusing the statement on the next line as part of the `for` loop.

```javascript
//Example

// Incorrect syntax before ASI
let sum = 0
for(let i = 1; i <= 10; sum += i++)
console.log(sum)

// Incorrect syntax after ASI
let sum = 0;
for(let i = 1; i <= 10; sum += i++)
console.log(sum);

// Unintended Output
0
1
3
6
10
15
21
28
36
45

// Correct syntax before ASI
let sum = 0
for(let i = 1; i <= 10; sum += i++){}
console.log(sum)

// Correct syntax after ASI
let sum = 0;
for(let i = 1; i <= 10; sum += i++){}
console.log(sum);

// Intended Output
55

```

- If your statement begins with a bracket or parentheses, prepend it with a semicolon.

```javascript
// Example

// Incorrect syntax before ASI
let a = 5
let b = a
[b] = [10]
console.log(b)

// Incorrect syntax after ASI
let a = 5;
let b = a
[b] = [10]; // this basically becomes "let b = a[b] = [10];"
console.log(b);

// Unintended Output
Error: 'b' is not defined

// Correct syntax before ASI
let a = 5
let b = a
;[b] = [10]
console.log(b)

// Correct syntax after ASI
let a = 5;
let b = a; // the previous statement ends properly
[b] = [10];
console.log(b);

// Intended Output
10

```

- Try not to make the task of ASI difficult by breaking statements with new-lines where they shouldn't be broken. This may make it tough to pin-point syntax errors which would instead be accommodated by the ASI by turning them into valid statements (but breaking the code).

```javascript
// Example

// Incorrect syntax before ASI
let fn = (a) => {
    return
    a
}
console.log(fn(5))

// Incorrect syntax after ASI (The code becomes valid unintentionally)
let fn = (a) => {
    return;
    a;
};
console.log(fn(5));

// Unintended Output
undefined

// Correct syntax before ASI
let fn = (a) => {
    return a
}
console.log(fn(5))

// Correct syntax after ASI
let fn = (a) => {
    return a;
};
console.log(fn(5));

// Intended Output
5

```

- Use configurable linting tools having support for semicolon-less style. [ESLint][4] is a great example. It is highly configurable and is available as extensions for all major editors and IDEs. Using a linting tool not only helps transition from one style to another, but also helps avoid the mistakes mentioned above.

Apart from the above tips, I recommend learning how ASI works in order to better take advantage of it. We already know the rules of ASI since we do it's job ourselves (by inserting semicolons where they should be inserted). We have learned to end expressions with semicolons but not loops and function definitions. We have unnecessarily overloaded our brains with rules which can be taken care of by automatically. Instead of taking care of semicolons throughout the code, we can just take care of a couple special cases and leave the rest to ASI. This not only makes the code less prone to bugs from missing semicolons, but also much cleaner and more readable.

There are projects out there using both styles of coding. If you're an open source contributor, chances are you've already encountered both styles in various open source projects. Whether you choose to sway one way or the other, it doesn't hurt to learn and get familiar with both styles; it only makes it easier to adapt to different projects, teams and code bases.

[1]: http://www.ecma-international.org/ecma-262/6.0/index.html#sec-automatic-semicolon-insertion
[2]: http://www.bradoncode.com/blog/2015/08/26/javascript-semi-colon-insertion/
[3]: http://www.bradoncode.com/about/
[4]: http://eslint.org/