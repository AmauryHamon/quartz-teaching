---
title: Conditionals
draft: false
tags:
  - essentiels
  - p5.js
description: If, then, else
---

[[Ressources/3-JS/5-conditionals|Conditionals]] delimits when specific blocks of code can run. For this, we regularly use an if statement:

==if== this ==condition== is true, run this ==block of code==,
==else==, run that ==block of code== instead:

```js
if (condition) {
  // code to run if the condition is true
} else {
  // code to run if the condition is false
}
```

This is fundamental as this can help you safely run code, build interactivity, and more.

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
    if(mouseX < width/2){
        background("orangered");
        fill(255);
    } else {
        background("white");
        fill ("orangered");
    }
    line(width/2, 0, width/2, height)
    circle(mouseX, mouseY, 100);
}
```

Conditional statements can be nested, as sometimes you need to test for multiples conditions at the same time.

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
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
    if(mouseX < width/2){
        background("orangered");
        fill(255);
        if(mouseX < width/4){
            circle(mouseX, mouseY, 200);
        } else {
            circle(mouseX, mouseY, 100);
        }
    } else {
        background("white");
        fill ("orangered");
        if(mouseX > width/4*3){
            circle(mouseX, mouseY, 200);
        } else {
            circle(mouseX, mouseY, 100);
        }
    }
    line(width/2, 0, width/2, height)
}
```