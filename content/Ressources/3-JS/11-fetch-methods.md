---
title: Fetch Methods
draft: false
tags:
  - avancé
  - JS
description: How to get, create, update or deleted data with fetch?
---

# Four fetch methods

When you send a network request with the fetch method, you are performing a fetch with a method `GET` by default. There are 4 common methods that you should know about:

- `GET` (==read== data)
- `POST` (==create== data)
- `PUT` (==update== data)
- `DELETE` (==delete== data)

Note that the word ==method== here refers to one of the 4 types above. It differs from what was learned previously around functions.

Example usecase:

- Base URL: `https://example.com/api`
- Methods
    - list users GET `/users`
    - create a user POST `/users`
    - update a specific user PUT `/users/{id}`
    - delete a specific user DELETE `/users/{id}`

# Request body

Requests made with PUT, POST, DELETE can have extra field called ==body==, containing any information needed to send with the request. GET request cannot have a ==body==.

# Fetch optional argument

We know fetch accept URL as a first argument. However a second optional argument can be accepted, to specify:

- the ==method== of the request (GET/POST/PUT/DELETE)
- the ==headers== you'd like to send
- the ==body== you'd like to send

## Method & body

```js
fetch(URL, {
    method: "POST", // or PUT or DELETE
    body: JSON.stringify({
        key1: 'value1', // replace with key/value based on documentation
        key2: 'value2', // same as above (if needed)
    })
})
.then(response => response.json())
.then(data => {
    console.log(data); // read server response
})
.catch(error => {
    console.error(error);
});
```

JSON.stringify is important as we can't directly send an object to an API, it needs to convert in a JSON string.

## Headers

TODO
 