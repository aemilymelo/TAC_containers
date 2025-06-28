# Imagem base com Node.js
FROM node:18-alpine
WORKDIR /usr/src/app

# Copia os arquivos de dependências e instala
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 3001

# Comando para iniciar a aplicação
CMD [ "npm", "run", "dev" ]