node{
checkout scm
    stage('Build') {
        echo 'Building..'
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

    stage('Deploy') {
        echo 'Deploying....'
    }
}
