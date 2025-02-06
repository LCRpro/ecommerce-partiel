FROM node:20

WORKDIR /usr/src/app

# Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y python3 make g++

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm install
RUN npm rebuild bcrypt --build-from-source

# Copier le reste des fichiers
COPY . .

# Copier le fichier .env (optionnel si déjà inclus via docker-compose)
COPY .env .env

# Build de l'application
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
