# Etapa 1: Construcción de la aplicación con Node.js
FROM node:18-alpine AS builder


# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app


# Copia los archivos package.json y package-lock.json
COPY package.json package-lock.json ./


# Verifica que los archivos se copiaron correctamente
RUN echo "Lista de archivos en /app" && ls -alh /app


# Instala las dependencias utilizando npm ci (para producción)
RUN npm install


# Copia el resto de los archivos de la aplicación
COPY . .

# Copiar proxy.conf.json
COPY proxy.conf.json ./proxy.conf.json

# Construye la aplicación Angular para producción
RUN npm run build -- --configuration production


# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine


# Copia los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist/prueba-tecnica-front-md/browser /usr/share/nginx/html


# Expone el puerto 80
EXPOSE 80


# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
