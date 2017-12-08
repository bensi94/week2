node{
checkout scm
    stage('Instalize') {
        echo 'Instantizing..'
        sh 'npm install'
        sh 'npm run startpostgres && sleep 10 && npm run migratedb'
        dir('client') {
            sh 'npm install'
        }
    }

    stage('Test'){
        sh 'npm run citest'
        dir('client') {
            sh 'npm run citest'
        }
        sh 'npm run ciapitest'
        sh 'npm run ciloadtest'
    }

    stage('Build'){
        withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USER')]) {
            sh 'docker login -u $DOCKER_USER -p $DOCKER_PASSWORD'
            sh './dockerbuild.sh'
        }
    }

    stage('Deploy') {
        dir('provisioning') {
            sh './deploy.sh'
        }
    }
}
