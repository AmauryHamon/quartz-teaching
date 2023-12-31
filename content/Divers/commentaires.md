---
title: Commenter son code
draft: false
tags:
- essentiels
- débutant
---

Il est essentiel et très pratique de commenter son code pour se souvenir de ce qu'il fait, pour soi-même, pour d'autres gens travaillant avec vous.

Cela peut paraitre bête à dire mais bien nommer, ranger son code fait partie des aspects les plus importants.

Pour vous aider, posez-vous toujours la question suivante:
>[!important]
>
>Est-ce que `moi ou quelqu'un d'autre` pourrait comprendre `mon code, mes fichiers ou mes dossiers` `maintenant, dans 1 mois ou dans 5 ans`?

Plus d'infos sur [[fichiers-dossiers | l'organisation de vos fichiers et dossiers]]

## Commentaires HTML

```html
<!-- Ceci est une balise de commentaire HTML -->

<!-- <p>hello world!</p> -->

```

---

## Commentaires CSS

```css
/* Ceci est une balise de commentaire CSS */

body {
  /*background: red;*/
}

```

---

## Commentaires JS

```js
// Ceci est un commentaire expliquant le rôle de l'instruction

/* Ceci est une balise de commentaire JS sur une ligne */

/* Ceci est une balise de commentaire JS 
sur plusieurs 
lignes */


```
---

## Indenter son code

Peu importe le langage utilisé, le code doit toujours être indenté à chaque nouveau d'imbrication.
Vous pouvez indenter une ligne ou une sélection de lignes en appuyant sur la touche `tab`. 

À l'inverse pour désindenter, vous pouvez appuyer sur `shift + tab`. 

Par convention, une indentation comporte 2 ou 4 espaces.

```html
<div>
  <h1>Heading</h1>

  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```