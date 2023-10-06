---
title: Scroll to Anchor
draft: false
tags:
- initié
- snippet
---

Une balise de lien peut emmener à différentes partie d'une même page à l'aide d'attributs ID.
Pour cela il faut:
- le lien vers l'ancre doit être à l'intérieur d'un élément HTML
- un ID unique attribué à la section de destination
- dans le lien, attribuer comme destination l'ID (href="#IDdestination")


```html
<a href="#id-of-element-to-link-to">Emmène moi à une autre partie de la page!</a>
<div>
  <p id="id-of-element-to-link-to">Une autre partie de la page</p>
</div>

```
--- 


## Bonus

Dans votre css, appliquez la déclaration suivante sur le parent du lien. Cela permettra de faire un scroll avec transition plutôt qu'un saut instantané dans la page.

```css
.parent-element-of-link {
  scroll-behavior: smooth;
}
```

Dans des cas plus avancées on peut également faire cela avec du javascript.