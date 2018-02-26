// Edit your app's name below
def APP_NAME = 'mem-mmt'

// Edit your environment TAG names below
def TAG_NAMES = ['dev', 'test', 'prod']

// You shouldn't have to edit these if you're following the conventions
def NGINX_BUILD_CONFIG = 'nginx-runtime'
def BUILD_CONFIG = APP_NAME + '-build'
def IMAGESTREAM_NAME = 'angular-on-nginx-build'

node {
  try {
    notifyBuild('STARTED')
    stage('build chained angular app build'){
        steps {
            notifyBuild('STARTED')
            openshiftBuild(bldCfg: 'angular-on-nginx-build-build-angular-app-build', showBuildLogs: 'true')
        }
    }
    stage('build angular-on-nginx-build-build') {
      echo "Building: angular-on-nginx-build-build"
      openshiftBuild bldCfg: 'angular-on-nginx-build-build', showBuildLogs: 'true'
    }
    stage('deploy-' + TAG_NAMES[0]) {
      openshiftTag destStream: IMAGESTREAM_NAME, verbose: 'true', destTag: TAG_NAMES[0], srcStream: IMAGESTREAM_NAME, srcTag: '$BUILD_ID'
      notifyBuild('DEPLOYED:DEV')
    }
    stage('deploy-' + TAG_NAMES[1]) {
      try {
        timeout(time: 2, unit: 'MINUTES') {
          input "Deploy to " + TAG_NAMES[1] + "?"
          openshiftTag destStream: IMAGESTREAM_NAME, verbose: 'true', destTag: TAG_NAMES[1], srcStream: IMAGESTREAM_NAME, srcTag: '$BUILD_ID'
          notifyBuild('DEPLOYED:TEST')
        }
      } catch (e) {
        notifyBuild('DEPLOYMENT:TEST ABORTED')
      }
    }
    stage('deploy-'  + TAG_NAMES[2]) {
      try {
        timeout(time: 2, unit: 'MINUTES') {
          input "Deploy to " + TAG_NAMES[2] + "?"
          openshiftTag destStream: IMAGESTREAM_NAME, verbose: 'true', destTag: TAG_NAMES[2], srcStream: IMAGESTREAM_NAME, srcTag: '$BUILD_ID'
          notifyBuild('DEPLOYED:PROD')
        }
      } catch (e) {
        notifyBuild('DEPLOYMENT:PROD ABORTED')
      }
    }
  } catch (e) {
    // If there was an exception thrown, the build failed
    currentBuild.result = "FAILED"
    throw e
  } finally {
    // Success or failure, always send notifications
    notifyBuild(currentBuild.result)
  }
}

def notifyBuild(String buildStatus = 'STARTED') {
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"
  def details = """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
    <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>"""

  // Override default values based on build status
  if (buildStatus == 'STARTED' || buildStatus.startsWith("DEPLOYMENT")) {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESSFUL' || buildStatus.startsWith("DEPLOYED")) {
    color = 'GREEN'
    colorCode = '#00FF00'
  } else {
    color = 'RED'
    colorCode = '#FF0000'
  }

  // Send notifications
  slackSend (color: colorCode, message: summary)
}
