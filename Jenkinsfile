pipeline {

    agent any

    tools {
      nodejs 'NodeJS 24.0.0'
    }

    environment {
      MONGO_URI = "mongodb://mongo:27017/sample_mflix?authSource=admin"
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
        stage("Unit Testing") {
            steps {
                withCredentials([usernamePassword(credentialsId: 'mongo-db-creds', passwordVariable: 'MONGO_USERNAME', usernameVariable: 'MONGO_PASSWORD')]) {
                    sh '''
                        sleep 3600
                        npm test
                    '''
                }
            }
        }
    }
}