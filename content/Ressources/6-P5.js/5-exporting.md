---
title: Exporting from a P5 sketch
draft: false
tags:
  - essentiels
  - p5.js
description: Exporting image(s) from a P5.js sketch
---

It is very useful to export stills from a P5.js sketch, both for documentation, or as an ouput of your project.

A very simple trick is to create a keyboard shortcut allowing to download an image. `keyPressed()` is a [built-in function](https://p5js.org/reference/p5/keyPressed/) from P5.js helping to do just that. Combined with a conditional, we can set the event to match any desired key, and then use `save()`, another [built-in function](https://p5js.org/reference/p5.Image/save/) to achieve our goal.

> [!tip] Automatic file-naming export
> For a precise journaling or your exports, use regular string literals with [Time & date helpers](https://p5js.org/reference/#Time%20&%20Date) to name your exports:
> ```js 
> let timestamp = `
>   ${year()}-${nf(month(),2)}-${nf(day(),2)}_
>   ${nf(hour(),2)}-${nf(minute(),2)}-${nf(second(),2)}
> `;
> // nf() helps converting numbers into strings, with a given number of digits. 
> // https://p5js.org/reference/p5/nf/
> save(`myCanvas_${timestamp}.jpg`);
> // will download a file named something like 
> // "myCanvas_2026-09-17_15-04-37.jpg"
> ```

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
}

function keyPressed(){
    if(key === "s" || key === "S"){
        let timestamp = `${year()}-${nf(month(),2)}-${nf(day(),2)}_${nf(hour(),2)}-${nf(minute(),2)}-${nf(second(),2)}`;
        save(`myCanvas_${timestamp}.jpg`);
    }
}
```