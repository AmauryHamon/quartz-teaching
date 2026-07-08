---
title: CSS Basics Cheatsheet
draft: false
tags:
  - cheatsheet
  - débutant
  - CSS
---

Ceci est une liste non-exhaustive des propriétés de base pour styliser, positionner des éléments.


## Espacements et dimensions
```css
/* Padding */
div{
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding: 20px;
  padding: 0 20px; 
  padding: 0 20px 5px 10px; 
}

/* Margin */
div{
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin: 20px;
  margin: 0 20px; 
  margin: 0 20px 5px 10px; 
}

/* Hauteur/Largeur */
div{
height:300px;  /* 100%; 100vh; 100em; Unités responsive */
width:300px; /* 100%; 100vw; 100em; Unités responsive */
}

```
Pour en savoir plus sur les unités relatives, voir [[Responsive]]

## Display

```css
div{
display:none;         /* l'élément est complètement retiré. */
display:block;        /* affiche l'élément comme un bloc sur une nouvelle ligne, prend toute la largeur */
display: inline;      /* affiche l'élément dans la même ligne */
display:inline-block; /* affiche l'élément dans la même ligne, peut recevoir des valeurs de hauteur et largeur */
display: inherit;     /* hérite la propriété de son élément parent */
}


```
Il en existe d'autres plus avancés, pour cela, voir [[Flex]][[Grid]]
Liste exhaustive sur [MDN Display](https://developer.mozilla.org/fr/docs/Web/CSS/display)
## Position

La propriété CSS position définit la façon dont un élément est positionné dans un document. Les propriétés `top`, `right`, `bottom` et `left` déterminent l'emplacement final de l'élément positionné.


```css
div{
position: static;
/* Comportement normal (par défaut). 
L'élément est alors positionné dans le flux avec sa position. */

position: fixed;
/* L'élément est retiré du flux normal et aucun espace n'est laissé pour l'élément. 
L'élément est positionné relativement au bloc englobant initial formé par la zone d'affichage (viewport) */


position: absolute;
/* L'élément est retiré du flux normal et aucun espace n'est créé pour l'élément sur la page. 
Il est ensuite positionné par rapport à son ancêtre le plus proche qui est positionné 
s'il y en a un ou par rapport au bloc englobant initial sinon. 
La position finale de l'élément est déterminée par les valeurs de top, right, bottom et left. */


position: relative;
/* L'élément est positionné dans le flux normal du document puis décalé, 
par rapport à lui-même, selon les valeurs fournies par top, right, bottom et left.  */

}
```
Pour en savoir plus [MDN Position](https://developer.mozilla.org/fr/docs/Web/CSS/position)

Il existe également `position:sticky;` à voir ici [[Sticky]]

## Texte

```css
p{
font-family: arial;
font-style: italic;
font-weight: bold;
font-weight: 100;     /* 200; 300; etc. Du plus light au plus bold*/
font-size:  24px;     /* 3em; 3rem; */
text-align: center;   /* ou left; right; justify; */
line-height: 24px;    /* 1; 2rem; */
letter-spacing: 2px;  /* 0.05em; */

}
```
Pour plus d'informations, voir [[webfonts]]

## Couleurs

```css
p{
color:red;        /* couleur du texte */
background-color: red;    /* couleur de l'arrière-plan; */

}
```

Les couleurs peuvent être choisis avec soit:
- un [nom de couleur websafe](https://www.w3schools.com/tags/ref_colornames.asp), 
- un [code hexadécimal](https://www.w3schools.com/colors/colors_hexadecimal.asp), 
- une valeur [rgb](https://www.w3schools.com/cssref/func_rgb.php) (red-green-blue), 
- une valeur [rgba](https://www.w3schools.com/cssref/func_rgba.php) (avec opacité inclue).

