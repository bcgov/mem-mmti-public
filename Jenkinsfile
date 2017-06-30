pipeline {
    agent any
    tools {
        nodejs 'NodeJS-V8.x'
    }
    stages {
        stage('build nginx container'){
            steps {
                openshiftBuild(bldCfg: 'eao-public-angular-on-nginx-build-build', showBuildLogs: 'true')
            }
        }
        stage('tag and deploy to dev') {
            steps {
                openshiftTag(srcStream: 'eao-public-angular-on-nginx-build', srcTag: 'latest', destStream: 'eao-public-angular-on-nginx-build', destTag: 'dev')
            }
        }
    }
}
