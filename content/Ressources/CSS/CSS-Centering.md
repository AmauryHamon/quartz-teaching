---
title: Centrer en CSS
draft: false
tags:
  - initié
  - CSS
---

Source: [CSS Tricks](https://css-tricks.com/centering-css-complete-guide/)

## Horizontalement

<details>
<summary>Est-ce que c'est un élément inline (texte, liens, etc.)?</summary>

Cela fonctionne pour les éléments inline, inline-block, inline-table, inline-flex, etc.

```css
.center {
  text-align: center;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="XWBvmB" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/XWBvmB">
  Centering Inline Elements</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

</details>

---

<details>
<summary>Est-ce que c'est un élément block?</summary>

En mettant `margin-left:auto;` et `margin-right:auto;`, et si l'élément a une largeur définie (sinon il prendra toute la largeur et n'a pas besoin d'être centré)

```css
.center-me {
  margin: 0 auto;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xxJvZm" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/xxJvZm">
  Centering Single Block Level Element</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


</details>

---

<details>
<summary>Est-ce qu'il y a plusieurs éléments block?</summary>

Si vous avez deux éléments ou plus au niveau du bloc qui doivent être centrés horizontalement dans une rangée, il est probable qu'il soit préférable de leur attribuer un type d'affichage différent. Voici un exemple d'affichage inline-block et un exemple d'affichage flexbox:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jOpgrG" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/jOpgrG">
  Centering Row of Blocks</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

À moins que vous ne vouliez dire que vous avez plusieurs éléments de niveau bloc empilés les uns sur les autres, auquel cas la technique de la marge automatique est toujours valable:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="gOjVLr" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/gOjVLr">
  Centering Blocks on Top of Each Other</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

</details>

---

## Verticalement

<details>
<summary>Est-ce que c'est un élément inline (texte, liens, etc.)?</summary>
<br>
<details>
<summary>Est-ce que c'est une seule ligne?</summary>

Parfois, les éléments de texte en ligne peuvent apparaître centrés verticalement, simplement parce qu'il y a un rembourrage égal au-dessus et au-dessous d'eux.

```css
.link {
  padding-top: 30px;
  padding-bottom: 30px;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="OJwKWb" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/OJwKWb">
  Centering text (kinda) with Padding</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

</details>
<br>
<details>
<summary>Est-ce que c'est multiligne?</summary>

Le plus simple serait en utilisant flexbox, on peut avoir un simple enfant flexible centré dans un parent flexible assez facilement. Rappelez-vous que cela n'est vraiment pertinent que si le conteneur parent a une hauteur fixe (px, %, etc.), ce qui explique pourquoi le conteneur a une hauteur.


```css
.flex-center-vertically {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 400px;
}

```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="YzOKGV" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/YzOKGV">
  Vertical Center Multi Lines of Text with Flexbox</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

</details>

</details>

---

<details>
<summary>Est-ce que c'est un élément block?</summary>
<br>
<details>
<summary>Savez-vous la hauteur de l'élément?</summary>

Il est assez courant de ne pas connaître la hauteur dans la mise en page d'une page web, pour de nombreuses raisons : si la largeur change, la refonte du texte peut modifier la hauteur. La variation du style du texte peut modifier la hauteur. La variation de la quantité de texte peut modifier la hauteur. Les éléments dont le rapport hauteur/largeur est fixe, comme les images, peuvent changer de hauteur lorsqu'ils sont redimensionnés. Etc.

Mais si vous connaissez la hauteur, vous pouvez centrer verticalement comme :

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px; /* account for padding and border if not using box-sizing: border-box; */
}

```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="GRBVOj" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/GRBVOj">
  Center Block with Fixed Height</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

</details>
<br>
<details>
<summary>La hauteur est inconnue?</summary>

Il est encore possible de le centrer en le remontant de moitié après l'avoir abaissé de moitié :

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dyjxdP" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/dyjxdP">
  Center Block with Unknown Height</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

</details>
<br>
<details>
<summary>Cela vous importe-t-il que l'élément s'étende jusqu'à la hauteur du conteneur ?</summary>

Si ce n'est pas le cas et que vous avez simplement besoin que le contenu soit centré verticalement, l'utilisation de tableaux ou d'un affichage CSS pour transformer les éléments en tableaux peut faire l'affaire.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RmeWvQ" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/RmeWvQ">
  Center Block with Table Stretch</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

</details>
<br>
<details>
<summary>Flexbox possible?</summary>

```css
.parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="bGjXKo" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/bGjXKo">
  Center Block with Unknown Height with Flexbox</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

</details>

</details>

---

## Horizontalement et verticalement

<details>
<summary>L'élément a-t-il une largeur et une hauteur fixes ?</summary>

L'utilisation de marges négatives égales à la moitié de la largeur et de la hauteur, après avoir positionné l'image à 50 % / 50 %, permet de centrer l'image avec un excellent support inter-navigateurs :

```css
.parent {
  position: relative;
}

.child {
  width: 300px;
  height: 100px;
  padding: 20px;

  position: absolute;
  top: 50%;
  left: 50%;

  margin: -70px 0 0 -170px;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="GRBVYr" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/GRBVYr">
  Center Block with Fixed Height and Width</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

</details>
<br>
<details>
<summary>La largeur et la hauteur de l'élément sont-elles inconnues ?</summary>

Si vous ne connaissez pas la largeur ou la hauteur, vous pouvez utiliser la propriété transform et une translation négative de 50 % dans les deux directions (elle est basée sur la largeur/hauteur actuelle de l'élément) pour centrer :

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="oNMKQj" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/oNMKQj">
  Center Block with Unknown Height and Width</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

</details>
<br>
<details>
<summary>Pouvez-vous utiliser flexbox ?</summary>

Pour centrer dans les deux sens avec flexbox, vous devez utiliser deux propriétés de centrage :

```css
.parent {
  display: flex;
  justify-content: center; /* centre horizontalement */
  align-items: center; /* centre verticalement */
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="XWBvBG" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/XWBvBG">
  Center Block with Unknown Height and Width with Flexbox</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

</details>
<br>
<details>
<summary>Pouvez-vous utiliser grid ?</summary>

Il s'agit d'une petite astuce (par Lance Janssen) qui fonctionne à peu près pour un seul élément :

```css
body, html {
  height: 100%;
  display: grid;
}
span { /* thing to center */
  margin: auto;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="NvwpyK" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/NvwpyK">
  Centering with Grid</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

</details>

