---
title: CSS Introduction
draft: false
tags:
  - débutant
  - essentiels
  - CSS
---

Le CSS ou ==Cascading Style Sheets== fait parti des trois languages de programmation pour le web avec le [[Ressources/1-HTML|HTML]] et le [[Ressources/3-JS|JS]].

Si l'on utilise la métaphore d'une maison, on peut imaginer les trois langages comme répondant aux affirmations suivantes:
- HTML (Hypertext Markup Language): Quelle est la structure de la maison et ce qu'elle contient? Les portes, fenêtres, pièces…
- CSS (Cascading Style Sheets): A quoi ressemble la maison? Les peintures, textiles, revêtements…
- JS (Javascript): Comment utilise-t'on la maison? Le chauffage, la lumière…

On utilise le CSS pour mettre en forme graphiquement le site internet: définir les couleurs, la typographie, adapter le design au format des navigateurs sur ordinateur, tablette, téléphone.

---

# Sélecteurs

Pour se servir du CSS, il faut définir la balise HTML que l'on veut styliser. Pour cela, on utilise des ==sélecteurs==. 

Au plus simple, un sélecteur en CSS peut être un nom de ==balise== HTML, un attribut HTML d'==id== ou de ==class== cf. [[Ressources/1-HTML/1-html-introduction#attributs|attributs html]]. Il en existe d'autre à voir plus bas.

```css
h1 { }      /* balise de titre h1 */
#logo { }   /* attribut id 'logo'*/
.news { }   /* attribut class 'news'*/
```

Chaque sélecteur est suivi d'accolades `{}` à l'intérieur desquelles on peut ==déclarer== les styles à appliquer.

---

# Déclarations

Pour appliquer un style à un élément, on doit le déclarer. Une ==déclaration== consiste d'une propriété et sa valeur, qui s'écrivent de la manière suivante:

```css
element {
  color: red; 
  /* 
    on déclare à 'element' 
    la propriété 'couleur' 
    dont la valeur est 'rouge' 
  */
}
```

> [!important] `nom: valeur;`
>
> Dans une déclaration CSS, un nom de propriété est **toujours** suivi de deux points `:`, suivi de la valeur, puis d'un point virgule `;` 

### Valeurs

Une valeur peut être définie: 
- en mots-clés: `red`
- en chiffres et unités: `200px` 
- en code de couleurs: `rgb(255,0,0)` 

---

# Appliquer le CSS

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

## Trois manières d'appliquer du CSS à du HTML
1. ==Inline==: en utilisant un attribut `style="..."` dans une balise HTML
```html:index.html
<!-- Dans un fichier HTML -->
<!-- 1. Inline -->
<h1 style="color:red">Titre</h1>
```

2. ==Interne==: en utilisant un élément `<style>...</style>` dans le `<head>...</head>` de votre fichier `.html`
```html:index.html
<!-- Dans un fichier HTML -->
<!-- 2. Interne -->
<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 {
        color:red;
      }
    </style>
  </head>
  <body>
    <h1>Titre</h1>
  </body>
</html>
```

3. ==Externe==: en utilisant un fichier `.css` distinct, relié à votre fichier `.html` par l'élément `<link rel="stylesheet" src="style.css">` dans le `<head>...</head>`

Un fichier CSS possède une extension de fichier en `.css` et contient uniquement des sélecteurs et déclarations. Il est bonne pratique de créer dans un même dossier un fichier CSS `style.css`, séparé du fichier `index.html` pour stocker tout cela. 

```html:index.html
<!-- 3. Externe -->
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Titre</h1>
  </body>
</html>

```
```css:style.css
h1 {
  color:red;
}
```



# Classe

Plutôt que styliser tous `<h2>` ou n'importe quel élément HTML de la même manière, on peut préciser un groupe de certains `<h2>` à l'aide de leur attribut `class="..."`.

La manière dont on nomme une classe est libre, à condition de ne pas commencer par un chiffre.

