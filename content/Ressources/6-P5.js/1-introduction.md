---
title: Introduction to P5.js
draft: false
tags:
  - essentiels
  - p5.js
description: Creative coding with P5.js
---

[P5.js](https://p5js.org/) is a community-driven, JavaScript library, created for creative coding.

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

A p5.js sketch is essential a JavaScript file, named `sketch.js` by default.
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

```js
// This runs once at start
function setup() {
  createCanvas(900, 600);
}

// This runs continuously at every frame!
function draw() {
  background("orangered");
}

```

To learn more, visit the p5.js reference pages for [background()](https://p5js.org/reference/p5/background/) & [color](https://p5js.org/reference/#Color).

# Drawing your first shape

```js
// This runs once at start
function setup() {
  createCanvas(900, 600);
}

// This runs continuously at every frame!
function draw() {
  background("orangered");
  circle(450, 300, 100);
}

```

No we have a circle centered within the canvas. This circle is drawn from the center (half of the width: 450, half of the height: 300), and has a size of 100.

# Make it interactive!

```js
// This runs once at start
function setup() {
  createCanvas(900, 600);
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

Now, the circle follows my mouse (by replacing static position values with dynamic `mouseX` and `mouseY`), and whenever I press the mouse, the circle fills with white background. 

