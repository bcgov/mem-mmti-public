pipeline {
    agent any
    tools {
        nodejs 'NodeJS-V8.x'
    }
    stages {
        stage('build eao-public-builder'){
            steps {
                openshiftBuild(bldCfg: 'eao-public-builder', showBuildLogs: 'true')
            }
        }
        stage('tag eao-public-builder'){
            steps {
                openshiftTag(srcStream: 'eao-public-builder', srcTag: 'latest', destStream: 'eao-public-builder', destTag: 'dev')
            }
        }
        stage('build eao-public-nginx'){
            steps {
                openshiftBuild(bldCfg: 'eao-public-nginx', showBuildLogs: 'true')
            }
        }
        stage('tag eao-public-nginx'){
            steps {
                openshiftTag(srcStream: 'eao-public-nginx', srcTag: 'latest', destStream: 'eao-public-nginx', destTag: 'dev')
            }
        }
       stage('build and package angular+nginx'){
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
