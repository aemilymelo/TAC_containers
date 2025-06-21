# Estágio de Build: usa o Node para compilar os arquivos do React/Next.js
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Estágio de Produção: usa um servidor web leve (NGINX)
FROM nginx:stable-alpine

# --- A CORREÇÃO FINAL ESTÁ AQUI ---
# Copiamos o resultado do build do Next.js (a pasta .next) e a pasta public
COPY --from=build /app/public /usr/share/nginx/html/public
COPY --from=build /app/.next /usr/share/nginx/html/.next