pipeline {

    agent any

    tools {
      nodejs 'NodeJS 24.0.0'
    }

    environment {
      MONGO_URI = "mongodb://mongo:27017/sample_mflix?authSource=admin"
      MONGO_DB_CREDS = credentials('mongo-db-creds')
      MONGO_USERNAME = credentials('mongo-db-username')
      MONGO_PASSWORD = credentials('mongo-db-password')
    }

    options {
      disableConcurrentBuilds abortPrevious: true
      disableResume()
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
            options { timestamps() }
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
                 sh '''
                    echo "MONGO_CREDS - $MONGO_DB_CREDS"
                    echo "USERNAME - $MONGO_DB_CREDS_USR"
                    echo "PASSWORD - $MONGO_DB_CREDS_PSW"
                    echo "USERNAME-TEXT - $MONGO_USERNAME"
                    echo "PASSWORD-TEXT - $MONGO_PASSWORD"
                    npm test
                 '''

//                 withCredentials([usernamePassword(credentialsId: 'mongo-db-creds', passwordVariable: 'MONGO_PASSWORD', usernameVariable: 'MONGO_USERNAME')]) {
//                     sh 'npm test'
//                 }
            }
        }
        stage("Code Coverage") {
            steps {
                catchError(buildResult: 'SUCCESS', message: 'OOPS! Coverage is less than 90%', stageResult: 'UNSTABLE') {
                    sh 'npm run coverage'
                }

//                 withCredentials([usernamePassword(credentialsId: 'mongo-db-creds', passwordVariable: 'MONGO_PASSWORD', usernameVariable: 'MONGO_USERNAME')]) {
//                     catchError(buildResult: 'SUCCESS', message: 'OOPS! Coverage is less than 90%', stageResult: 'UNSTABLE') {
//                         sh 'npm run coverage'
//                     }
//                 }
            }
        }
    }
    post{
        always {
            junit allowEmptyResults: true, stdioRetention: 'ALL', testResults: 'test-results.xml'

            publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    icon: '',
                    keepAll: true,
                    reportDir: 'coverage/lcov-report/',
                    reportFiles: 'index.html',
                    reportName: 'Coverage HTML Report',
                    reportTitles: ''
                ])
        }
    }
}