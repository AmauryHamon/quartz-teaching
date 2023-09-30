---
title: CSS Introduction
draft: false
tags:
  - débutant
  - essentiels
---

## CSS: Cascading Style Sheets

Le CSS fait parti des trois languages de programmation pour le web avec le [[HTML]] et le [[Javascript]].

Si l'on utilise la métaphore d'une maison, on peut imaginer les trois langages comme répondant aux affirmations suivantes:
- HTML (Hypertext Markup Language): Quelle est la structure de la maison et ce qu'elle contient? Les portes, fenêtres, pièces…
- CSS (Cascading Style Sheets): A quoi ressemble la maison? Les peintures, textiles, revêtements…
- JS (Javascript): Comment utilise-t'on la maison? Le chauffage, la lumière…

On utilise le CSS pour mettre en forme graphiquement le site internet: définir les couleurs, la typographie, adapter le design au format des navigateurs sur ordinateur, tablette, téléphone.

## Sélecteurs

Pour se servir du CSS, il faut définir la balise HTML que l'on veut styliser. Pour cela, on utilise des sélecteurs. Un sélecteur en CSS peut être un nom de **balise**, un **id** ou une **class** (cf. attributs html)

```css
h1 { }      /* balise de titre h1 */
#logo { }   /* balise d'id 'logo'*/
.news { }   /* balise de class 'news'*/
```

Chaque sélecteur est suivi d'accolades `{}` à l'intérieur desquelles on peut mettre les styles à appliquer.

## Déclarations

Pour appliquer un style à un élément, on doit le . Une **déclaration** consiste d'un nom et sa valeur, qui s'écrivent de la manière suivante:

```css
color: red; /*on déclare la couleur rouge au sélecteur*/
```
> [!important]
>
> `nom: valeur;`
>
> un nom de déclaration est **toujours** suivi de deux points `:`, suivi de la valeur, puis d'un point virgule `;` 

### Valeurs

Une valeur peut être définie: 
- en mots-clés: `red`
- en chiffres et unités: `200px` 
- en code de couleurs: `rgb(255,0,0)` 

## Application

Une fois le sélecteur et les déclarations mis ensemble cela nous donne:

```css
/*une seule déclaration*/
h1 { 
  color: red; 
}

/*plusieurs déclarations*/
h1 { 
  font-size: 2rem;
  line-height: 1.2;
  text-decoration: underline;
  color: blue; 
}

```
### Déclarer un style à un sélecteur de classe:
Dans le fichier html:
```html
<h2 class="section-title">Titre de section</h1>
```

Dans le fichier css:
```css
.section-title{
    font-size: 2rem;
    color: pink;
}
```

### Déclarer un style à un sélecteur d'identifiant:
Dans le fichier html:
```html
<h1 id="page-title">Grand Titre</h1>
```

Dans le fichier css:
```css
.page-title{
    font-size: 1rem;
    color: pink;
}
```
### Déclarer un style avec des combinateurs:

#### Sélecteur de voisin direct 

`A + B`
Permet de sélectionner les nœuds qui suivent immédiatement un élément donné.

#### Sélecteur de voisins 

`A ~ B`
Permet de sélectionner les nœuds qui suivent un élément et qui ont le même parent.

#### Sélecteur d'éléments enfants 

`A > B`
Permet de sélectionner les nœuds qui sont des enfants directs d'un élément donné. 

#### Sélecteur d'éléments descendants 

`A B`
Permet de sélectionner les nœuds qui sont des descendants (pas nécessairement des enfants directs) d'un élément donné.

Plus d'informations sur les sélecteurs ici: [Mozilla Web Docs: Sélecteurs CSS](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_selectors)


## Connecter un fichier CSS à un fichier HTML

Un fichier CSS possède une extension de fichier en `.css` et contient uniquement des sélecteurs et déclarations. Il est bonne pratique de créer dans un même dossier un fichier CSS `style.css`, séparé du fichier `index.html` pour stocker tout cela. 

Dans ce cas, il faut mettre dans la `head` du `ìndex.html` la balise suivante:
```html
<link rel="stylesheet" href="/style.css">
```


## Ressources Externes CSS
- [CSS Tricks](https://css-tricks.com/)
- [MDN](https://developer.mozilla.org/fr/docs/Web/CSS)