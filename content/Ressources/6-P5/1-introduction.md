---
title: Introduction to P5.js
draft: false
tags:
  - essentiels
  - p5.js
description: Creative coding with P5.js
---

[P5.js](https://p5js.org/) is a community-driven, JavaScript library, created for creative coding.

Compared to classic JavaScript, P5.js proposes lots of built-in variables and helper functions to easily prototype visual interactive sketches.

Sketching with p5.js can be done via their [web-editor](https://editor.p5js.org/) or locally via your [Visual Studio Code Environment](https://p5js.org/tutorials/setting-up-your-environment/#vscode)

In VSCode, an [extension](https://github.com/IrtizaNasar/p5-2.vscode/blob/main/README.md) can be used to help you set things up and running

# P5.js Installation for VSCode

1. Install [VSCode](https://code.visualstudio.com/download), and this [extension](https://github.com/IrtizaNasar/p5-2.vscode/blob/main/README.md)
2. On VSCode, select `view` from the top toolbar and `Command Palette` or press `cmd`+`shift`+`p`
3. Type `Create a new p5.js 2.x Project` in the search bar modal
4. Select the folder where to create the project

# Preview your p5.js sketch

- Right click your `index.html` then select `Open with Live Server` or in the bottom right of your VSCode window, click `Go Live`

# Anatomy of a p5.js sketch file

A p5.js sketch is essential a JavaScript file, named `sketch.js` by default. The difference is it needs the p5.js library to be loaded ==before-hand==.

If creating a P5 project from scratch, make sure in your `index.html` that the P5 library is loaded before linking to your `sketch.js`:

```html
<head>
    <!-- if you load p5 from their CDN -->
    <script src="https://cdn.jsdelivr.net/npm/p5@2.3.3/lib/p5.min.js"></script>
    <!-- if you have a local copy of p5 -->
    <script src="./p5.min.js"></script>
</head>
<body>
    <script src="sketch.js"></script>
</body>
```

At the minimum, the sketch consists of two functions: `setup()` and `draw()`.

```js
// This runs once at start
function setup() {
  createCanvas(400, 400);
}

// This runs continuously at every frame!
function draw() {
  background(220);
}

```

In the `setup()` function, the visual sketch is rendered by the `createCanvas()` function, with two values (in this case numbers), the width, and height, passed as parameters of the function.

> [!tip] Any values placed inside parenthesis of a function are called parameters. We use them to customize functions.

In the `draw()` function, another function `background()` allows to draw a light grey background to the created canvas.

We can start by changing the parameters values in both functions, first to resize the canvas, then to change the background color:

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sketch</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/p5@2.3.3/lib/p5.min.js"></script>
  </head>
  <body>
    <script src="sketch.js"></script>
  </body>
</html>
```
```css:style.css
html, body {
  margin: 0;
  padding: 0;
}
canvas {
  display: block;
}
```
```js:sketch.js
// This runs once at start
function setup() {
  createCanvas(200, 200);
}

// This runs continuously at every frame!
function draw() {
  background(200);
}
```

To learn more, visit the p5.js reference pages for [background()](https://p5js.org/reference/p5/background/) & [color](https://p5js.org/reference/#Color).

# Drawing your first shape

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sketch</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/p5@2.3.3/lib/p5.min.js"></script>
  </head>
  <body>
    <script src="sketch.js"></script>
  </body>
</html>
```
```css:style.css
html, body {
  margin: 0;
  padding: 0;
}
canvas {
  display: block;
}
```
```js:sketch.js
// This runs once at start
function setup() {
  createCanvas(600, 300);
}

// This runs continuously at every frame!
function draw() {
  background("orangered");
  circle(300, 150, 100);
}

```

No we have a circle centered within the canvas. This circle is drawn from the center (half of the width: 300, half of the height: 150), and has a size of 100.

[P5.js reference guide on shapes](https://p5js.org/reference/#Shape)

# Make it interactive!

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sketch</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/p5@2.3.3/lib/p5.min.js"></script>
  </head>
  <body>
    <script src="sketch.js"></script>
  </body>
</html>
```
```css:style.css
html, body {
  margin: 0;
  padding: 0;
}
canvas {
  display: block;
}
```
```js:sketch.js
// This runs once at start
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// This runs continuously at every frame!
function draw() {
  background("orangered");
  if(mouseIsPressed === true){
    fill(0);
  } else {
    fill (255);
  }
  circle(mouseX, mouseY, 100);
}
```

By using built-in P5 variables such as `windowWidth` and `windowHeight` when creating the canvas, we ensure the canvas always fits the full size of the window.

Now, the circle follows my mouse (by replacing static position values with dynamic built-in P5 variables `mouseX` and `mouseY`), and whenever I press the mouse, the circle fills with white background. 


# Organizing your code

Organizing your code is key to build more complex sketches. This is where creating your own [[Ressources/3-JS/2-variables|variables]] and [[Ressources/3-JS/3-functions|functions]] come in, to make your code more modular, to avoid code repetition, and to improve human-readability. It is essential to organize code progressively, both for you, future you, and others.

## Custom variables

P5 has plenty of built-in variables, while they are useful, they only get us so far. Variables allows to store information for later re-use. To create one, we need to declare it:

```js
let variableName = value;
const otherVariableName = value;
```

The `let` keyword allows for reassigning different values, while `const` prevents it: its initial value cannot be reassigned.

```js
let variableName = value;
variableName = otherValue // it works!

const otherVariableName = value;
otherVariableName = otherValue // error

You are free to choose how to name your variables, but make sure they help understand why they are for.

`let` variables can be declared without any explicit initial value. Its value therefore remains `undefined` until proper assignment It is common to see:

```js
let variableName;
console.log(variableName) // logs: undefined
//[…]
variableName = value;
```

The `=` sign is the assignment operator, by which a value is assigned to a variable. It is important to distinguish it from equality. Think of the variable as a labelled box within which we store something in it: the value.

The value can be any sort of datatype, e.g. a number, a string of text, etc.

An important concept about a variable is its ==scope==, e.g. where it is declared influences where it can be used.

In P5 it is very frequent to declare ==global== variables at the top of our sketch file, outside of `setup()` and `draw()`. This way, we say those kind of variables have a *global scope*: it is accessible anywhere within our sketch file:

```js
let myVariable = something;

function setup(){
  // myVariable can be used here!
}
function draw(){
  // myVariable can be used here too!
}
```

If you were to declare variables inside a function, such as `setup()` or `draw()`, they would have a *local scope*, only to be used within the block or the function where they are declared. 

```js
// myVariable CANNOT be used here!

function setup(){
  let myVariable = something;
  // myVariable can be used here!
}
function draw(){
  // myVariable CANNOT be used here!
}
```

Here is an [interactive sketch](https://editor.p5js.org/p5Master718/sketches/aa8bBwGHb) about variable scopes.


## Custom functions

`setup()` and `draw()` are the basic built-in functions in any p5.js sketches. We already know these functions have a defined task: `setup()` runs only once at the start, while `draw()` runs in a loop at everyframe.

Functions are first ==declared==:
```js
function setup(){

}
```

For the function to be used, we usually say the function is ==called==. You don't have to worry about calling setup() and draw() as this is already handled by P5. But for any other functions, this would look like this:

```js
function setup(){

}
function draw(){
  // calling the custom function
  myOwnFunction(); 
}

//declaring the custom function
function myOwnFunction(){
  // do something
}
```

> [!tip] Placing functions
> It is best to place custom functions after your `setup()` and `draw()` functions.