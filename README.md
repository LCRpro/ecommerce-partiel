
# 🚀 Lancer le Projet E-commerce

## ⚙️ Prérequis

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🐳 Lancer le Projet avec Docker

1️⃣ **Cloner le dépôt :**

```bash
git clone https://github.com/LCRpro/ecommerce-partiel.git
cd ecommerce-partiel
```

2️⃣ **Construire et démarrer les services :**

```bash
docker-compose up --build
```

3️⃣ **Accéder à l'application :**

- **Frontend (Angular) :** [http://localhost:4200](http://localhost:4200)
- **Backend (Nest.js API) :** [http://localhost:3000](http://localhost:3000)
- **pgAdmin (gestion PostgreSQL) :** [http://localhost:5050](http://localhost:5050)
  - **Email :** admin@admin.com
  - **Mot de passe :** admin

---

## 📦 Description du Projet

Ce projet est une application e-commerce développée avec :

- **Frontend :** Angular
- **Backend :** Nest.js (Node.js Framework)
- **Base de données :** PostgreSQL
- **Gestion des données :** pgAdmin
- **Conteneurisation :** Docker & Docker Compose

Fonctionnalités principales :

- Gestion des produits : Ajout, modification, suppression (Admin)
- Gestion des commandes : Suivi et mise à jour des statuts (Admin)
- Système de panier pour les utilisateurs
- Authentification sécurisée (Admin et Client)
- Statistiques des ventes avec des graphiques dynamiques
- ...

---

## ✅ Commandes Utiles

- **Arrêter les services :**

```bash
docker-compose down
```

- **Rebuild des services :**

```bash
docker-compose up --build
```



---



## 📬 Support

Pour toute question, contactez [LCRpro](mailto:lcariou@normandiewebschool.fr).

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d’informations.
