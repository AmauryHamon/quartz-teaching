---
title: Variable Fonts Web
draft: false
tags:
  - initié
  - essentiels
  - CSS
---

Les fontes variables permettent de rassembler plusieurs variantes d'une police dans un seul fichier `.otf` plutôt qu'un fichier par graisse/style comme c'est communément le cas. Leur utilisation en CSS est similaire aux [[webfonts]] classiques mais possèdent des propriétés CSS supplémentaires. 

Leur fonctionnement est basé sur la notion d'axe de variation, qui définit un intervale avec les valeurs minimales et maximales possible sur une propriété comme la largeur ou la graisse par exemple.

Il existe actuellement 5 axes de variations possibles:
- le corp
- la largeur
- la pente
- l'italique
- la taille optique.

## Épaisseur

La graisse (représenté par l'étiquette wght) définit l'épaisseur des traits formants les caractères.

```css
font-weight: 375; /* valeur entre 1 et 1000 */
/* ou */
font-variation-settings: "wght" 375;

``` 

## Largeur

La largeur (indiquée par l'étiquette wdth) correspond à l'axe selon lequel les caractères sont plus ou moins étroits ou larges.

```css
font-stretch: 115%; 
/* En dessous de 100%: stretch
En dessus de 100%: extend */

font-variation-settings: "wdth" 115;

``` 

## Italic

L'axe italique (ital) fonctionne différemment car il ne s'agit pas d'un intervalle mais d'une option activée ou désactivée : il n'y a pas de valeurs intermédiaires.

On notera l'apparition de la propriété font-synthesis: none; qui empêche les navigateurs de synthétiser l'italique en penchant les caractères (on pourra aussi utiliser cette valeur de façon équivalente pour éviter de synthétiser la graisse).

```css
font-style: italic;

font-variation-settings: "ital" 1; /* on/off uniquement */

font-synthesis: none;

``` 

## Pente (Slant)

On notera l'apparition de la propriété font-synthesis: none; qui empêche les navigateurs de synthétiser l'italique en penchant les caractères (on pourra aussi utiliser cette valeur de façon équivalente pour éviter de synthétiser la graisse).

```css
font-style: oblique 14deg;

font-variation-settings: "slnt" 14;

``` 
## Taille optique

To do

Source: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide)
