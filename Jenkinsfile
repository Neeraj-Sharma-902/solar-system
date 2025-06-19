pipeline {

    agent any

    tools {
        nodejs 'NodeJS 24.0.0'
    }

    environment {
        MONGO_URI = "mongodb://localhost:27017/sample_mflix?authSource=admin"
    }

    stages {
        stage("Install Dependencies") {
            steps {
                sh 'npm install --no-audit'
            }
        }
        stage("NPM Audit") {
            steps {
                sh 'npm audit --audit-level=critical'
            }
        }
//         stage("Dependency Scanning") {
//             parallel {
//                 stage("NPM Audit") {
//                     steps {
//                         sh 'npm audit --audit-level=critical'
//                     }
//                 }
//                 stage("OWASP Dependency Check") {
//                     steps {
//                         dependencyCheck additionalArguments: '''
//                             --scan=\'./\'
//                             --out=\'./\'
//                             --format=\'ALL\'
//                             --prettyPrint''',
//                         odcInstallation: 'Dependency-check 12.1.3'
//
//                         dependencyCheckPublisher failedTotalCritical: 1, pattern: 'dependency-check-jenkins.html', skipNoReportFiles: true, stopBuild: true
//
//                         junit allowEmptyResults: true, skipOldReports: true, stdioRetention: 'ALL', testResults: 'dependency-check-junit.xml'
//
//                         publishHTML([
//                             allowMissing: true,
//                             alwaysLinkToLastBuild: true,
//                             icon: '',
//                             keepAll: true,
//                             reportDir: './',
//                             reportFiles: 'dependency-check-report.html',
//                             reportName: 'Dependency Check HTML Report',
//                             reportTitles: ''
//                         ])
//                     }
//                 }
//             }
//         }
        stage("NPM Test") {
            steps {
                withCredentials([usernamePassword(credentialsId: 'mongo-db-creds', passwordVariable: 'MONGO_PASSWORD', usernameVariable: 'MONGO_USERNAME')]) {
                    sh 'npm test'
                }
            }
        }
    }
}