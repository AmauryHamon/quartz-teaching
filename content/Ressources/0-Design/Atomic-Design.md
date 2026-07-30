---
title: Atomic Design
draft: false
locale: fr
tags:
  - essentiels
  - débutant
  - Design
---

Comment hiérarchiser et concevoir des design systems et interfaces qui deviennent de plus en plus complexes et utilisées par de plus en plus de personnes?

D'une part, par l'usage de [[Ressources/Design/Design Token|Design Tokens]] puis d'une approche modulaire dans la conception d'interfaces comme l'*Atomic Design*.

> [!info] Définition
> Créé par [Brad Frost en 2013](https://atomicdesign.bradfrost.com/), la méthodologie de *Design Atomique* envisage la création et le maintien de *design systems* en pensant le design modulaire d’une interface digitale par composants plutôt que par pages.

Plutôt que se demander combien de pages designer, il s’agit de se demander, dans une interface combien de ==fonctionnalités== et ==composants== faut-il prévoir dans le site au total. Pourquoi? Car le web évolue, avec de plus en plus de fonctionnalités et de pages dynamiques.

# Pourquoi *Atomic*?

Brad Frost a fait un pont entre les éléments HTML du web avec le tableau périodique des éléments en chimie:

![Josh Duck, HTML Periodic Table [Source: Brad Frost](https://atomicdesign.bradfrost.com/chapter-2/)](/files/html-periodic-table.png)

Selon lui, l’idée d’un Design Atomique est:
- Chaque atome peut fonctionner indépendamment
- Ils peuvent se créer sans ordre précis
- Ces éléments peuvent se grouper pour former petit à petit, des blocs d’interfaces plus complexes, plus fonctionnels
- Cela permet une infinité de combinaisons possibles

![Brad Frost, Atomic Design Process [Source](https://atomicdesign.bradfrost.com/chapter-2/)](/files/atomic-design-process.png)


# Atome

Les atomes consituent les plus petits éléments d'interface: ils sont ==indivisibles==. Les plus courants seraient par exemple des boutons.

![Brad Frost, Exemples d'atomes [Source](https://atomicdesign.bradfrost.com/chapter-2/)](/files/atoms-form-elements.png)

# Molécule

Une molécule regroupe plusieurs atomes et permet ==une fonctionnalité précise== avec un seul objectif. Exemple: une barre de recherche.

![Brad Frost, Exemple de molécule [Source](https://atomicdesign.bradfrost.com/chapter-2/)](/files/molecule-search-form.png)


# Organisme

Lorsqu'un élément d'interface regroupe plusieurs atomes et/ou molécules, qu'il comporte ==plusieurs fonctionnalités==, et/ou qu'il répète d'autres plus petits éléments, on parle alors d'organisme. Exemple: un header de page, un menu, une barre de filtres, une grille d'articles, etc.

![Brad Frost, Exemple d'organisme [Source](https://atomicdesign.bradfrost.com/chapter-2/)](/files/organism-header.png)

# Template

On sort ici du vocabulaire de la chimie pour revenir un peu plus dans celui des interfaces.

Les templates regroupent `atomes`, `molécules` et `organismes` pour constituer la ==structure générique== d’une interface. Cette étape ne contient aucun vrai contenus.

![Brad Frost, Exemple de template [Source](https://atomicdesign.bradfrost.com/chapter-2/)](/files/template.png)

# Pages

Les pages constituent l'étape finale de la méthode de design atomique, par l'insertion dans les templates de ==vrais contenus==, ce qui constitue une maquette prête à consultation de la clientèle et developpers.

![Brad Frost, Etapes de l'Atomic Design [Source](https://atomicdesign.bradfrost.com/chapter-2/)](/files/instagram-atomic.png)

# Ressources

https://openclassrooms.com/fr/courses/5249021-initiez-vous-a-la-methode-atomic-design/5630171-decouvrez-l-atomic-design

https://atomicdesign.bradfrost.com/