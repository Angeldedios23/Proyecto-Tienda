# Usar una versión más reciente de Node.js (puedes elegir la que mejor se adapte a tu proyecto)
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración de dependencias primero para aprovechar el caché
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Comando para servir la aplicación
CMD ["npx", "serve", "-s", "build"]
