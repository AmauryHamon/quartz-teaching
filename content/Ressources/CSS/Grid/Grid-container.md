---
title: 2. Conteneur
draft: false
tags:
  - initié
  - CSS
---

CSS Grid offre un système de mise en page basé sur une grille, avec des rangées et des colonnes, ce qui facilite la conception de pages Web sans avoir à utiliser de `float` ni de `position`.

Autres articles sur les grilles CSS: [[Grid-intro]] [[Grid-elements]] 

# Réglages du conteneur de grille

## Nombre et taille de colonnes/rangées

### grid-template-columns

La propriété `grid-template-columns` définit le nombre de colonnes dans votre disposition de grille et peut définir la largeur de chaque colonne.

La valeur est une liste séparée par des espaces, où chaque valeur définit la largeur de la colonne respective.

Si vous souhaitez que votre grille contienne 4 colonnes, spécifiez la largeur des 4 colonnes, ou "auto" si toutes les colonnes doivent avoir la même largeur.

```css
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  /* grille de 4 colonnes de même largeur */
}
```

> [!tip]
>
> Si vous avez plus de 4 éléments dans une grille de 4 colonnes, la grille ajoutera automatiquement une nouvelle ligne (`row`) pour y placer les éléments.

La propriété `grid-template-columns` peut également être utilisée pour spécifier la taille (largeur) des colonnes.

```css
.grid-container {
  display: grid;
  grid-template-columns: 80px 200px auto 40px;
}
```

### grid-template-rows

La propriété `grid-template-rows` définit la hauteur de chaque ligne.
La valeur est une liste séparée par des espaces, où chaque valeur définit la hauteur de la ligne respective:

![](/files/grid-template-rows.png)

```css
.grid-container {
  display: grid;
  grid-template-rows: 80px 200px;
}
```

## Aligner la grille dans son conteneur

### justify-content

La propriété `justify-content` est utilisée pour aligner toute la grille à l’intérieur du conteneur.

> [!warning] Remarque: 
> La largeur totale de la grille doit être inférieure à la largeur du conteneur pour que la propriété `justify-content` ait un effet.

![](/files/space-evenly.png)

```css
.grid-container {
  display: grid;
  justify-content: space-evenly; 
  /* autre valeurs: space-around; space-between; center; start; end; */
}
```

### align-content

La propriété `align-content` est utilisée pour aligner verticalement toute la grille à l’intérieur du conteneur.

![](/files/align-content-center.png)

> [!Warning]
> La hauteur totale de la grille doit être inférieure à la hauteur du conteneur pour que la propriété `align-content` ait un effet.

```css
.grid-container {
  display: grid;
  height: 400px;
  align-content: center;
  /* autre valeurs: space-around; space-evenly; space-between; start; end; */
}
```

