---
title: 1. Introduction Grid CSS
draft: false
tags:
  - initié
  - CSS
---

CSS Grid offre un système de mise en page basé sur une grille, avec des rangées et des colonnes, ce qui facilite la conception de pages Web sans avoir à utiliser de `float` ni de `position`.

Articles suivants sur les grilles CSS: [[Grid-container]] [[Grid-elements]] 

# Introduction

## Structure HTML


```html
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
  <div class="grid-item">7</div>
  <div class="grid-item">8</div>
  <div class="grid-item">9</div>
</div>
```
![Exemple de Grille basé sur le HTML ci-dessus](/files/grid.png)

## Display CSS

Un élément HTML devient un conteneur de grille lorsque sa `display` propriété est définie sur `grid` ou `inline-grid`.

```css
.grid-container {
  display: grid; /* ou inline-grid */
}
```
Tous les enfants directs du conteneur de grille deviennent automatiquement des éléments de grille.

## Colonnes, rangées, goutières

Les lignes verticales des éléments de la grille sont appelées `column`.

![colonnes](https://www.w3schools.com/css/grid_columns.png)

Les lignes horizontales des éléments de la grille sont appelées `row`.

![](https://www.w3schools.com/css/grid_rows.png)

Les espaces entre chaque colonne/ligne sont appelés `gap`.

![](https://www.w3schools.com/css/grid_gaps.png)

Vous pouvez ajuster la taille de l'espace à l'aide de l'une des propriétés suivantes :

- `column-gap`
- `row-gap`
- `gap`

### Exemple

La propriété `column-gap` définit l'écart entre les colonnes.
La propriété `row-gap` définit l'écart entre les lignes.

```css
.grid-container {
  display: grid;
  column-gap: 50px;
  row-gap: 100px;
}
```

La propriété `gap` est une propriété abrégée pour les propriétés `row-gap` et `column-gap`:

```css
.grid-container {
  display: grid;
  gap: 50px;
  gap: 50px 100px; /* ici, rangées et colonnes ont des valeurs différentes */
}
```

## Lignes de grille

Les lignes entre les colonnes sont appelées `column lines`.
Les lignes entre les rangées sont appelées `row lines`.

![](https://www.w3schools.com/css/grid_lines.png)

Reportez-vous aux numéros de ligne lorsque vous placez un élément de grille dans un conteneur de grille:

```css
.item1 {
  grid-column-start: 1;
  grid-column-end: 3;
}
```
[Exemple](https://www.w3schools.com/css/tryit.asp?filename=trycss_grid_lines)








