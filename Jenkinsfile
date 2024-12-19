pipeline {
    agent any
    environment {
        // Variables de entorno ajustadas a la estructura
        BASE_DIR = 'proyect/proyect' // Ruta base para backend y frontend
        BACKEND_DIR = 'proyect/proyect/backend'
        FRONTEND_DIR = 'proyect/proyect/frontend'
    }
    stages {
        stage('Checkout Code') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
                        git url: 'https://github.com/Angeldedios23/Proyecto-Tienda.git',
                            branch: 'master',
                            credentialsId: 'github-credentials'
                    }
                }
            }
        }
        stage('Build Backend') {
            steps {
                script {
                    dockerImageBackend = docker.build("my-backend:${env.BUILD_ID}", "--file ${BACKEND_DIR}/Dockerfile ${BACKEND_DIR}")
                }
            }
        }
        stage('Test Backend') {
            steps {
                script {
                    dockerImageBackend.inside("-w /workspace") {
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Build Frontend') {
            steps {
                script {
                    dockerImageFrontend = docker.build("my-frontend:${env.BUILD_ID}", "--file ${FRONTEND_DIR}/Dockerfile ${FRONTEND_DIR}")
                }
            }
        }
        stage('Test Frontend') {
            steps {
                script {
                    dockerImageFrontend.inside("-w /workspace") {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'gcloud-service-key', variable: 'GCLOUD_SERVICE_KEY')]) {
                        sh 'gcloud auth activate-service-account --key-file $GCLOUD_SERVICE_KEY'
                        sh 'gcloud config set project my-project-id'
                        
                        // Build and push Docker images
                        sh "gcloud builds submit --tag gcr.io/my-project-id/backend:${env.BUILD_ID} ${BACKEND_DIR}"
                        sh "gcloud builds submit --tag gcr.io/my-project-id/frontend:${env.BUILD_ID} ${FRONTEND_DIR}"
                        
                        // Deploy to Kubernetes
                        sh 'kubectl apply -f deployment/backend-deployment.yaml'
                        sh 'kubectl apply -f deployment/frontend-deployment.yaml'
                    }
                }
            }
        }
    }
}
