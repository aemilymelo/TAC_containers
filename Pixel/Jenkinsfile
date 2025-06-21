pipeline {
    agent any

    environment {
        // Nome da imagem Docker que será gerada (ex: tac/api-spring)
        DOCKER_IMAGE_NAME = "tac/api-spring"
        // Nome do container que será criado (deve ser único)
        CONTAINER_NAME = "api-spring-jenkins-deploy"
        // URL do seu repositório Git
        GIT_REPO_URL = "https://github.com/aemilymelo/pixel-containers.git"
    }

    stages {
        stage('1. Limpeza do Ambiente Antigo') {
            steps {
                script {
                    echo "Limpando container e imagem anteriores..."
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                    sh "docker rmi ${DOCKER_IMAGE_NAME} || true"
                }
            }
        }

        stage('2. Build da Imagem Docker') {
            steps {
                script {
                    echo "Construindo a imagem Docker a partir de Pixel/Dockerfile..."
                    // 'dir' muda o diretório de trabalho para a pasta correta
                    dir('Pixel') {
                        sh "docker build -t ${DOCKER_IMAGE_NAME} ."
                    }
                }
            }
        }

        stage('3. Inicialização do Container') {
            steps {
                echo "Iniciando o novo container..."
                // Mapeamos para a porta 8091 para não conflitar com a API do docker-compose (8080) e o Jenkins (8090)
                sh "docker run -d --name ${CONTAINER_NAME} -p 8091:8080 ${DOCKER_IMAGE_NAME}"
            }
        }
    }

    post {
        always {
            mail to: 'seu-email@exemplo.com',
                 subject: "Jenkins Job: ${currentBuild.fullDisplayName} - ${currentBuild.currentResult}",
                 body: "O Job ${env.JOB_NAME} foi concluído com o status: ${currentBuild.currentResult}.\n\nPara mais detalhes, acesse: ${env.BUILD_URL}"
        }
    }
}