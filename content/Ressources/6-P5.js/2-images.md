---
title: Images
draft: false
tags:
  - essentiels
  - p5.js
description: Using images with P5.js
---

# Loading images

## Loading a single image

The process is very similar to how we load font files:
- We declare a variable `img` 
- Assign it an image with `img = await loadImage(filePath)`. filePath should point to where your image file is located
- Since loading an image is asynchronous, don't forget to declare your `setup()` and `draw()` with `async` prefix
- Draw it on the canvas with `image(img, x, y, width, height)`

> [!tip] imageMode()
> By default, image coordinates (x, y) start from top-left, but we can place it from the center using `imageMode(CENTER);`

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
let img; 

async function setup() {
  createCanvas(windowWidth, windowHeight);
  img = await loadImage("/files/grid.png"); 
  
}

async function draw() {
    background(0);
    imageMode(CENTER);
    image(img, mouseX, mouseY, 100, 100);
}
```

## Loading a single image from an API (JSON)

Instead of local image files, we can also connect to any sort of API to fetch data from a remote location.

Always remember to `console.log()` what you get from the API, in order to properly display what you need. In the following example, we get a list of 30 data objects containing images, and I chose to keep a random one, and then use its URL.

For better understanding, you might need to explore the following notes:[[Ressources/3-JS/10-json|JSON]], [[Ressources/3-JS/12-async-await|Async/Await]], [[Ressources/3-JS/4-arrays-objects|Arrays & Objects]]

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
let img; 

async function setup() {
  createCanvas(windowWidth, windowHeight);
  let json = await loadJSON("https://picsum.photos/v2/list");
  const randomIndex = floor(random(0, json.length))
  const randomImg = json[randomIndex]
  img = await loadImage(randomImg.download_url);
  
}

async function draw() {
    background(0);
    imageMode(CENTER);
    image(img, width/2, height/2);
}
```

## Loading multiple images

In the previous example, why load just one image when we can actually fetch 30 of them?

For this, we can still load the same JSON, at the difference that we can create arrays to store our images, and another to store random positions.

After getting JSON data, we can create a loop to iteratively load all the images, and later on fill our images array once all promises are resolved (this is an asynchronous process). Similarly, we can create another loop to fill the positions array with random (x,y) positions.

In the draw function, we can now display all the images by combining both images and positions arrays.

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
let imgs = []; 
let positions = [];

async function setup() {
    createCanvas(windowWidth, windowHeight);
    let json = await loadJSON("https://picsum.photos/v2/list");
    let promises = [];
    for(let i=0; i<json.length; i++){
        promises[i] = loadImage(json[i].download_url)
    }  
    imgs = await Promise.all(promises);

    for (let i = 0; i < imgs.length; i++){
        positions[i] = { x: random(width), y: random(height)};
    }
}

async function draw() {
    background(0);
    for (let i = 0; i < imgs.length; i++){
        let { x, y } = positions[i];
        image(imgs[i], x, y);
    }
}
```

More ressources on loading data are available on [this Coding Train video](https://thecodingtrain.com/tracks/p5js-2.0/p5js-2.0/loading-data)

# Altering images

