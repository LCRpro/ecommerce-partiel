
# 🚀 Lancer le Projet E-commerce

## ⚙️ Prérequis

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🐳 Lancer le Projet avec Docker

1️⃣ **Cloner le dépôt :**

git clone https://github.com/LCRpro/ecommerce-partiel.git
cd ecommerce-partiel

2️⃣ **Construire et démarrer les services :**

docker-compose up --build

3️⃣ **Accéder à l'application :**

- **Frontend (Angular) :** http://localhost:4200
- **Backend (Nest.js API) :** http://localhost:3000
- **pgAdmin (gestion PostgreSQL) :** http://localhost:5050
  - **Email :** admin@admin.com
  - **Mot de passe :** admin

---

## ✅ Commandes Utiles

- **Arrêter les services :**

docker-compose down

