---
title: 3. Grid CSS Eléments
draft: false
tags:
  - initié
  - CSS
---

CSS Grid offre un système de mise en page basé sur une grille, avec des rangées et des colonnes, ce qui facilite la conception de pages Web sans avoir à utiliser de `float` ni de `position`.

Articles précédents sur les grilles CSS: [[Grid-intro]] [[Grid-container]] 

# Réglages d'éléments de grille

Un *conteneur* de grille contient des *éléments* de grille .

Par défaut, un conteneur comporte un élément de grille pour chaque colonne, dans chaque ligne, mais vous pouvez styliser les éléments de grille afin qu'ils s'étendent sur plusieurs colonnes et/ou lignes.

## Propriété grid-column

La propriété `grid-column` définit sur quelle(s) colonne(s) placer un élément. Vous définissez où l'élément commencera et où l'élément se terminera.

>[!tip]
> La propriété `grid-column` est un raccourci pour les propriétés `grid-column-start` et `grid-column-end`.

![](/files/grid-column.png)

Pour placer un élément, vous pouvez vous référer aux *numéros de ligne* ou utiliser le mot-clé *span* pour définir le nombre de colonnes que l'élément s'étendra.

```css
/* Faites en sorte que "item1" commence sur la colonne 1 et se termine avant la colonne 5 */
.item1 {
  grid-column: 1 / 5;
}
```

```css
/* Faites en sorte que "item1" commence sur la colonne 1 et s'étende sur 3 colonnes*/
.item1 {
  grid-column: 1 / span 3;
}
```


## Propriété grid-row

La propriété `grid-row` définit sur quelle ligne placer un élément. Vous définissez où l'élément commencera et où l'élément se terminera.

![](/files/grid-row.png)

> [!tip]
> La propriété `grid-row` est un raccourci pour les propriétés `grid-row-start` et `grid-row-end`.

Pour placer un élément, vous pouvez vous référer aux *numéros de ligne* ou utiliser le mot-clé *span* pour définir le nombre de lignes que l'élément s'étendra :

```css
/* Faites en sorte que "item1" commence sur la ligne 1 et se termine sur la ligne 4*/
.item1 {
  grid-row: 1 / 4;
}
```

```css
/* Faites en sorte que "item1" commence sur la ligne 1 et s'étende sur 2 lignes*/
.item1 {
  grid-row: 1 / span 2;
}
```

## La propriété grid-area

La propriété `grid-area` peut être utilisée comme propriété abrégée pour les propriétés `grid-row-start`, `grid-column-start`, `grid-row-end` et `grid-column-end`.

![](/files/grid-area.png)

```css
/* Faites en sorte que "item8":
- commence sur la ligne de ligne 1 et la ligne de colonne 2 
- se termine sur la ligne de ligne 5 et la ligne de colonne 6 */
.item8 {
  grid-area: 1 / 2 / 5 / 6;
}
```

## Nommer les éléments de la grille

La propriété `grid-area` peut également être utilisée pour attribuer des noms aux éléments de la grille. Les éléments de grille nommés peuvent être référencés par la propriété `grid-template-areas` du conteneur de grille.

```css
/*Item1 reçoit le nom « myArea » et s'étend sur les cinq colonnes dans une disposition en grille de cinq colonnes*/

.item1 {
  grid-area: myArea;
}
.grid-container {
  grid-template-areas: 'myArea myArea myArea myArea myArea';
}
```

Chaque ligne est définie par des apostrophes (`' '`)
Les colonnes de chaque ligne sont définies à l'intérieur des apostrophes, séparées par un espace.

> [!tip]
> Un point représente un élément de grille sans nom.

```css
/* Laissez "myArea" s'étendre sur deux colonnes 
dans une disposition en grille de cinq colonnes 
(les points représentent des éléments sans nom)
 */
.item1 {
  grid-area: myArea;
}
.grid-container {
  grid-template-areas: 'myArea myArea . . .';
}
```

Pour définir deux lignes, définissez la colonne de la deuxième ligne à l'intérieur d'un autre ensemble d'apostrophes :

```css
/* Faites en sorte que "item1" s'étende sur deux colonnes et deux lignes*/
.grid-container {
  grid-template-areas: 'myArea myArea . . .' 'myArea myArea . . .';
}
```

```css
/* Nommez tous les éléments et créez un modèle de page Web prêt à l'emploi*/
.item1 { grid-area: header; }
.item2 { grid-area: menu; }
.item3 { grid-area: main; }
.item4 { grid-area: right; }
.item5 { grid-area: footer; }

.grid-container {
  grid-template-areas:
    'header header header header header header'
    'menu main main main right right'
    'menu footer footer footer footer footer';
}
```

## Ordre des articles

La disposition en grille nous permet de positionner les éléments où nous le souhaitons. Il n'est pas nécessaire que le premier élément du code HTML apparaisse comme premier élément de la grille.

![](/files/grid-order.png)

```css
.item1 { grid-area: 1 / 3 / 2 / 4; }
.item2 { grid-area: 2 / 3 / 3 / 4; }
.item3 { grid-area: 1 / 1 / 2 / 2; }
.item4 { grid-area: 1 / 2 / 2 / 3; }
.item5 { grid-area: 2 / 1 / 3 / 2; }
.item6 { grid-area: 2 / 2 / 3 / 3; }
```

Vous pouvez réorganiser l'ordre pour certaines tailles d'écran, en utilisant des requêtes multimédias. 

```css
@media only screen and (max-width: 500px) {
  .item1 { grid-area: 1 / span 3 / 2 / 4; }
  .item2 { grid-area: 3 / 3 / 4 / 4; }
  .item3 { grid-area: 2 / 1 / 3 / 2; }
  .item4 { grid-area: 2 / 2 / span 2 / 3; }
  .item5 { grid-area: 3 / 1 / 4 / 2; }
  .item6 { grid-area: 2 / 3 / 3 / 4; }
}
```

Plus d'infos: [[Responsive]]



