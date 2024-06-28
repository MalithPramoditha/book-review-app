pipeline {
    agent any 
    
    stages { 
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'master', url: 'https://github.com/MalithPramoditha/book-review-app.git'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t malithpramoditha/book-review-app:%BUILD_NUMBER% .'
            }
        }
        
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-password', variable: 'dockerhub_password')]) {
                    script {
                        bat "docker login -u malithpramoditha -p %dockerhub_password%"
                    }
                }
            }
        }
        
        stage('Push Image to Docker Hub') {
            steps {
                bat 'docker push malithpramoditha/book-review-app:%BUILD_NUMBER%'
            }
        } 
    }
    
    post {
        always {
            bat 'docker logout'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
