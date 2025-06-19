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
      SONAR_SCANNER_HOME = tool 'sonarqube-scanner 7.1.0'
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
        stage("SAST - Sonarqube Analysis") {
            steps {
                sh '''
                    $SONAR_SCANNER_HOME/bin/sonar-scanner \
                      -Dsonar.projectKey=solar-system-project \
                      -Dsonar.sources=app.js \
                      -Dsonar.host.url=http://13.233.15.158:9000 \
                      -Dsonar.token=sqp_d57ffb2617601aae766924583633b6e96b867e63
                '''
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