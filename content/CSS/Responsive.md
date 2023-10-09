---
title: Responsive
draft: false
tags:
  - initié
---

On peut accéder au web depuis n'importe quel type d'appareil. Pour designer une page web, il faut donc prendre en compte qu'on ne design pas que pour un seul moment mais une infinité.

Par exemple: un design sur écran d'ordinateur avec plusieurs colonnes ne pourra peut être tenir qu'une colonne sur écran de téléphone à la fois, ainsi les colonnes se superposent de haut en bas sur mobile, alors qu'elles se suivent de gauche à droite sur desktop.

En CSS, pour définir différentes mises en pages nous utilisons des `media queries` dans lesquelles nos déclarations CSS peuvent contenir des sélecteurs ayant des valeurs différentes.

Aussi, on peut utiliser des unités "responsive" autres que le pixel. Par exemple le pourcentage (%), etc. (Voir plus bas)

## Media Query

Les *media queries* (requêtes de media) permettent de définir des *breakpoints* (points de changements). Ces points de changement indiquent à quel moment le design doit s'adapter à une nouvelle taille d'écran. Par exemple: si l'écran est plus petit que 1000px.

Dans un document CSS cela ressemble à ceci:
```css
/* CSS par défaut (desktop)  */
section {
  background: red;
  width: 100%;
  padding: 1em;
}

/* CSS pour écran plus petit que 768px (téléphones) */
@media only screen and (max-width:768px) {
  section {
    background: green;
  }
}

```
Nous pouvons appliquer des changements à n'importe quelle déclaration CSS, tout est possible: couleurs, dimensions, typographie, etc. Notez cependant qu'il n'est pas nécessaire de répéter vos valeurs par défaut, seules celles changeant importent.

Il est bonne pratique de placer les media queries à la fin de votre document css pour mieux vous y retrouver entre le CSS de base et celui spécifique à un/des media queries.

### Breakpoints

Lorsque l'on designe pour le web, nous utilisons généralement 3 breakpoints:
- ordinateurs               (> 1024px)
- tablettes                 (< 1020px>)  
- smartphones / téléphones  (<768px>)

En CSS cela prends la forme suivante:
```css
/* Desktop */
section {
  background: red;
}

/* Tablet */
@media only screen and (max-width:1024px) {
  section {
    background: blue;
  }
}

/* Mobile */
@media only screen and (max-width:768px) {
  section {
    background: yellow;
  }
}
```

Pour en savoir plus: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries)

## Unités responsive

### em et rem
*em* (emphemeral unit) et *rem* (root empheral unit) sont deux unités de mesures flexibles traduites par votre navigateur en pixels. Elles dépendent de la taille de police utilisée par votre navigateur.

Par défaut la taille de police d'un navigateur est de 16px. Si l'on voudrait associer un padding d'1em autour d'un bloc de texte et une taille de texte de 2rem, cela donnerait la formule suivante:

1 em = 1 * 16px
2 rem = 2 * 16px

La différence entre les unités de mesure *em* et *rem* réside uniquement dans la manière dont le navigateur va traduire leur valeur en pixels.
Je vous recommende d'utiliser le rem.

Pour en savoir plus [](https://medium.com/codeshake/unit%C3%A9s-de-mesures-em-vs-rem-eac03dbcb9c7)

### vh et vw

`vh` (viewport height) et `vw` (viewport width) correspondent à un pourcentage en hauteur (vh) et largeur (vw) de l'écran. On utilise très peu cette unité pour mettre en page le texte, plutôt pour les dimensions de blocs.