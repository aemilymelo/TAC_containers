    # Usa a imagem oficial do Jenkins como base.
    FROM jenkins/jenkins:lts-jdk17

    # Troca para o usuário root para poder instalar pacotes.
    USER root

    # Instala as dependências necessárias (curl para download).
    RUN apt-get update && apt-get install -y curl

    # Baixa a versão estável do Docker Compose diretamente do GitHub para o local correto.
    RUN curl -L "https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

    # Dá a permissão de execução para o arquivo baixado.
    RUN chmod +x /usr/local/bin/docker-compose

    # Volta para o usuário jenkins para a execução normal dos processos.
    USER jenkins
    