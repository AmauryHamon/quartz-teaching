---
title: HTML Introduction
draft: false
tags:
  - essentiels
  - débutant
---

## HTML: Hypertext Markup Language

Le HTML, est l'élément de base pour la création d'un site web. Il fait parti des trois languages de programmation pour le web avec le [[CSS]] et le [[Javascript]].

Si l'on utilise la métaphore d'une maison, on peut imaginer les trois langages comme répondant aux affirmations suivantes:
- HTML (Hypertext Markup Language): Quelle est la **structure** de la maison et ce qu'elle **contient**? Les portes, fenêtres, pièces…
- CSS (Cascading Style Sheets): A quoi ressemble la maison? Les peintures, textiles, revêtements…
- JS (Javascript): Comment utilise-t'on la maison? Le chauffage, la lumière…

En général, nous utilisons le HTML pour créer une hiérarchie dans la page web en mettant des blocs à l'intérieur d'autres blocs. Ces blocs sont appelés des **balises**

## Balises
Le HTML est constitué de balises de toutes sortes. Selon leur types, elles aident à définir le type de contenu qui se trouve à l'intérieur.

Un exemple simple d'élément HTML est un titre, écrit comme ceci:
```html
<h1>Titre</h1>
<!-- balise d'ouverture, contenu, balise de fermeture -->
```

Une balise html englobe généralement du contenu. On observe donc ci-dessus une balise d'ouverture `<h1>` et une balise de fermeture `</h1>`. Elles sont identiques, sauf que la balise fermante comporte une barre oblique devant son nom.

Certaines balises se ferment d'eux-mêmes, par exemple une image. Elle ne se compose que d'une seule balise et d'une barre oblique à la fin.

```html
<img src="image.jpg" />
```

Un aspect important du HTML est la possibilité d'imbriquer des éléments. Cela signifie que nous pouvons mettre autant qu'on veut de balises à l'intérieur d'autres balises.

```html
<main>
  <article>
    <section>
      <h1>Titre</h1>
    </section>
  </article>
</main>
```

### Balises courantes
```html
<h1>, <h2>, <h3>  <!-- Balises de titres-->
<p>               <!-- Balises de paragraphe-->
<img>             <!-- Balises d'image-->
<a>               <!-- Balises de lien-->
<ul>              <!-- Balises de liste non-ordonnée-->
<ol>              <!-- Balises de liste ordonnée-->
<li>              <!-- Balises d'élément de liste-->
<div>             <!-- Balises de conteneur générique en bloc -->
<span>            <!-- Balises de conteneur générique en ligne (inline) pour les contenus phrasés-->

```

## Head & Body

Dans un document HTML, nous devons toujours commencer par définir qu'il s'agit d'un document HTML:

```html
<!DOCTYPE html>
<html lang="fr">
```

Après la définition, nous pouvons définir la `<head>`. C'est là que nous mettrons les éléments non visibles d'une page comme le titre d'onglet dans le navigateur, les méta-informations, les liens vers les scripts et les styles.

```html
<head>
  <meta charset="utf-8" />
  <title>Mon Premier Site Web</title>
</head>
```

Enfin nous avons le `<body>`. C'est là que nous mettons tous les éléments visibles que nous voulons montrer au visiteur.

```html
<body>
  <h1>Mon Premier Site Web</h1>
</body>
</html>
```

La définition, la `<head>` et le `<body>` sont obligatoires pour toutes les documents HTML.

> [!hint] Astuce
> 
> Dans votre editeur du code (Visual Studio Code par exemple), après avoir créé un nouveau fichier html, vous pouvez écrire `html:5` ou `!` et appuyer sur la touche `tab ↹` pour insérer une base de document html.
> ```html
> <!DOCTYPE html>
> <html lang="en">
> <head>
>    <meta charset="UTF-8">
>    <meta name="viewport" content="width=device-width, initial-scale=1.0">
>    <title>Document</title>
> </head>
> <body>
>    
> </body>
> </html>
>```


## Attributs
Les attributs nous permettent d'ajouter des informations spécifiques à une balise. La syntaxe est comme ceci: `attribut=""`

Il existe à la fois des attributs universels qui peuvent être ajoutés à n'importe quelle balise, et des attributs spécifiques qui ne s'appliquent qu'à certaines balises.

Nous pouvons ajouter des identificateurs à chaque balise en utilisant soit une **CLASS**, soit un **ID**.

```html
<h1 id="logo">Nom</h1>

<section class="news">1</section>
<section class="news">2</section>
<section class="news">3</section>
```

Les ID sont pour des balises uniques qui n'apparaissent qu'une fois dans une page, et les CLASS sont pour les éléments qui apparaissent plusieurs fois mais qui ne contiennent pas le même contenu.

Certains attributs sont spécifiques aux balises comme les images <img> et les liens <a>.

```html
<img src="file.jpg" />

<a href="http://eracom.ch">ERACOM</a>
```

Dans une balise d'image, nous souhaitons créer un lien vers le fichier qu'elle doit afficher avec l'attribut `src=""` (source), alors qu'une balise de lien doit contenir le lien vers lequel on se rend lorsqu'on clique dessus avec `href=""` (hypertext reference).

## Sémantique

En HTML, nous avons ce que nous appelons des balises sémantiques. Cela signifie que la balise est nommée par ce qu'elle est censée contenir. Par exemple `<img>` est une image, `<video>` une vidéo, `<audio>` un audio, etc.

Cela nous permet de mieux comprendre la structure du contenu et aide également les personnes malvoyantes, par exemple, à utiliser le site.

- `<header>`
Ici, vous pouvez mettre les éléments que vous souhaitez voir apparaître en haut. Par exemple, un logo ou l'élément de nav.

- `<nav>`
Utilisez ceci pour votre menu ou d'autres éléments de navigation.

- `<main>`
Mettez les parties principales de votre site web dans celui-ci.

- `<article>`
Mettez les parties principales de votre site web dans celui-ci.

- `<section>`
Utilisez cette fonction pour créer une séparation d'un type de contenu spécifique.

- `<aside>`
Utilisez-le pour le contenu qui est lié à un article mais qui n'est pas le contenu principal.

- `<footer>`
Utilisez-le pour le contenu au bas du site web.

Voici une exemple d'une page web qui utilise les balises sémantiques:

```html
...
<body>
  <header>
    <nav></nav>
  </header> 
  
  <main>
    <article></article>
    <aside></aside>
  </main> 
  
  <footer></footer> 
</body>
</html>
```