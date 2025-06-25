# Usamos a imagem oficial do Jenkins como base
FROM jenkins/jenkins:lts-jdk17

# Mudamos para o usuário root para poder instalar pacotes
USER root

# Instalamos o Docker-Compose
RUN curl -L "https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

# Devolvemos para o usuário jenkins para segurança
USER jenkins