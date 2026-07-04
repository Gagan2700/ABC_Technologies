pipeline {
    agent any

    tools {
        jdk 'JDK25'
        maven 'Maven-3.9.16'
    }

    environment {
        IMAGE_NAME = "abc-company"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                echo "Checking out source code from GitHub..."
                git branch: 'main',
                    url: 'https://github.com/Gagan2700/ABC_Technologies.git'
            }
        }

        stage('Verify Tools') {
            steps {
                bat 'java -version'
                bat 'mvn -version'
                bat 'docker --version'
                bat 'kubectl version --client'
            }
        }

        stage('Clean Project') {
            steps {
                bat 'mvn clean'
            }
        }

        stage('Compile Project') {
            steps {
                bat 'mvn compile'
            }
        }

        stage('Package Application') {
            steps {
                bat 'mvn package -DskipTests'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% .'
            }
        }

        stage('List Docker Images') {
            steps {
                bat 'docker images'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f k8s/deployment.yaml'
                bat 'kubectl apply -f k8s/service.yaml'
            }
        }

        stage('Verify Deployment') {
            steps {
                bat 'kubectl rollout status deployment/abc-company-deployment'
                bat 'kubectl get deployments'
                bat 'kubectl get pods'
                bat 'kubectl get services'
            }
        }
    }

    post {
        always {
            echo "Pipeline Finished."
        }

        success {
            echo "======================================="
            echo "BUILD SUCCESSFUL"
            echo "ABC Company Application Deployed"
            echo "======================================="
        }

        failure {
            echo "======================================="
            echo "BUILD FAILED"
            echo "Check Jenkins Console Output"
            echo "======================================="
        }
    }
}