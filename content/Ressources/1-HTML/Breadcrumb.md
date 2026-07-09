---
title: Breadcrumb (Fil d'ariane)
draft: false
tags:
  - débutant
  - HTML


---

La navigation avec un fil d'Ariane (breadcrumb) permet à un utilisateur de comprendre l'emplacement auquel il se trouve au sein du site web en fournissant un fil d'Ariane permettant de revenir à la page de départ.

![Example d'un fil d'ariane](https://developer.mozilla.org/fr/docs/Web/CSS/Layout_cookbook/Breadcrumb_Navigation/breadcrumb-navigation.png)

```html
<nav aria-label="Breadcrumb" class="breadcrumb">
    <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Category</a></li>
        <li><a href="#">Sub Category</a></li>
        <li><a href="#">Type</a></li>
        <li><span aria-current="page">Product</span></li>
    </ul>
</nav>
```

Source: [MDN Web Docs](https://developer.mozilla.org/fr/docs/Web/CSS/Layout_cookbook/Breadcrumb_Navigation)