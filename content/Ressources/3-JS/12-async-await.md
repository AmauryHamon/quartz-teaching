---
title: API, Async, await
draft: false
tags:
  - débutant
  - essentiels
  - JS
description: Asynchronous functions
---

`async/await` keywords are syntactic way to work with promises, allowing better code reading and writing.

We saw in [[Ressources/3-js/11-fetch-intro|fetch]] how to work with promises without async/await.

```js
const getUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

// Sample usage
getUsers();
```

With `async/await`:

```js
const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(data);
}

// Sample usage
getUsers();
```

# Async functions

The `async` keyword can be placed in front of a function definition. This will make the function ==always== return a promise automatically.

```js
// without async, with Promise
const getNumber = () => {
    return new Promise(resolve => {
        resolve(42);
    });
}
// Sample usage
getNumber().then(value => {
    console.log(value); // 42
});

//with async arrow function
const getNumber = async () => {
    return 42;
}

//with async function
async function getnumber(){
    return 42;
}
```

Functions defined with the `function` keyword, can be made `async` by prefixing the keyword `async` before function. With arrow functions, notice that the `async` keyword goes before the parameters.

[MDN: async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

# Await keyword

The await `keyword` can ==only== be used inside async functions.

The await `keyword` pauses the execution of the current function, until the promise resolves. And, then, it will automatically resolve it (call `.then()` on it), and give you the result which you can save in a variable.

```js
//with async arrow function
const getNumber = async () => {
    return 42;
}

//using non-async wrapper function without await:
const init = () => {
    getValue().then(result => {
        console.log(result); // 42
    });
}

//using async wrwapper function with await:
const init = async () => {
    const result = await getValue();
    console.log(result); // 42
}
```

The benefit is that the code looks like it's running top to bottom synchronously: operations that take some time will pause execution of their parent function.

The only expression that you can await is a ==promise== (or an object that has a `.then()` method). This is because `await` will resolve the promise for you, so it will call `.then()` on it behind the scenes.

`await` only works within `async` functions.

# Error handling with await

When a promise is rejected, we can wrap code inside a `try...catch` block.

```js
const getSomething = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    return data.something
}

const init = async () => {
    try {
        const result = await getSomething()
        console.log(result);
    } catch (error) {
        console.error(error);
        // handle error by showing that something went wrong
    }
}
```

## Common mistake

```js
const getSomething = async () => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data.something
    } catch(error) {
        // this will give an unexpected result
        return "An error has occurred";
    }
}
```

Using `return` inside an async function ==always== fulfill successfully.

To correct this unexpected behavior, we need to manually `throw` an error

```js
const getSomething = async () => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data.something
    } catch(error) {
        // this throws an error and works as expected
        throw "An error has occurred";
    }
}
```

# Try, catch, finally

Similarly to promises, `try...catch` can also integrate `finally` at the end to prevent code duplication. This part will run either after the `try {...}` or the `catch {...}` blocks.

```js
//without finally
const init = async () => {
    try {
        await wait(1_000);
        return 42;
    } catch (error) {
        console.log("An error has occurred");
        console.error(error);
        return 42;
    }
}

//with finally
const init = async () => {
    try {
        await wait(1_000); //1000ms
    } catch (error) {
        console.log("An error has occurred");
        console.error(error);
    } finally {
        return 42;
    }
}
```