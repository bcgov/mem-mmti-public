pipeline {
    agent any
    tools {
        nodejs 'NodeJS-V8.x'
    }
    stages {
        stage('build angular-builder'){
            steps {
                openshiftBuild(bldCfg: 'angular-builder', showBuildLogs: 'true')
            }
        }
        stage('tag angular-builder'){
            steps {
                openshiftTag(srcStream: 'angular-builder', srcTag: 'latest', destStream: 'angular-builder', destTag: 'dev')
            }
        }
        stage('build nginx-runtime'){
            steps {
                openshiftBuild(bldCfg: 'nginx-runtime', showBuildLogs: 'true')
            }
        }
        stage('tag nginx-runtime'){
            steps {
                openshiftTag(srcStream: 'nginx-runtime', srcTag: 'latest', destStream: 'nginx-runtime', destTag: 'dev')
            }
        }
       stage('build and package angular-on-nginx-build'){
            steps {
                openshiftBuild(bldCfg: 'angular-on-nginx-build-build', showBuildLogs: 'true')
            }
        }
        stage('tag and deploy to dev') {
            steps {
                openshiftTag(srcStream: 'angular-on-nginx-build', srcTag: 'latest', destStream: 'angular-on-nginx-build', destTag: 'dev')
            }
        }
    }
}
