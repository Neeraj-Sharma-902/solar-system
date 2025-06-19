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
    }
}