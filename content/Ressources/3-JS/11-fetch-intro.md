---
title: Fetch Intro
draft: false
tags:
  - avancé
  - JS
description: Fetching data from an API – the basics.
---

# What is an API?

API stands for ==Application Programming Interface==, it is a technology for websites and services to communicate together, sending and retrieving data, without reloading the page.

# 1. Fetch

`fetch`is a Web API, which allows to request data to a server – ours or an external one. The important part is it allows to retrieve data without reloading the page.

[MDN: fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## Syntax

`fetch(URL)` is the first step, we need a url to which we request data.
This request will come back with a ==response==. The response can be text, JSON, binary data, or any other formats. Most of the time, it's JSON.

```js
fetch(URL)
// ... then response
```

This response is a ==promise==. 

## Base URL & endpoints

API URLs are generally composed two parts: a base URL, and endpoints to different types of data.

Example for a service API with different endpoints:
- https://service.com/api/v1/users.json
- https://service.com/api/v1/notifications.json
- https://service.com/api/v1/messages.json
- https://service.com/api/v1/account/password.json

Here, the base URL is `https://service.com/api/v1`, and endpoints are
- `users.json`
- `notifications.json`
- `messages.json`
- `account/password.json`

```js
fetch("https://service.com/api/v1/users.json")
// ... then response
```

This logic of Base URL and endpoints avoids repetition and makes documentation of an API easier.

When working with APIs, the terms URLs and endpoints can be used interchangeably, but throughout any API documentation, `endpoint` is most commonly used.

# 2. Response Promise

After fetching, response is an intermediary step before actually accessing and using the fetched data.

Promises in JavaScript allows to schedule work in the future, and run callbacks based on the outcome of the promise (if it succeeded or not).

Since `fetch` returns the ==Response== object as a promise, we have to consider what to do depending if the promise succeeds or not. 

We resolve the promise using a `then(callback)`, running once the fetch request has completed. The first argument is called by convention `response`.

```js
fetch(URL)
  .then(response => {
    console.log(response);
  });
```

Fetch is a generic browser function, and it doesn't know what type of data is received, for this reason we generally manually convert the response into an object:

```js
fetch(URL)
  .then(response => {
    return response.json();
});
```

`response.json()` is very similar to [[Ressources/3-js/10-json#convertir-une-string-json-en-objet|JSON.parse(string)]], but differs due to its asynchronous and non-blocking nature: it returns a ==promise==.

If we use [[Ressources/3-js/3-functions#implicit-return|implicit return]] fetch and then can be written as follows:

```js
fetch(URL)
  .then(response => response.json());
```
## Common mistakes

> [!warning]
>
> 1. No `;` after `fetch(URL)`, it breaks the .then chain
> ```js
> fetch(URL); // ❌ this breaks the .then
>   .then(response => response.json());
> ```
> 2. Don't forget to return the result of .json()
> If using `{}`, use `return` keyword. Without `{}`, use implicit return syntax.
> ```js
> fetch(URL)
>  .then(response => {
>    // ❌ response.json() is not being returned
>    response.json()
>  });
> ```
> 3. Don't forget parentheses to `.json()`
> `.json()`is a method and needs its parentheses.
> ```js
> fetch(URL)
>   .then(response => response.json) 
>   // ❌ response.json is a function. You need the ()
> ```

# 3. Reading the response

Because the response is a promise, we can't read directly its data and need to resolve its promise with another `then(callback)`

```js
fetch(URL)
.then(response => response.json())
.then(data => {
    console.log(data);
});
```

This repetition of `.then(callback)`is called a ==promise chaining==

## What is `data`?

The `data` variable will be the information that the API returns. For example:

```js
{
  title: "My project Title",
  category: "Book design",
  year: 2026
}
```

## Execution order

Assuming that the fetch call works successfully, what do you think the output of the code below is?

```js
console.log("A");
fetch("some-url")
    .then(response => response.json())
    .then(data => {
        console.log("B");
    });
console.log("C");
```

Since promise schedule work in the future, output of the code will be:

```js
"A"
"C"
"B" // this one shows up sometime later
```


# Working with fetch

## Exemple with array of objects

Here is an example of API endpoint located at [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)

```js
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    ... // other key/values here
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    ... // other key/values here
  }, {
    ...
}]
```

This structure is an [[Ressources/3-js/4-arrays-objects#08-Arrays-of-Objects-–-the-Real-world-Pattern|array of objects]].
If we would want to log emails of every user:

```js
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        // visualize it then realize it's an array of objects
        data.forEach(user => {
            // console.log(user); 
            // // visualize how each item of the array look like
            console.log(user.email); // log the email
        });
    });

```
# Handling fetch errors

## Response status codes

Before learning how to handle fetch errors, let's see what status codes can a response provide.

When you perform a fetch request to an API, it will respond with a status code that could be in one of the following ranges:

100-199 (or 1xx) -> Informational responses (rare)
200-299 (or 2xx) -> Successful responses
300-399 (or 3xx) -> Redirects
400-499 (or 4xx) -> Client errors
500-599 (or 5xx) -> Server errors

The most encountered is generally `404`, for a page not found.

[HTTP Cats](https://http.cat/)

## Fetch errors handling

When something goes wrong in our fetch promise chain, we can add a `catch(callback)`

```js
fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    // handle network errors
    console.error(error);
});
```

> [!important] Fetch won't reject for error codes
> The fetch() promise rejects for network errors, not client or server errors (4xx, 5xx).
> This means fetching a URL that does not exist (404) will have its promise fulfilled. The then(callback) with be executed, catch(callback) will only execute in case of network failure.

A better error handling would then cover to check in the response object for a status code (providing it's available in the API we work with):

```js
fetch(URL)
  .then(response => {
    if (!response.ok) {
      // 4xx or 5xx error
      throw new Error("API issues.");
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
```

When `response.ok` is false, in that case, we throw a new error. The `throw new Error("API issues.")` will reject the promise, so, the code stops running the current `.then(callback)` and then jumps to the `.catch(callback)`.

# TLDR fetch boilerplate

```js
fetch(URL)
  .then(response => {
    // console.log(response;)
    // check if response object has status code
    if (!response.ok) {
      // 4xx or 5xx error
      throw new Error("API issues.");
    }
    return response.json()
  })
  .then(data => {
      console.log(data);
  })
  .catch(error => {
      console.error(error);
  })
```