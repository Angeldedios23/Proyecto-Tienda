pipeline {
    agent any
    
    environment {
        // Adjusted for correct capitalization
        PROJECT_DIR = 'Proyect/Proyect'
        BACKEND_DIR = "${PROJECT_DIR}/backend"
        FRONTEND_DIR = "${PROJECT_DIR}/frontend"
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
                        git url: 'https://github.com/Angeldedios23/Proyecto-Tienda.git',
                            branch: 'master',
                            credentialsId: 'github-credentials'
                        
                        // Debug: List directory contents
                        bat 'dir /s'
                    }
                }
            }
        }
        
        stage('Validate Directories') {
            steps {
                script {
                    // Check if directories exist before proceeding
                    bat """
                        if not exist "${PROJECT_DIR}" (
                            echo "Project directory not found"
                            exit 1
                        )
                        if not exist "${BACKEND_DIR}" (
                            echo "Backend directory not found"
                            exit 1
                        )
                        if not exist "${FRONTEND_DIR}" (
                            echo "Frontend directory not found"
                            exit 1
                        )
                    """
                }
            }
        }
        
        stage('Build Backend') {
            steps {
                script {
                    dir(PROJECT_DIR) {
                        bat 'docker build -t "my-backend:%BUILD_NUMBER%" -f backend/Dockerfile backend'
                    }
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                script {
                    dir(BACKEND_DIR) {
                        bat '''
                            docker run --rm my-backend:%BUILD_NUMBER% npm install
                            docker run --rm my-backend:%BUILD_NUMBER% npm test
                        '''
                    }
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                script {
                    dir(PROJECT_DIR) {
                        bat 'docker build -t "my-frontend:%BUILD_NUMBER%" -f frontend/Dockerfile frontend'
                    }
                }
            }
        }
        
        stage('Test Frontend') {
            steps {
                script {
                    dir(FRONTEND_DIR) {
                        bat '''
                            docker run --rm my-frontend:%BUILD_NUMBER% npm install
                            docker run --rm my-frontend:%BUILD_NUMBER% npm run build
                        '''
                    }
                }
            }
        }
        
        stage('Deploy') {
            environment {
                GCLOUD_CREDS = credentials('gcloud-service-key')
            }
            steps {
                script {
                    // Activate Google Cloud service account
                    bat 'gcloud auth activate-service-account --key-file=%GCLOUD_CREDS%'
                    bat 'gcloud config set project my-project-id'
                    
                    // Push Docker images to Google Container Registry
                    bat """
                        docker tag my-backend:%BUILD_NUMBER% gcr.io/my-project-id/backend:%BUILD_NUMBER%
                        docker tag my-frontend:%BUILD_NUMBER% gcr.io/my-project-id/frontend:%BUILD_NUMBER%
                        
                        docker push gcr.io/my-project-id/backend:%BUILD_NUMBER%
                        docker push gcr.io/my-project-id/frontend:%BUILD_NUMBER%
                    """
                    
                    // Deploy to Kubernetes
                    dir(PROJECT_DIR) {
                        bat 'kubectl apply -f deployment/backend-deployment.yaml'
                        bat 'kubectl apply -f deployment/frontend-deployment.yaml'
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Cleanup
            cleanWs()
            bat """
                docker rmi my-backend:%BUILD_NUMBER% -f
                docker rmi my-frontend:%BUILD_NUMBER% -f
                docker rmi gcr.io/my-project-id/backend:%BUILD_NUMBER% -f
                docker rmi gcr.io/my-project-id/frontend:%BUILD_NUMBER% -f
            """
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check the logs above for details.'
        }
    }
}