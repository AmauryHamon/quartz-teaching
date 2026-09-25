---
title: Collaborative Canvas
draft: false
tags:
  - advanced
  - p5.js
description: Collaborative P5.js canvas with sockets
---

There is multiple ways of having a collaborative p5.js canvas.
One of them can be done by using web sockets.

To create a collaborative p5.js canvas, we will need a server that handles connection from multiple clients to allow sending and receiving data that help for each clients to draw and see each other drawings.

This tutorial is built upon and expanded from the amazing 4-part video series by Daniel Shiffman on the subject:
[Video 1](https://www.youtube.com/watch?v=bjULmG8fqc8)
[Video 2](https://www.youtube.com/watch?v=2hhEOGXcCvg)
[Video 3](https://www.youtube.com/watch?v=HZWmrt3Jy10)
[Video 4](https://www.youtube.com/watch?v=i6eP1Lw4gZk)

Before getting started, it is best to have a little knowledge about [Node.js](https://nodejs.org/en):

Node.js is a JavaScript runtime, which allows to run JavaScript outside of a web browser. This then allows us to use JavaScript code directly on your computer, or a server. While usually JavaScript is used for "front-end" code (what the user see in their browser), Node.js helps to create code for the "backend" or server-side: storing data, handling logins, real-time apps, etc.

Combined with [Node Package Manager](https://www.npmjs.com/) (npm), we can easily install and run extra librairies in a plug & play fashion.

# Node Project setup

- We first need to [install Node](https://nodejs.org/fr/download) on our computer
- Then we will create a p5.js project on our computer
- Open a terminal window in your VSCode window (`cmd` + `j`)
- Initialize Node in your project by typing in the terminal `npm init`
- Follow the instructions, fill your project title, main, description, keywords, name, we will worry about the rest later.
- This creates a new file `package.json` which acts as the ID card, or the recipe's list of your project. It keeps track of what Node and npm need to know about your project: project infos, the main js file, scripts, installed packages and their versions.
- create a new JavaScript file `server.js` and insert the following:
    ```js
    console.log("My server is running.");
    ```
- Test by typing in the terminal `node server.js`


# Setting a Node server with Express

Now that our project is setup with P5 and Node, we can start installing the necessary packages.
We will use [Express](https://expressjs.com/), which helps creating a simple server that will handle server-side code.

- In the terminal, type `npm install express`
- In `server.js` file, add the following:
    ```js
    console.log("My server is running.");
    // This imports the express package into our server.js file
    const express = require('express');
    // Because express package is a function, we can assign it to a variable:
    const app = express();
    // Assign the port which we listen to our project:
    const port = 3000;
    // Create the server by assigning your app to the port above
    const server = app.listen(port);
    ```
- In the terminal, type `node server.js`
- In your browser, check what's happening in `localhost:3000`
![/files/express-cannot-get.png](/files/express-cannot-get.png)
- We are missing something, because express expects instructions of what files to show and render
- Create a subfolder at the root of your project named `public` 
- Move `index.html`, `style.css`, `sketch.js`, and the `libraries` folder into `public` folder
- In `server.js` update by adding the last line: 
    ```js
    console.log("My server is running.");
    // This imports the express package into our server.js file
    const express = require('express');
    // Because express package is a function, we can assign it to a variable:
    const app = express();
    // Assign the port which we listen to our project:
    const port = 3000;
    // Create the server by assigning your app to the port above
    const server = app.listen(port);
    // This informs where are the files to use
    app.use(express.static('public'));

    ```
- Restart your server and check if it works:
![/files/express-p5-canvas.png](/files/express-p5-canvas.png)

# Using sockets

- In the terminal, install socket.io `npm install socket.io`
- Setup the socket package in your `server.js`:
    ```js
    // Code from the before...

    // 1. Import socket.io package
    const socket = require('socket.io');

    // 2. Assign sockets to the server:
    const io = socket(server);

    // 3. Create a event to check new connection events on the server
    io.sockets.on('connection', newConnection);

    // 4. Create the newConnection function and pass socket as a parameter
    function newConnection(socket){
        console.log(socket);
    }
    ```
- Our server now handles detection for new socket Connection, but right now, nothing on the client side allows to connect to the server
- In `index.html` add the socket.io script in the `<head>`:
    ```html
    <head>
        <!--...-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.8.3/socket.io.min.js"></script>
    </head>
    ```
- In `sketch.js` add at the top of the file:
    ```js
    const socket = io();
    ```
- In `sketch.js` add in the `setup()` function:
    ```js
    io.connect('localhost:3000');
    ```
- Restart the server, look at the console in your terminal. Lots of information now logs. Update `server.js` to only log `socket.id`:
    ```js
    function newConnection(socket){
        console.log('new connection: ' + socket.id);
    }
    ```
- In your browser, open up multiple tabs to `localhost:3000` and see all the connections logged in your server terminal, woohoo!

# Setting the collaborative drawing

We now have plugged clients to connect with the server, but so far we are not sending nor receiving any drawing in the shared p5.js sketch.

In `sketch.js` let's draw something:
```js
const socket = io();

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220);
}

function draw() {
}
// add mouseDragged to draw
function mouseDragged(){
    console.log(mouseX, mouseY);
    noStroke();
    fill(55);
    ellipse(mouseX, mouseY, 20, 20);
}
```

To send our drawing to other clients' canvas, we need to store the mouse coordinates and create a function that send that mouse data to the server

```js
function mouseDragged(){
    console.log(mouseX, mouseY);

    // create a data object
    const data = {
        x: mouseX,
        y: mouseY
    }
    // send that data through a 'mouse' message, and attach the data
    socket.emit('mouse', data);

    noStroke();
    fill(55);
    ellipse(mouseX, mouseY, 20, 20);
}
```

For the server to receive and send back data, we need to adjust `server.js`:

```js
function newConnection(socket){
    console.log(socket.id);
    // when there's a new connection, listen to 'mouse message', 
    // and do something with the 'mouseMessage' function
    socket.on('mouse', mouseMessage);

    function mouseMessage(data){
        // first check by logging data
        console.log(data);
    }
}

```

Restart the server, and check in the terminal that you receive data properly.
All we need now is to send the data back out to the clients:

```js
    // make sure mouseMessage function is inside newConnection function!
    function mouseMessage(data){
        console.log(data);
        // this sends back data
        socket.broadcast.emit('mouse', data);
    }
```

Now that the server sends back data, we can recreate the received drawing in `sketch.js`:
```js
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  
  // this listens to received 'mouse' messages and run 'newDrawing' function
  socket.on('mouse', newDrawing);
}
//rest of the code
function newDrawing(data){
    noStroke();
    // use a different color
    fill(200, 0, 100);
    // use data coordinates received by the message
    ellipse(data.x, data.y, 20, 20);
}
```

# TLDR

- Node.js server hosting a p5 sketch
- Node server is runnning Express, and opens socket connections.
- Whenever a client runs, it connects to the server via socket
- If client draws, it sends a message with data back to the server
- The server emits back data to other clients (not including the original client)
- The clients draws the received data

# Further steps 

Now that our shared canvas is up and running, we could consider a few improvements:

- Handling different client window sizes
- Saving a history of the canvas in the server
- Randomizing the color per user
- Canvas to survive a server restart
- A button to clear the canvas for everyone 

## Handling different client window sizes

Right now, what is drawn on a 900px wide screen won't appear the same on the another 400px wide screen. For this we need to normalize the mouse coordinates that are sent, received and redrawn:

In `sketch.js`:
```js
function mouseDragged(){
  // rest of the code

  // create a data object 
  // to send the normalized mouse coordinates
  const data = {
    x: mouseX / width,
    y: mouseY / height
  }
  // rest of the code
}

function newDrawing(data){
    // rest of the code

    // use normalized data coordinates received by the message
    // and match it to the canvas size
    ellipse(data.x * width, data.y * height, 20, 20);
}
```

## Random client drawing color

Pick a random color in the `setup()` function, and pass it along with normalized mouse coordinates:

```js
// this client's color, picked once per session
let clientColor;

function setup(){
    // rest of the code
    myColor = [random(255), random(255), random(255)];

}
function mouseDragged(){
    // rest of the code

    // add clientColor to the data object
    const data = {
        x: mouseX,
        y: mouseY,
        color: clientColor
    }

    // rest of the code
}

function newDrawing(data){
    // rest of the code

    // use received data color
    fill(data.color);
    
    // rest of the code
}
```

## Adding history

In order to save the history and load it to new clients, we need to store the drawn dots data into an array on our server. For performance purposes, we will cap this array to a maximum of 50000 dots. To store inforation in this arraw, we will need another socket message which we will call 'history'.

To properly load history into the p5 sketch, we will need to move the initialization of socket into setup(), because if the history arrives before the setup() function is called, it might be lost.

1. In `server.js`, add the history array, cap its max. length and add data to it when there are new connections:

```js
// every dot drawn since the server started,
// so new clients can see what was drawn before they joined
const history = [];

// maximum number of dots kept in history (oldest are dropped first)
const MAX_HISTORY = 50000;

// function to handle new connections
function newConnection(socket){
    console.log(socket.id);

    // send the existing drawing to the client that just joined
    socket.emit('history', history);

    // listen for 'mouse' events from the client
    socket.on('mouse', mouseMessage);

    // function to handle 'mouse' events
    function mouseMessage(data){
        console.log(data);

        // store the dot, dropping the oldest one past the cap
        history.push(data);
        if (history.length > MAX_HISTORY) {
            history.shift();
        }

        // broadcast the 'mouse' event to all other clients 
        // except the sender
        socket.broadcast.emit('mouse', data);

        // alternatively, to broadcast to all clients 
        // including the sender, use:
        // io.sockets.emit('mouse', data);
    }

}

```

2. In `sketch.js`, update how socket is declared, redraw from history on setup:

```js
// socket.io instance, connected in setup()
let socket;

function setup() {
    // rest of the code

    // connect only once the canvas exists,
    // so the history can't arrive before we can draw it
    socket = io();

    // redraw everything drawn before this client joined
    socket.on('history', (dots) => dots.forEach(newDrawing));

    // listen for 'mouse' events from the server
    socket.on('mouse', newDrawing);

}

```

## Clear canvas button for all

The logic is similar to other previous messages. To clear the canvas for everyone, we need a button in the sketch, a 'clear' socket message that sends to the server and send back out to all clients:

1. In `server.js` update the `newConnection` function with the following:
```js
function newConnection(socket){
    // ... rest of the code

    // listen for 'clear' events from the client
    socket.on('clear', clearMessage);

    // function to handle 'clear' events
    function clearMessage(){
        // forget the drawing so new clients start blank
        history.length = 0;

        // tell every client, including the sender, to clear
        io.sockets.emit('clear');
    }

    // ... rest of the code
}
```

2. In `sketch.js`, add the button and listen for 'clear' events in the setup, and trigger a clearCanvas function.

```js
function setup(){
    // ... rest of the setup code

    // listen for 'clear' events from the server
    socket.on('clear', clearCanvas);

    // add a button that clears the canvas for everyone
    const clearButton = createButton('Clear');
    clearButton.position(10, 10);
    clearButton.mousePressed(() => socket.emit('clear'));
}

function clearCanvas(){
  background(220);
}
```

## Surviving a server restart

Ok we have a history up and running, but it only stay alive as long as the server runs. If server shuts down, everything is still cleared. To maintain the history, we now need to write it in a separate file.

In `server.js`, we need to:
1. import librairies to access the file system and paths
2. point to the history file
3. create a history variable to easily access data
4. keep the cap limit we had before
5. create a flag when history changed since last save
6. update the history file at a given interval (every 2 seconds for example)
7. before a server stop, save one last time to prevent from losing unsaved changes
8. create a loadHistory function that reads from the file
9. update existing socket messages to handle history change when clearing or drawing

```js
// import fs and path to save the drawing to disk
const fs = require('fs');
const path = require('path');

// file where the drawing is saved between server restarts
const HISTORY_FILE = path.join(__dirname, 'history.json');

// every dot drawn so far,
// so new clients can see what was drawn before they joined
const history = loadHistory();

// maximum number of dots kept in history (oldest are dropped first)
const MAX_HISTORY = 50000;

// true when history has changed since the last save
let historyChanged = false;

// save the drawing every 2 seconds if it changed,
// instead of writing the file on every single dot
setInterval(saveHistory, 2000);

// save one last time when the server is stopped with ctrl+c
process.on('SIGINT', () => {
    saveHistory();
    process.exit();
});

// function to read the saved drawing, or start empty
function loadHistory(){
    try {
        return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
    } catch (err) {
        // no file yet, or it's unreadable
        return [];
    }
}

// function to write the drawing to disk
function saveHistory(){
    if (!historyChanged) return;
    // write to a temp file then rename it,
    // so a crash mid-write can't corrupt the saved drawing
    fs.writeFileSync(HISTORY_FILE + '.tmp', JSON.stringify(history));
    fs.renameSync(HISTORY_FILE + '.tmp', HISTORY_FILE);
    historyChanged = false;
}

// function to handle new connections
function newConnection(socket){
    console.log(socket.id);

    // send the existing drawing to the client that just joined
    socket.emit('history', history);

    // listen for 'mouse' events from the client
    socket.on('mouse', mouseMessage);

    // listen for 'clear' events from the client
    socket.on('clear', clearMessage);

    // function to handle 'clear' events
    function clearMessage(){
        // forget the drawing so new clients start blank
        history.length = 0;
        historyChanged = true;

        // tell every client, including the sender, to clear
        io.sockets.emit('clear');
    }

    // function to handle 'mouse' events
    function mouseMessage(data){
        console.log(data);

        // store the dot, dropping the oldest one past the cap
        history.push(data);
        if (history.length > MAX_HISTORY) {
            history.shift();
        }
        historyChanged = true;

        // broadcast the 'mouse' event to all other clients 
        // except the sender
        socket.broadcast.emit('mouse', data);

        // alternatively, to broadcast to all clients 
        // including the sender, use:
        // io.sockets.emit('mouse', data);
    }
}
```

In `sketch.js`, we need to update the 'history' event:
```js
function setup(){
    // ... rest of setup code

    // redraw everything drawn before this client joined
    // (also sent again on reconnect, e.g. after a server restart,
    // so start from a blank canvas to stay in sync with the server)
    socket.on('history', (dots) => {
        clearCanvas();
        dots.forEach(newDrawing);
    });
}

```

# Full boilerplate

Download the following boilerplate [zip](/files/zip/p5-express-sockets-boilerplate.zip) and follow instructions in the README.md for installation.