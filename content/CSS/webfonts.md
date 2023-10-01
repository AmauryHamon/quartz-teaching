---
title: Fontes Web
draft: false
tags:
  - débutant
  - essentiels
---

Tout le monde n'a pas les mêmes polices de caractères installées sur son ordinateur, tablette ou téléphone. C'est pourquoi sur un site internet, quand on veut utiliser une police spécifique, il faut l'inclure dans les fichiers du site.

## font-family
Nous avons vu dans [[CSS Introduction]] comment déclarer des styles CSS. Pour appliquer une police à un style, on utilise la déclaration `font-family`.

```css
p {
  font-family: Helvetica, Arial, sans-serif;
}
```

`font-family` peut recevoir plusieurs noms de famille de polices, ce qui permet au navigateur de charger la première valeur disponible trouvée. Il est bonne pratique de toujours prévoir au minimum une seconde valeur au cas où un bug de chargement empêcherait d'utiliser la fonte choisie.

Ci-dessus, si Helvetica n'était toutefois pas disponible, alors Arial serait utilisé. 

## Fontes Web-safe

Il existe des fontes dont la disponibilité est garantie sur tous les systèmes courants — c'est les polices dites **Web-safe**. Mais il en existe qu'une partie. Arial en fait partie, parmi d'autres: Arial, courier, georgia, times new roman, trebuchet, verdana. 

On peut aussi utiliser des noms générique: sans-serif, serif, monospace, cursive, fantasy

La pile de polices dans `font-family` vous permet de préciser la police préférable, puis la police alternative sûre pour le Web, puis la police par défaut du système, mais cela induit du travail supplémentaire de tests pour s'assurer que le désign reste correct avec chaque police, etc.






## fichier

## @font-face

