// pipeline {
//     agent any

//     environment {
//         NODEJS_HOME = tool name: 'NodeJS', type: 'NodeJS'
//         PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
//     }

//     stages {   
//         stage('SCM Checkout') {
//             steps {
//                 retry(3) {
//                     git branch: 'main', url: 'https://github.com/MalithPramoditha/book-review-app.git'
//                 }
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 bat 'npm install'
//             }
//         }

//         stage('Run Tests') {
//             steps {
//                 bat 'npm test'
//             }
//         }

//         stage('Build Docker Image') {
//             steps {  
//                 bat 'docker build -t malithpramoditha/book-review-app:%BUILD_NUMBER% .'
//             }
//         }

//         stage('Deploy to Docker') {
//             steps {
//                 bat 'docker run -d -p 3000:3000 malithpramoditha/book-review-app:%BUILD_NUMBER%'
//             }
//         }

//         stage('Login to Docker Hub') {
//             steps {
//                 withCredentials([string(credentialsId: 'dockerhub-password', variable: 'dockerhub_password')]) {
//                     script {
//                         bat "docker login -u malithpramoditha -p %dockerhub_password%"
//                     }
//                 }
//             }
//         }

//         stage('Push Image to Docker Hub') {
//             steps {
//                 bat 'docker push malithpramoditha/book-review-app:%BUILD_NUMBER%'
//             }
//         }    
//     }

//     post {
//         always {
//             bat 'docker logout'
//         }
//         success {
//             echo 'Pipeline executed successfully!'
//         }
//         failure {
//             echo 'Pipeline failed!'
//         }
//     }
// }


pipeline {
    agent any 
    
    stages { 
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/MalithPramoditha/book-review-app.git'
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
    }
}
