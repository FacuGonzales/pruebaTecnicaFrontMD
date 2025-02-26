# Usa una imagen base de Node.js para construir la aplicación
FROM node:18-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json (o yarn.lock)
COPY package.json package-lock.json ./

# Instala las dependencias
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación Angular para producción
RUN npm run build -- --configuration production

# Usa una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos de la aplicación construida desde la etapa anterior
COPY --from=builder /app/dist/prueba-tecnica-front-md/browser /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
