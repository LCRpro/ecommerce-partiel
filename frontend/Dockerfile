FROM node:18

WORKDIR /usr/src/app

# Installer Angular CLI globalement
RUN npm install -g @angular/cli

# Copier les fichiers de configuration
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers
COPY . .

# Build de l'application
RUN npm run build

# Servir l'application
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]
