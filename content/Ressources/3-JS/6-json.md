---
title: JSON
draft: false
tags:
  - débutant
  - essentiels
  - JS
description: Sending and receiving data with JSON
---

# ~~Qui~~ Qu'est-ce que JSON?

JSON signifie JavaScript Object Notation. C'est un format pour stocker et envoyer des données. Il est très couramment utilisé sur le web car il est léger. Voici un exemple d'objet JSON dans un fichier d'exemple appelé `person.json`:

```json
{
    "firstName": "John",
    "lastName": "Doe",
    "age": 24
}
```

Ci-dessus, les clés sont entourées de guillemets ("firstName", "lastName", et "age").

Ceci car l'objet JSON est enregistré dans un fichier `.json`. Cependant, lorsqu'il est utilisé en JavaScript, on peut omettre les guillemets autour des clés. Et donc on peut l'assigner à une variable. Par exemple:

```js
const person = {
    firstName: "Sam",
    lastName: "Green",
    age: 24
};
```

JSON est un sous-ensemble des [[Ressources/3-JS/5-arrays-objects#objects|objets]] JavaScript. Cela signifie que chaque objet JSON est un objet JavaScript, alors que tout objet JavaScript n'est pas un objet JSON. Ce n'est pas quelque chose que vous rencontrerez fréquemment, mais ce qui suit est un objet JavaScript mais pas un objet JSON :

```js
const user = {
    firstName: "Sam",
    lastName: "Green",
    getFullName: function() {
        return `${this.firstName} ${this.lastName}`
    }
}
```

La raison pour laquelle cet objet n'est pas un objet JSON est qu'il contient une fonction.

## Cas d'utilisation courant

On a fréquemment besoin de convertir une chaîne JSON en objet JSON (en JavaScript) et vice versa.

Lorsque l'on communique avec une [[Ressources/3-JS/7-API|API]], vous ne pouvez pas envoyer d'objet. Vous devrez le convertir en une chaîne ([[Ressources/3-JS/1-data-types#03-strings|string]]). De même, l'API ne peut pas vous envoyer d'objet, elle vous enverra une chaîne. Mais cette chaîne n'est pas n'importe quelle chaîne. C'est une chaîne JSON. Cela signifie qu'elle peut être reconvertie en un objet JSON.

## Avantages du JSON

JSON peut être lu et reçu par beaucoup de langages de programmation. Par seulement du JavaScript mais aussi par exemple Python, Ruby, Node, PHP, etc.

# Opérations JSON

On reçoit généralement une string JSON après requête auprès d'une [[Ressources/3-JS/7-API|API]].

```json
'{"firstName":"John","lastName":"Doe"}'
```

Afin de l'utiliser, il faut convertir en objet pour obtenir la forme suivante:

```js
const data = {
    firstName: "John",
    lastName: "Doe"
};
```



## Convertir une string JSON en objet

Afin de convertir une chaîne JSON en objet, vous pouvez utiliser la méthode `JSON.parse(string)`:

```js
const string = '{"firstName":"John","lastName":"Doe","age": 32}';
const person = JSON.parse(string); // {firstName: "John", lastName: "Doe", age: 32}
console.log(person.firstName); // "John"
```

En savoir plus [MDN: JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)


## Convertir un objet JSON en string

Afin de convertir un objet en chaîne JSON, il faut utiliser la méthode `JSON.stringify(object)`:

```js
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 32
};
const string = JSON.stringify(person);
console.log(string); //'{"firstName":"John","lastName":"Doe","age":32}'
```

En savoir plus [MDN: JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)