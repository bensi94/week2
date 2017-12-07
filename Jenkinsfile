node{
checkout scm
stage('Build') {
    echo 'Building..'
    sh 'npm install'
    sh 'npm run startpostgres && sleep 10 && npm run migratedb'
    sh 'npm run citest'
}

stage('Deploy') {
    echo 'Deploying....'
}