On remarque dans l'exemple suivant qu'un sélecteur de classe écrase le style appliqué par un sélecteur d'élément HTML.

```html:index.html
<!-- ajouter l'attribut class="..." à l'élément HTML -->
<h2>H2 sans classe</h2>
<h2 class="section-title">Titre de section</h2>
```
```css:style.css
/* pointer vers une classe en css à l'aide du . */
h2 {
  color:red;
}
.section-title{
    font-size: 2rem;
    color: pink;
}
```

[MDN: classe](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/Class_selectors)

### Déclarer un style à un sélecteur d'identifiant:

Pour styliser de manière encore plus spécifique qu'avec un sélecteur de classe, le sélecteur d'ID cible un élément en fonction de son attribut `id="..."`

On remarque ci-dessous qu'un sélecteur d'ID écrase le style appliqué par un sélecteur d'élément HTML, mais aussi de classe. 

On exprime cela par des notions d'==héritage== et de ==spécificité== d'une déclaration CSS dans la logique de ==cascade== d'une feuille de style CSS.

```html:index.html
<!-- ajouter l'attribut class="..." à l'élément HTML -->
<h2>H2 sans classe</h2>
<h2 class="section-title">Titre de section</h2>
<h2 class="section-title" id="title-specifique">Titre très spécifique</h2>
```
```css:style.css
/* pointer vers une classe en css à l'aide du . */
h2 {
  color:red;
}
.section-title{
    font-size: 2rem;
    color: pink;
}
#title-specifique {
  color: blue;
}
```

[MDN: ID](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/ID_selectors)

---

# Cascade, Héritage, Spécificité

## Cascade

La ==cascade== est la manière dont le navigateur choisit quelle déclaration appliquer lorsque plusieurs règles CSS ciblent le même élément avec la même propriété. Pour décider, le navigateur regarde dans l'ordre :

1. La ==spécificité== du sélecteur (voir plus bas) — la règle la plus spécifique gagne.
2. Si la spécificité est égale : l'==ordre d'écriture==. C'est la ==dernière== règle déclarée qui l'emporte.

Dans l'exemple ci-dessous, les deux règles ciblent `h1` avec exactement la même spécificité (un sélecteur d'élément). C'est donc la dernière, `color: blue`, qui s'applique.

```css
h1 {
  color: red;
}

h1 {
  color: blue; /* déclarée en dernier : c'est elle qui gagne */
}
```

> [!important] À spécificité égale, c'est la dernière règle qui gagne.
>
> C'est pour cela que l'ordre des règles (et des fichiers CSS) a de l'importance !

