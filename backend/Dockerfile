# Usa una versión de Node.js que soporte el operador de asignación nula
FROM node:14.6.0

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package y package-lock
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto que usa la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]