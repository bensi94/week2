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
        withCredentials([string(credentialsId: 'AWS-Access-Key', variable: 'ACCESS-KEY'), string(credentialsId: 'AWS-SecretAccess-Key', variable: 'SECRET-KEY')]) {
            sh 'aws configure set aws_access_key_id $ACCESS-KEY'
            sh 'aws configure set aws_secret_access_key $SECRET-KEY'
            sh 'aws configure set region eu-west-2'
            sh 'aws ec2 describe-key-pairs --query KeyPairs[*].KeyName --output=text'
        }
    }
}
