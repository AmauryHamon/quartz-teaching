---
title: HTML Cheatsheet
draft: false
tags:
  - cheatsheet
  - débutant
  - HTML
---

Source: [Site web de Paul Copplestone](https://paul.copplest.one/knowledge/tech/html-cheatsheet.html)

## Document

```html
<!DOCTYPE html> <!-- Spécifier que le document est en HTML5  -->
<html></html> <!-- contient la page entière  -->
<head></head> <!-- Pour les metadata de la page  -->
<body></body> <!-- Contient tout ce qui est visible dans la page  -->
```
<details>
<summary>Ouvrir l'exemple</summary>

```html
<!DOCTYPE html>
<html>
    <head>
        <!-- Metadata ici -->
    </head>
    <body>
        <!-- Contenu visible ici -->
    <body>
</html>
```

</details>

---

## Structure 

```html
<nav></nav> <!-- Conteneur pour votre navigation  -->
<section></section> <!-- Sections  -->
<div></div> <!-- Balise pour grouper des éléments -->
<span></span> <!-- Balise pour envelopper des éléments alignés -->
<footer></footer> <!-- Conteneur pour votre bas de page  -->
```
<details>
<summary>Ouvrir l'exemple</summary>

```html
<body>
    <nav></nav>
    <section>
        <div>Some content<div>
        <div>Some other content<div>
    </section>
    <section>
        <div>
            <span>More</span> <span>content</span>
        <div>
    </section>
    <footer>
        <div>Logo</div>
        <div>Links</div>
    </footer>
<body>
```

</details>

---

## Contenu

### Titrages

```html
<h1>Heading 1</h1>  <!-- Un seul dans la page, titre de page -->
<h2>Heading 2</h2>  <!-- Titre de section -->
<h3>Heading 3</h3>  <!-- Titres de sous-section -->
<h4>Heading 4</h4>  <!-- ... -->
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

### Body content

```html
<p>Paragraphe</p>
<strong>Texte Bold</strong>
<em>Texte Italic</em>
<blockquote>Une citation/callout</blockquote>
<code>Ligne de code</code>
<pre>A bloc multiligne de code</pre>
<br> <!-- Un saut de ligne -->
<hr> <!-- Une barre horizontale -->

```

### Balises spéciales

```html
<!-- Liens (Anchor) -->
<a href="/your/web/page">Link name</a> <!-- Lien vers une page interne à votre site  -->
<a href="http://example.com">Link name</a> <!-- Lien vers une page externe sur le web  -->


<!-- Images -->
<img src="/your/image.jpg" alt="Some image description" /> <!-- Une image stockée sur votre site  -->
<img src="https://placekitten.com/300/300" alt="A cute cat" /> <!-- Une image stockées sur un autre site -->

```
Pour faire un lien vers une autre section de contenu dans une même page voir [[Scroll to Anchor]]

### Listes

```html
<li>List item 1</li> <!-- Entrée de Liste  -->

<!-- Liste non-ordonnée (à puces) -->
<ul>
    <!-- Items  -->
</ul> 

<!-- Liste ordonnée (à chiffres/lettres, etc.) -->
<ol>
    <!-- Items  -->
</ol> 
```

<details>
<summary>Ouvrir l'exemple</summary>

```html
<ul>
    <li>List item 1</li>
    <li>List item 2</li>
</ul>
<ol>
    <li>List item 1</li>
    <li>List item 2</li>
</ol>
```

</details>

---

## Head

```html
<title>Titre de votre page</title> <!-- visible dans l'onglet de votre browser -->
<meta name=“description“ content=“Description de votre site" />
<meta name=“keywords“ content=“keywords décrivant votre site“ />
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Styling -->
<link rel="stylesheet" type="text/css" href="style.css"> <!-- Lien vers css externe  -->
<style>
    /* Your own custom rules */
</style>

 <!-- Javascript  -->
<script src="some/script.js"></script>  <!-- Lien vers js externe  -->
<script>
    // Your own Javascript
</script>
```