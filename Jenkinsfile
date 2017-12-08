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
        sh './dockerbuild.sh'
    }

    stage

    stage('Deploy') {
        echo 'Deploying....'
    }
}
