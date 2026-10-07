---
title: Repetition (Loops)
draft: false
tags:
  - essentiels
  - p5.js
description: Repeating shapes with loops
---

# Repeating a shape

Using [[Ressources/3-JS/6-loops|for loops]], we can repeat block of code, from a starting point, a condition to keep the loop running and when it ends, and how the loop iterates. 

In this example, we want to draw on the horizontal axis multiple circles of a specific amount `let amount = 8`, so in the loop, we initialize a variable `let i = 0`, conditionning the loop to run while `i < amount` (the quantity of circles we want to draw), and increase `i` everytime the loop runs. 

For our circles not to overlap, we can add a spacing variable `let spacing = 60;` which will also increment everytime the loop runs.

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

let spacing = 60;
let amount = 8;

async function setup() {
  createCanvas(windowWidth, windowHeight);
}

async function draw() {
    repeatShape(100, height/2);
}

// Draw shape
function drawShape(x, y) {
    fill("orangered");
    noStroke();
    circle(x, y, 50)
}

// Repeat shape
function repeatShape (x, y) {
  for(let i=0; i < amount; i+=1) {
    drawShape(x, y);
    x += spacing;
  }
}
```

We can expand this example by drawing a grid of circles, instead of only drawing them on a single axis. For this, we can nest a for loop into another one:

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

let spacing = 60;
let amountX = 8;
let amountY = 4;

async function setup() {
  createCanvas(windowWidth, windowHeight);
}

async function draw() {
    repeatShape(100, 110);
}

// Draw shape
function drawShape(x, y) {
    fill("orangered");
    noStroke();
    circle(x, y, 50)
}

// Repeat shape
function repeatShape (x, y) {
  let startX = x; // we need this to fill the row
  for (let i=0; i < amountY; i+=1) {
    for (let j=0; j < amountX; j+=1) {
        // this draws circles horizontally
        drawShape(x, y);
        x += spacing;
    }
    // once row complete, reset x
    x = startX;
    // increment vertical spacing for next row
    y += spacing;
  }
}
```

# Placing points with a loop from a 2D Array

Another useful way of using for loops within P5 is to place a range of positions coming from a 2D Array.

Imagine we have the following list of points with each their coordinates:

|         | x-pos | y-pos |
|---------|-------|-------|
| point A | 15    | 250   |
| point B | 125   | 55    |
| point C | 75    | 325   |
| point D | 300   | 100   |

When placing those in a 2D array we would have the following:

```js
const points = [
  [15, 250],
  [125, 55],
  [75, 325],
  [300, 100]
]

```

In order to place all those points in one go we can use a for loop.
Since a 2D array nest each points positions in their own array, to access x and y values we would need to write as such:
`points[i][0]` for the x value (first value in the nested array), and `points[i][1]` for the y value (second value in the nested array)

```js
const points = [
  [15, 250],
  [125, 55],
  [75, 325],
  [300, 100]
]

for(let i = 0; i < points.length; i++){
     ellipse(points[i][0], points[i][1], 50);
}

```