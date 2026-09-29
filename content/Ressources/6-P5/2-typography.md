---
title: Typography
draft: false
tags:
  - essentiels
  - p5.js
description: Using typography with P5.js
---

# Loading a font file

In P5, we load a font via the `loadFont()` [function](https://p5js.org/reference/p5/loadFont/).
P5.js currently supports `.otf` and `.ttf` font files. 

Using `woff2` font files seems to work, but a warning in the console is logged. For this, Dave Pagurek wrote a [addon](https://github.com/davepagurek/p5.woff2) to bring support to `woff2` files.

It is important to load the font in the setup part of the sketch, as sometimes it could take a while:

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

// first declare a global font variable
let font; 

async function setup() {
  createCanvas(windowWidth, windowHeight);
  // then load it
  font = await loadFont("/static/fonts/ABCAreal-Medium.ttf"); 
  
  // then use it
  displayMessage();
}

// This runs continuously at every frame!
async function draw() {
}

// Display a message
function displayMessage () {
  textSize(32);
  textAlign(CENTER);
  // then apply it
  textFont(font);
  fill('orangered');
  text('Hello World', width/2, height/2);
}
```

If you are not familiar with `async` and `await` keywords, please check out [[Ressources/3-JS/12-async-await]]



# Using Variable Fonts

We can use variable fonts in P5. A nice trick for this is creating a variable assigned to one of the font variable axis, typically the weight or slant.

Below, we created a `w` variable, and mapping the min-max values of variable axis (100–900) to the `mouseX` position (0->width).

This variable then was passed as parameter in our `displayMessage()` and `displayWeightValue()` functions.

Check Coding Train's [video](https://youtu.be/d0GgzjCFWq0?si=wfNqA9zdnhiMQ2lt&t=151) about the subject.

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
let font; 

async function setup() {
  createCanvas(windowWidth, windowHeight);
  font = await loadFont("/static/fonts/Inter-VariableFont_opsz,wght.ttf"); 
  textFont(font);
}

async function draw() {
  background(0);

  // creating a variable for the weight
  // make it interactive with the mouse
  let w = map(mouseX, 0, width, 100, 900)
  displayWeightValue(w);
  displayMessage(w);
}

// Display Weight Value
function displayWeightValue(w) {
  textSize(16);
  textAlign(LEFT, TOP);
  fill('white');
  textWeight(100);
  text("Move your mouse.\nWeight:" + w, 16, 16);
}

// Display a message
function displayMessage (w) {
  textSize(64);
  textWeight(w);
  textAlign(CENTER, CENTER);
  fill('orangered');
  text('Hello World', width/2, height/2);
}

```

# 3D Typography

Typography in 3D behaves a little differently: it must be converted into a 3D geometry, using the `.textToModel()` method to our loaded `font`.

An optional parameter object can be passed to allow for further customizations. For example, `sampleFactor` allows to set the quality of the geometry, or `extrude` allows to bring volume to our text block.

[P5.js reference: textToModel()](https://p5js.org/reference/p5.Font/textToModel/)

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
let font; 
let textGeometry;
async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  font = await loadFont("/static/fonts/ABCAreal-Medium.ttf"); 
  textFont(font);
  textSize(128);
  textAlign(CENTER, CENTER);
  fill('orangered');
  let options = {
    extrude: 5,
    sampleFactor: 0.95
  }
  textGeometry = font.textToModel('Hello World', 0, 0, 0, options);
}

// This runs continuously at every frame!
async function draw() {
  background(100);
  orbitControl();
  model(textGeometry);
}
```