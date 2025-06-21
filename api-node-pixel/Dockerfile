# Usa uma imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia somente os arquivos de dependência primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instala as dependências
RUN npm install --legacy-peer-deps

# Copia a pasta 'src' do seu computador para dentro da pasta 'src' no container
COPY src ./src

# Expõe a porta que a API usa
EXPOSE 3001

# --- A CORREÇÃO FINALÍSSIMA ---
# Comando para iniciar o servidor, apontando para o caminho correto: src/index.js
CMD [ "node", "src/index.js" ]