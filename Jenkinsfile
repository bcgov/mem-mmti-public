pipeline {
    agent any
    tools {
        nodejs 'NodeJS-V8.x'
    }
    stages {
        stage('buildOnOpenShift'){
            steps {
                openshiftBuild(bldCfg: 'eao-public-angular-on-nginx-build-build', showBuildLogs: 'true')
            }
        }
        stage('deploy') {
            steps {
                openshiftDeploy(depCfg: 'eao-public-angular-on-nginx-build', namespace: 'esm-dev')
            }
        }
    }
}
