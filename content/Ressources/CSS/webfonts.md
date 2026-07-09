---
title: Fontes Web
draft: false
tags:
  - débutant
  - essentiels
  - CSS
---

Tout le monde n'a pas les mêmes polices de caractères installées sur son ordinateur, tablette ou téléphone. C'est pourquoi sur un site internet, quand on veut utiliser une police spécifique, il faut l'inclure dans les fichiers du site.

---

## font-family
Nous avons vu dans [[CSS Introduction]] comment déclarer des styles CSS. Pour appliquer une police à un style, on utilise la déclaration `font-family`.

```css
p {
  font-family: Helvetica, Arial, sans-serif;
}
```

`font-family` peut recevoir plusieurs noms de famille de polices, ce qui permet au navigateur de charger la première valeur disponible trouvée. Il est bonne pratique de toujours prévoir au minimum une seconde valeur au cas où un bug de chargement empêcherait d'utiliser la fonte choisie.

Ci-dessus, si Helvetica n'était toutefois pas disponible, alors Arial serait utilisé. 

---

## Fontes Web-safe

![Fonts websafe](https://res.cloudinary.com/practicaldev/image/fetch/s--noHn9dEy--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://stephencharlesweiss.com/static/c103501b461093cf292df89bb1cc5a64/b9e4f/web-safe-font-venn_diagram.png)

Il existe des fontes dont la disponibilité est garantie sur tous les systèmes courants — c'est les polices dites **Web-safe**. Mais il en existe qu'une partie. Arial en fait partie, parmi d'autres: Arial, courier, georgia, times new roman, trebuchet, verdana. 

On peut aussi utiliser des noms générique: sans-serif, serif, monospace, cursive, fantasy

La pile de polices dans `font-family` vous permet de préciser la police préférable, puis la police alternative sûre pour le Web, puis la police par défaut du système, mais cela induit du travail supplémentaire de tests pour s'assurer que le désign reste correct avec chaque police, etc.

---

## Fichier

Une fois que vous avez une font choisie pour votre site, récupérez le fichier. Celui-ci peut être dans différents format: `.otf`, `.woff`, `.woff2`, `.ttf`.

Pour intégrer votre font dans votre projet de site, il faut avoir ce fichier font dans le même dossier que vos fichiers HTML et CSS.

Chaque fichier font correspond à une graisse. Pour chaque nouvelle graisse à utiliser il faudra les fichiers correspondants.

---

## @font-face

`@font-face` permet de spécifier l'intégration de fichiers font dans un projet web.
Il faut pour cela déclarer au minimum `font-family` et la `src` (source) du fichier.

Il est bonne pratique de mettre ceci tout au début du fichier `style.css`.

```css
@font-face {
  font-family: "myFont";
  src: url("myFont.woff2");
}
```

Une fois votre font importée dans le css, vous pouvez l'appliquer où vous le souhaitez.

```css
p {
  font-family: "myFont", arial, sans-serif;
}
```

--- 

## Droits d'auteur

> [!attention]
>
> Attention à toujours vérifier d'avoir les droits d'utilisation d'une police avant la mise en ligne d'un projet de site web.