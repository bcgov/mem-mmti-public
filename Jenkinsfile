pipeline {
    agent any
    tools {
        nodejs 'NodeJS-V8.x'
    }
    stages {
        stage('buildOnOpenShift'){
            steps {
                openshiftBuild(bldCfg: '${NAME}', showBuildLogs: 'true')
            }
        }
        stage('deploy') {
            steps {
                openshiftDeploy(depCfg: '${NAME}')
            }
        }
    }
}
