---
title: Créer un serveur local
draft: false
tags:
- essentiels
- avancé
---

Un serveur local permet de facilement tester son site internet sur mobile par exemple, sans avoir besoin de le mettre en ligne.

# Ouvrir une fenêtre de Terminal dans le dossier du site

Ouvrir une fenetre de Terminal dans Visual Studio Code ou Terminal

Taper `cd` (signifie "Changer de dossier") puis glisser le dossier de travail de votre site dans la ligne de commande

La ligne de commande ressemble à ça:

```
cd /Users/userName/SitesInternet/MonSite
```

Presser la touche `enter`

# Lancer le serveur

Taper la ligne suivante dans le Terminal

```
python -m SimpleHTTPServer
```

Cela ne fonctionne que si vous avez Python 2 d'installé

Si vous avez Python3:

```
python3 -m http.server
```

Le résultat après avoir lancé la commande ressemble à:

```
Serving HTTP on 0.0.0.0 port 8000 ...
```

Cela veut dire que vous pouvez tapez dans votre navigateur l'adresse `localhost:8000`

Plus d'informations sur le site de [Mozilla Developper](https://developer.mozilla.org/fr/docs/Learn/Common_questions/Tools_and_setup/set_up_a_local_testing_server)

# Options supplémentaires

Tous les appareils connectés au même wifi peuvent accéder à votre serveur local.

Pour voir votre IP: allez dans préférences systèmes > Wifi > Détails 

Prenez votre adresse IP, pas celle de votre routeur.

Sur d'autres devices, tapez l'adresse IP suivi du port local de votre serveur: `0.0.0.0:8000`

