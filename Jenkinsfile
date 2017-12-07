node{
checkout scm
    stage('Build') {
        echo 'Building..'
        sh 'npm install'
        sh 'npm run startpostgres && sleep 10 && npm run migratedb'
        sh 'npm run citest'
        dir('client') {
            sh 'npm install'
            sh 'npm test'
        }
    }

    stage('Deploy') {
        echo 'Deploying....'
    }
}
