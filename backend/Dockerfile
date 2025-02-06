# Utilisation de Node 20 (version stable)
FROM node:20

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Installer les dépendances système nécessaires pour compiler bcrypt
RUN apt-get update && apt-get install -y python3 make g++

# Copier les fichiers de configuration package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances Node.js
# ✅ Utilisation de --legacy-peer-deps pour éviter les conflits
RUN npm install --legacy-peer-deps

# ✅ Forcer la reconstruction de bcrypt pour l'environnement Docker
RUN npm rebuild bcrypt --build-from-source

# Copier le reste des fichiers de l'application
COPY . .

# Copier le fichier .env si nécessaire
COPY .env .env

# Compiler l'application Nest.js
RUN npm run build

# Exposer le port 3000
EXPOSE 3000

# Lancer l'application en mode développement
CMD ["npm", "run", "start:dev"]
