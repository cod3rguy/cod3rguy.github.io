---
title: A Closer Look at JavaScript Arrays
---

Arrays are one of the most popular data structures, not just in JavaScript but in most programming languages. They are often one of the first topics that newbie coders learn in JavaScript. Yet many developers never truly master them or harness their full potential. Let's take a closer look at *Arrays* in JavaScript and discover the beauty in their simplicity.<read-more>

I love arrays. They are simple, fast and efficient and make the life of a coder so much easier. JavaScript provides a global **Array** object for construction of arrays. This **Array** object also consists of several methods that make working with arrays really easy. Before we look at some of these methods, let's check out some basic stuff first.

### How to get an Array

Arrays can be obtained:-

1. By explicitly declaring them. `let myArr = [1,2,3]`
2. By getting them as output from another function or built-in object method like `String.prototype.match()`, `String.prototype.split()`, `RegExp.prototype.exec()`, etc.
3. As a returned value from a function's *rest parameter*. `let fn = (...arr) => { console.log(arr) }`

If you're unfamiliar with ES2015, that last one boils down to:-

```javascript
let fn = function(...arr) {
    console.log(arr);
}

fn(1,2,3,4,5); //[1,2,3,4,5]
```

So, rest parameters help return the list of arguments passed to a function in an array. It is mostly used when the number of arguments to be passed to a function is not known beforehand. Before ES2015, we used to achieve that something like this:-

```javascript
let fn = function() {
    let args = Array.prototype.slice.call(arguments);
    console.log(args);
}

fn(1,2,3,4,5); // [1,2,3,4,5]
```

That worked because every function gets an array-like `arguments` object which contains the values of all arguments passed to that function. To make it easy to work with, the `arguments` object was almost always converted to an array. To do that, we used the `slice()` instance method on the global `Array` object and called it on the `arguments` object using the `call()` method inherited by `slice()` from the global `Function` object. Sounds complicated? Perhaps now you'll appreciate rest parameters and what they bring to the table. The newly introduced `Array.from()` method can also be used to a similar effect for creating arrays out of array-like objects.

### Array Operations

Let's look at a few operations in JavaScript involving arrays.

#### Copying

To decrease memory consumption and increase efficiency, arrays are almost always passed by reference rather than by value. That makes copying an array different than copying a simple variable. Consider this:-

```javascript
let arr1 = [1,2,3,4,5];
let arr2 = arr1;

console.log(arr1); // [1,2,3,4,5]
console.log(arr2); // [1,2,3,4,5]

arr2.push(6);

console.log(arr1); // [1,2,3,4,5,6]
console.log(arr2); // [1,2,3,4,5,6]
```

Hence, assigning one variable storing an array to another, doesn't pass the array itself to that new variable. Rather, a reference to the same array is passed, which means both variables now point to the same memory location where the actual array is stored. Efficient as it may be, we sometimes need to create an actual copy of the array and store it in another variable. That is called creating a *shallow copy* of the array. To do that, we take advantage of the `Array.prototype.slice()` method like so:-

```javascript
let arr1 = [1,2,3,4,5];
let arr2 = arr1.slice();

console.log(arr1); // [1,2,3,4,5]
console.log(arr2); // [1,2,3,4,5]

arr2.push(6);

console.log(arr1); // [1,2,3,4,5]
console.log(arr2); // [1,2,3,4,5,6]
```

#### Comparing

We can't compare two arrays directly, not even for checking equality. So, this...

```javascript
let arr1 = [1,2,3,4,5];
let arr2 = [1,2,3,4,5];

console.log(arr1 == arr2); //false
```

...doesn't work and will always return `false` unless both variables point to the same array. Because, what we're comparing here are the instances of two Array objects, not the values stored in them. If we need to check if the values stored at equal indices in both arrays are equal, then we have to write our own compare function. One of the ways we can do that is:-

```javascript
Array.prototype.isEqual = function(arr) {
  return this.every((e,i) => arr[i] === e);
};

let arr1 = [1,2,3,4,5];
let arr2 = [1,2,3,4,5];
let arr3 = [2,3,4,5,6];

console.log(arr1.isEqual(arr2)); //true
console.log(arr1.isEqual(arr3)); //false
```

Similarly, we can also write functions to check if each element of an array is lesser than or greater than that of another array. All this involves looping through each element in an array, also known as traversing an array. Remember those useful methods on the global Array object I was talking about? Well, `every()` is one of them which loops over each element of a given array and returns `true` if every element in that array passes a given condition.

#### Traversing

There are several ways to loop over an array. The most common one is the basic `for` loop we're all familiar with. But, depending on what you're trying to achieve, JavaScript has some pretty neat ways to traverse an array. Let's look at some of them. I'm particularly fond of the `Array.prototype.forEach()` method.

```javascript
let arr = [1,2,3,4,5];
arr.forEach(e => { console.log(e) }); // 1 2 3 4 5
```

There is also the `for...of` loop introduced in ES2015.

```javascript
let arr = [1,2,3,4,5];
for (let e of arr) { console.log(e) } // 1 2 3 4 5
```

The `for...in` loop shouldn't be used with arrays as it loops over the enumerated properties of an object. Although arrays are objects too and it will work without error, but it might screw up the order of the elements as it doesn't care about the index ordering.

Array methods like `map()`, `filter()`, `some()`, `reduce()` and the newly introduced `find()` also loop over the array performing different operations with it's elements.

### Array methods

There are several methods like the ones above that are useful while interacting with arrays. These methods are either static or instance methods of the global `Array` object. Some of these methods mutate the original array while others return a new array result. For example,

```javascript
let arr1 = [1,2,3,4,5];
let arr2 = [3,4,5,6,7];

console.log(arr1.reverse()); // [5,4,3,2,1]
console.log(arr2.map(e => e - 1)); // [2,3,4,5,6]

console.log(arr1); // [5,4,3,2,1]
console.log(arr2); // [3,4,5,6,7]
```

Here, `reverse()` method mutates the original array while `map()` method does not. Array instance methods can be chained as long as they return valid array. But we must be careful while chaining mutating methods and understand the implications of their chaining order. The callback function (`e => e - 1`) used as parameter to the `map()` function is again an arrow function which basically means `function(e){return e - 1}`.

```javascript
let arr1 = [1,2,3,4,5];
let arr2 = arr1.slice();

let fn1 = (arr) => arr.map(e => e + 1).reverse();
let fn2 = (arr) => arr.reverse().map(e => e + 1);

console.log(fn1(arr1)); // [6, 5, 4, 3, 2]
console.log(fn2(arr2)); // [6, 5, 4, 3, 2]

console.log(arr1); // [1,2,3,4,5]
console.log(arr2); // [5,4,3,2,1]
```

Notice how both `fn1()` and `fn2()` return the same result but ultimately `fn2()` mutates the input array while `fn1()` does not. This is because in case of `fn1()`, the `reverse()` method is called on the new array resulting from the `map()` method chained before it.

There are tons of other methods to work with arrays in JavaScript, which are [well documented by the MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Learning these methods and using them creatively can make our algorithms a lot shorter and much more readable.