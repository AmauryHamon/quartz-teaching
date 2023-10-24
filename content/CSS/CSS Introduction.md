---
title: CSS Introduction
draft: false
tags:
  - débutant
  - essentiels
  - CSS
---

## CSS: Cascading Style Sheets

Le CSS fait parti des trois languages de programmation pour le web avec le [[HTML]] et le [[Javascript]].

Si l'on utilise la métaphore d'une maison, on peut imaginer les trois langages comme répondant aux affirmations suivantes:
- HTML (Hypertext Markup Language): Quelle est la structure de la maison et ce qu'elle contient? Les portes, fenêtres, pièces…
- CSS (Cascading Style Sheets): A quoi ressemble la maison? Les peintures, textiles, revêtements…
- JS (Javascript): Comment utilise-t'on la maison? Le chauffage, la lumière…

On utilise le CSS pour mettre en forme graphiquement le site internet: définir les couleurs, la typographie, adapter le design au format des navigateurs sur ordinateur, tablette, téléphone.

---

## Sélecteurs

Pour se servir du CSS, il faut définir la balise HTML que l'on veut styliser. Pour cela, on utilise des sélecteurs. Un sélecteur en CSS peut être un nom de **balise**, un **id** ou une **class** (cf. attributs html)

```css
h1 { }      /* balise de titre h1 */
#logo { }   /* balise d'id 'logo'*/
.news { }   /* balise de class 'news'*/
```

Chaque sélecteur est suivi d'accolades `{}` à l'intérieur desquelles on peut mettre les styles à appliquer.

---

## Déclarations

Pour appliquer un style à un élément, on doit le déclarer. Une **déclaration** consiste d'une propriété et sa valeur, qui s'écrivent de la manière suivante:

```css
color: red; /*on déclare la propriété 'couleur' de valeur 'rouge' au sélecteur*/
```
> [!important]
>
> `nom: valeur;`
>
> Dans une déclaration CSS, un nom de propriété est **toujours** suivi de deux points `:`, suivi de la valeur, puis d'un point virgule `;` 

### Valeurs

Une valeur peut être définie: 
- en mots-clés: `red`
- en chiffres et unités: `200px` 
- en code de couleurs: `rgb(255,0,0)` 

---

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

### Trois manières d'appliquer du CSS à du HTML
1. Inline: en utilisant un attribut style dans une balise HTML
2. Interne: en utilisant un élément style dans la section head de votre fichier HTML
3. Externe: en utilisant un fichier .CSS distinct, relié à votre fichier HTML

```html
<!-- Dans un fichier HTML -->
<!-- 1. Inline -->
<h1 style="color:red">Titre</h1>

<!-- 2. Interne -->
<head>
  <style>
    h1 {
      color:red;
    }
  </style>
</head>

<!-- 3. Externe -->
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css">
  </head>
</html>

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
>[!Attention]
>
> un ID prend le dessus sur une CLASS (voir plus bas)


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

#### !important

Il est possible d'appliquer à la suite d'une valeur `!important` pour que celle-ci prenne la plus haute spécificité. Ce qui écrase toutes les autres valeurs à priori plus spécifique initialement. Ceci n'est cependant pas une bonne pratique, et doit être évité à tout prix, sauf en cas de dernier recours.

---

## Cascade

Le CSS fonctionne en cascade, c'est-à-dire que les styles définis plus tard prennent le dessus sur ceux définis plus tôt dans un fichier CSS.

Il est bonne pratique d'être moins spécifique dans votre CSS. Utilisez plutôt les HTML TAGS et les CLASS que les ID pour styliser, et utilisez les combinateurs uniquement en cas de dernier recours.

Un élément visé plus spécifiquement qu'un autre écrasera le style de celui moins spécifique.

Par défaut, la dernière déclaration est lue par l'ordinateur. Si vous répétez accidentellement la même déclaration et différentes valeurs, seulement la dernière valeur sera rendue.

---

## Box Model

Tous les éléments HTML d'un site peuvent être considéré comme des boites. On parle de *Box Model* en CSS lorsqu'on parle de la mise en page et design d'un site. Cela nous permet de définir des bordures à des éléments, l'espace entre chaque, etc.

- Margin: espace externe autour d'un élément
- Border: bordure autour des marges internes d'un élément
- Padding: espace interne autour du contenu d'un élément.

![Exemple de Box Model provenant de l'inspecteur web](https://www.simplilearn.com/ice9/free_resources_article_thumb/CSS-Box-Model.png)

---

## Connecter un fichier CSS à un fichier HTML

Un fichier CSS possède une extension de fichier en `.css` et contient uniquement des sélecteurs et déclarations. Il est bonne pratique de créer dans un même dossier un fichier CSS `style.css`, séparé du fichier `index.html` pour stocker tout cela. 

Dans ce cas, il faut mettre dans la `head` du `ìndex.html` la balise suivante:
```html
<link rel="stylesheet" href="/style.css">
```



---

## Pages liées
[[CSS-Cheatsheet]]

---

## Ressources Externes CSS
- [CSS Tricks](https://css-tricks.com/)
- [MDN](https://developer.mozilla.org/fr/docs/Web/CSS)