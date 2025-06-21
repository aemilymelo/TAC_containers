# Usamos uma imagem base que já tem o Java (JDK 17) e o Maven para compilar
FROM maven:3.8.5-openjdk-17 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo de configuração do Maven
COPY pom.xml .

# Baixa todas as dependências do projeto
RUN mvn dependency:go-offline

# Copia todo o código-fonte do seu projeto para dentro do container
COPY src ./src

# Compila o projeto e gera o arquivo .jar
RUN mvn package -DskipTests


# Estágio de execução: agora vamos criar a imagem final, bem menor
# Usamos uma imagem base que só tem o necessário para rodar Java (JRE)
FROM openjdk:17-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo .jar gerado no estágio anterior para a imagem final
# Atenção: verifique no seu pom.xml o nome final do arquivo .jar. Ajuste se necessário.
COPY --from=build /app/target/api-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta que a aplicação Spring Boot usa (padrão é 8080)
EXPOSE 8080

# Comando para iniciar a aplicação quando o container for executado
ENTRYPOINT ["java", "-jar", "app.jar"]