---
title: Flex CSS
draft: false
tags:
  - initié
  - CSS
---

Flexbox est une manière de mettre en page les éléments en colonnes et ajuster leurs alignements. Les dimensions des éléments s'adaptent (s'étendent) pour remplir un espace supplémentaire ou rétrécissent pour s'adapter à des espaces plus petits.

## Exemple basique

Dans une section avec 3 enfants, nous voudrions 3 colonnes:
```html
<section id="intro">
  <div>Premiere</div>
  <div>Deuxieme</div>
  <div>Troisieme</div>
</section>
```
Dans notre document `style.css`, on déclare `display:flex;` à notre section
```css
section#intro {
  display: flex;
}
```
Les trois blocs enfants passent en colonnes!
![](/files/flex-1.png)

## Exemple largeur égale

Dans le premier exemple, chaque colonne prends la largeur de son contenu. Pour qu'elles prennent la même largeur, nous pouvons utiliser `flex` dans chaque colonne:
```html
<section id="intro">
  <div class="col">Premiere</div>
  <div class="col">Deuxieme</div>
  <div class="col">Troisieme</div>
</section>
```
```css
section#intro {
  display: flex;
}
.col {
  flex: 1;
}
```
En donnant à `flex` la valeur 1, nous disons que chaque colonne a le poids/importance de 1.

![](/files/flex-2.png)

## Exemple largeur inégale:

Pour obtenir une valeur inégale sur une colonne, il suffit de modifier son flex individuellement (en ajoutant une classe):
```html
<section id="intro">
  <div class="col">Premiere</div>
  <div class="col large">Deuxieme</div>
  <div class="col">Troisieme</div>
</section>
```
```css
section#intro {
  display: flex;
}
.col {
  flex: 1;
}
.col.large {
  flex: 3;
}
```

![](/files/flex-3.png)

En donnant à la grande colonne la valeur de 3, elle a donc la taille de 3 à 1 par rapport aux autres frères et sœurs.

> [!Tips]
>
> Pour qu'une colonne s'adapte à son contenu, il faut lui donner une valeur de `flex: 0;`

## Ressources

Pour plus d'informations sur flexbox, comme toujours, [MDN Web Docs](https://developer.mozilla.org/fr/docs/Learn/CSS/CSS_layout/Flexbox)

Pour pratiquer le positionnement d'éléments en utilisant Flex, voir la [ressource suivante](https://flexboxfroggy.com/#fr)
