---
title: Scroll to Anchor
draft: false
tags:
- initié
- snippet
---

Une balise de lien peut emmener à différentes partie d'une même page à l'aide d'attributs ID.
Pour cela il faut:
- ID attribué à la section de destination
- dans le lien, attribuer comme destination l'ID

```html
<a href="#id-of-element-to-link-to">Emmène moi à une autre partie de la page!</a>
<div>
  <p id="id-of-element-to-link-to">Une autre partie de la page</p>
</div>

```
--- 


## Bonus

Dans votre css, appliquez la déclaration suivante soit sur les id soit sur le body pour une transition amenant à destination plutôt qu'un saut instantané.

```css
#id-of-element-to-link-to {
  scroll-behavior: smooth;
}
```

Dans des cas plus avancées on peut également faire cela avec du javascript.