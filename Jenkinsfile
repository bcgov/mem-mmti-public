pipeline {
    agent any
    tools {
        nodejs 'Node 6.x'
    }
    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }
        stage('Install') {
            steps {

                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
