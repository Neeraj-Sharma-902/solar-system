pipeline {

    agent any

    tools {
      nodejs 'NodeJS 24.0.0'
    }

    stages {
        stage("Check Node Version") {
            steps {
                sh '''
                    node -v
                    npm -v
                '''
            }
        }
        stage("Install Dependencies") {
            steps {
                sh 'npm install --no-audit'
            }
        }
        stage("NPM Dependency Audit") {
            steps {
                sh 'npm audit --audit-level=critical'
            }
        }
    }
}