[MDN: la cascade](https://developer.mozilla.org/fr/docs/Web/CSS/Cascade)

## Héritage

Certaines propriétés CSS se transmettent automatiquement d'un élément parent à ses enfants : c'est l'==héritage==. C'est le cas des propriétés liées au texte, comme `color`, `font-family` ou `font-size`.

D'autres propriétés, comme `margin`, `padding` ou `border`, ne s'héritent ==pas== par défaut — sinon, tous les éléments de la page se retrouveraient avec la même bordure !

```html:index.html
<div class="article">
  <h2>Titre</h2>
  <p>Un paragraphe de texte.</p>
</div>
```
```css:style.css
.article {
  color: darkslategray;      /* hérité par h2 et p */
  border: 2px solid black;   /* PAS hérité : reste sur .article uniquement */
}
```

On peut forcer l'héritage d'une propriété qui ne l'est pas par défaut avec la valeur `inherit` :

```css
p {
  border: inherit; /* force p à copier la bordure de son parent */
}
```

[MDN: l'héritage](https://developer.mozilla.org/fr/docs/Web/CSS/Inheritance)

## Spécificité

Quand deux règles de spécificité ==différente== ciblent le même élément, ce n'est plus l'ordre d'écriture qui compte : c'est toujours la règle la plus ==spécifique== qui gagne, même si elle est écrite avant les autres.

On peut résumer la spécificité par ce classement, du moins spécifique au plus spécifique :

1. Sélecteur d'élément (`h2`, `p`, `div`…) — le moins spécifique
2. Sélecteur de classe (`.section-title`), d'attribut ou de pseudo-classe (`:hover`)
3. Sélecteur d'==ID== (`#title-specifique`)
4. Style ==inline== (`style="..."` directement dans le HTML)
5. `!important` — passe devant tout le reste (à éviter, voir plus bas) — le plus spécifique

C'est exactement ce qu'on a observé plus haut avec l'exemple `#title-specifique` : même si le sélecteur d'élément (`h2`) et celui de classe (`.section-title`) sont écrits ==avant== dans la feuille de style, c'est bien l'ID qui gagne, car il est plus spécifique.

[MDN: la spécificité](https://developer.mozilla.org/fr/docs/Web/CSS/Specificity)

# Sélecteurs avancés

## Déclarer un style avec des combinateurs:

### Sélecteur de voisin direct 

`A + B`
Permet de sélectionner les nœuds qui suivent immédiatement un élément donné.

### Sélecteur de voisins 

`A ~ B`
Permet de sélectionner les nœuds qui suivent un élément et qui ont le même parent.

### Sélecteur d'éléments enfants 

`A > B`
Permet de sélectionner les nœuds qui sont des enfants directs d'un élément donné. 

### Sélecteur d'éléments descendants 

`A B`
Permet de sélectionner les nœuds qui sont des descendants (pas nécessairement des enfants directs) d'un élément donné.

Plus d'informations sur les sélecteurs ici: [Mozilla Web Docs: Sélecteurs CSS](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_selectors)

### !important

Il est possible d'appliquer à la suite d'une valeur `!important` pour que celle-ci prenne la plus haute spécificité. Ce qui écrase toutes les autres valeurs à priori plus spécifique initialement. Ceci n'est cependant pas une bonne pratique, et doit être évité à tout prix, sauf en cas de dernier recours.

## Pseudo sélecteurs

Un ==pseudo-sélecteur== cible un élément selon un ==état== ou une ==position== particulière, sans avoir besoin d'ajouter une classe en HTML. Il en existe deux types :

- Les ==pseudo-classes== (un seul `:`) ciblent un ==état== : `:hover` (survolé par la souris), `:focus` (sélectionné au clavier), `:first-child` (premier enfant de son parent)…
- Les ==pseudo-éléments== (deux `::`) ciblent une ==partie== d'un élément qui n'existe pas telle quelle dans le HTML : `::before` et `::after` insèrent du contenu, `::first-line` cible uniquement la première ligne d'un texte…

L'exemple ci-dessous utilise `:hover`, une pseudo-classe, pour changer la couleur d'un bouton quand la souris passe dessus — sans une seule ligne de JavaScript.

```html:index.html
<button class="btn">Survole-moi</button>
```
```css:style.css
.btn {
  background: royalblue;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  transition: background 0.2s;
}

/* pseudo-classe : ciblée uniquement quand la souris survole le bouton */
.btn:hover {
  background: darkblue;
}
```

[MDN: pseudo-classes](https://developer.mozilla.org/fr/docs/Web/CSS/Pseudo-classes) et [MDN: pseudo-éléments](https://developer.mozilla.org/fr/docs/Web/CSS/Pseudo-elements)

---

## Box Model

Tous les éléments HTML d'un site peuvent être considéré comme des boites. On parle de *Box Model* en CSS lorsqu'on parle de la mise en page et design d'un site. Cela nous permet de définir des bordures à des éléments, l'espace entre chaque, etc.

- Margin: espace externe autour d'un élément
- Border: bordure autour des marges internes d'un élément
- Padding: espace interne autour du contenu d'un élément.

![Exemple de Box Model provenant de l'inspecteur web](https://www.simplilearn.com/ice9/free_resources_article_thumb/CSS-Box-Model.png)

---

## Ressources Externes CSS
- [CSS Tricks](https://css-tricks.com/)
- [MDN](https://developer.mozilla.org/fr/docs/Web/CSS)