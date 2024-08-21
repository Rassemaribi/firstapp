# Étape 1 : Construction de l'application Angular
FROM node:20 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier le package.json et le package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le contenu du projet dans le répertoire de travail
COPY . .

# Construire l'application Angular pour la production
RUN npm run build --prod

# Étape 2 : Serveur de l'application avec Apache
FROM nginx:alpine



# Copier les fichiers construits de l'étape 1 vers le répertoire d'Apache
COPY --from=build /app/dist/first-app /usr/share/nginx/html

# Exposer le port 80 pour le serveur Apache
EXPOSE 80

# Démarrer Apache
CMD ["nginx", "-g", "daemon off;"]

