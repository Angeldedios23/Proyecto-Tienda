# Usa una versión de Node.js que soporte el operador de asignación nula
FROM node:14.6.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de package y package-lock primero para aprovechar el caché de Docker
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto que usa la aplicación
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]