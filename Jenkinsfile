node{
checkout scm
    stage('Build') {
        echo 'Building..'
        sh 'npm install'
        sh 'npm run startpostgres && sleep 10 && npm run migratedb'
        sh 'npm run citest'
        sh 'cd client && npm install'
        sh 'npm test'
        sh 'cd ..'
    }

    stage('Deploy') {
        echo 'Deploying....'
    }
}
