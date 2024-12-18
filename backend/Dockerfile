# Usa una versión de Node.js que soporte el módulo 'node:url'
FROM node:16-alpine

# Crea un usuario no root con UID 1001
RUN adduser -D -u 1001 appuser

# Establece el directorio de trabajo y copia los archivos como root
WORKDIR /usr/src/app
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Cambia el propietario de todos los archivos y directorios a appuser
RUN chown -R appuser /usr/src/app

# Cambia al usuario no root
USER appuser

# Expone el puerto (ajusta según sea necesario)
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]