// Switch to using https://github.com/BCDevOps/jenkins-pipeline-shared-lib when stable.
@NonCPS
import groovy.json.JsonOutput
/*
 * Sends a slack notification
 */
def notifySlack(text, url, channel, attachments) {
    def slackURL = url
    def jenkinsIcon = 'https://wiki.jenkins-ci.org/download/attachments/2916393/logo.png'
    def payload = JsonOutput.toJson([text: text,
        channel: channel,
        username: "Jenkins",
        icon_url: jenkinsIcon,
        attachments: attachments
    ])
    def encodedReq = URLEncoder.encode(payload, "UTF-8")
    sh("curl -s -S -X POST --data \'payload=${encodedReq}\' ${slackURL}")
}

/*
 * Updates the global pastBuilds array: it will iterate recursively
 * and add all the builds prior to the current one that had a result
 * different than 'SUCCESS'.
 */
def buildsSinceLastSuccess(previousBuild, build) {
  if ((build != null) && (build.result != 'SUCCESS')) {
      pastBuilds.add(build)
      buildsSinceLastSuccess(pastBuilds, build.getPreviousBuild())
   }
}

/*
 * Generates a string containing all the commit messages from
 * the builds in pastBuilds.
 */
@NonCPS
def getChangeLog(pastBuilds) {
    def log = ""
    for (int x = 0; x < pastBuilds.size(); x++) {
        for (int i = 0; i < pastBuilds[x].changeSets.size(); i++) {
            def entries = pastBuilds[x].changeSets[i].items
            for (int j = 0; j < entries.length; j++) {
                def entry = entries[j]
                log += "* ${entry.msg} by ${entry.author} \n"
            }
        }
    }
    return log;
}

def CHANGELOG = "No new changes"
def IMAGE_HASH = "latest"

node('master') {
  /*
   * Extract secrets and create relevant environment variables.
   * The contents of the secret are extracted in as many files as the keys contained in the secret.
   * The files are named as the key, and contain the corresponding value.
   */
  sh("oc extract secret/slack-secrets --to=${env.WORKSPACE} --confirm")
  SLACK_HOOK = sh(script: "cat webhook", returnStdout: true)
  DEV_CHANNEL = sh(script: "cat dev-channel", returnStdout: true)

  withEnv(["SLACK_HOOK=${SLACK_HOOK}", "DEV_CHANNEL=${DEV_CHANNEL}"]){
    stage('Build'){
      // isolate last successful builds and then get the changelog
      pastBuilds = []
      buildsSinceLastSuccess(pastBuilds, currentBuild);
      CHANGELOG = getChangeLog(pastBuilds);

      echo ">>>>>>Changelog: \n ${CHANGELOG}"

      try {
        echo "Building: mem-mmti-public-angular"
        openshiftBuild bldCfg: 'mem-mmti-public-angular', showBuildLogs: 'true'
        echo "Build done"

        echo "Building: mem-mmti-public"
        openshiftBuild bldCfg: 'mem-mmti-public', showBuildLogs: 'true'
        echo "Build done"

        echo "Tagging image..."
        // Don't tag with BUILD_ID so the pruner can do it's job; it won't delete tagged images.
        // Tag the images for deployment based on the image's hash
        IMAGE_HASH = sh (
        script: """oc get istag mem-mmti-public:latest -o template --template=\"{{.image.dockerImageReference}}\"|awk -F \":\" \'{print \$3}\'""",
        returnStdout: true).trim()
        echo ">> IMAGE_HASH: ${IMAGE_HASH}"
        echo "Tagging done"
      } catch (error) {
        notifySlack(
          "The latest mem-mmti-public build seems to have broken\n'${error.message}'",
          env.SLACK_HOOK,
          env.DEV_CHANNEL,
          []
        )
        throw error
      }
    }
  }
}



node('master') {
  /*
   * Extract secrets and create relevant environment variables.
   * The contents of the secret are extracted in as many files as the keys contained in the secret.
   * The files are named as the key, and contain the corresponding value.
   */
  sh("oc extract secret/slack-secrets --to=${env.WORKSPACE} --confirm")
  SLACK_HOOK = sh(script: "cat webhook", returnStdout: true)
  DEPLOY_CHANNEL = sh(script: "cat deploy-channel", returnStdout: true)
  QA_CHANNEL = sh(script: "cat qa-channel", returnStdout: true)

  withEnv(["SLACK_HOOK=${SLACK_HOOK}", "DEPLOY_CHANNEL=${DEPLOY_CHANNEL}", "QA_CHANNEL=${QA_CHANNEL}"]){
    stage('Deploy to Test'){
      try {
        echo "Deploying to test..."
        openshiftTag destStream: 'mem-mmti-public', verbose: 'false', destTag: 'test', srcStream: 'mem-mmti-public', srcTag: "${IMAGE_HASH}"
        sleep 5
        openshiftVerifyDeployment depCfg: 'mem-public', namespace: 'mem-mmt-test', replicaCount: 1, verbose: 'false', verifyReplicaCount: 'false', waitTime: 600000
        echo ">>>> Deployment Complete"

        notifySlack(
          "A new version of mem-mmti-public is now in Test. \n Changes: \n ${CHANGELOG}",
          env.SLACK_HOOK,
          env.DEPLOY_CHANNEL,
          []
        )

        notifySlack(
          "A new version of mem-mmti-public is now in Test and ready for QA. \n Changes to test: \n ${CHANGELOG}",
          env.SLACK_HOOK,
          env.QA_CHANNEL,
          []
        )
      } catch (error) {
        notifySlack(
          "The latest deployment of mem-mmti-public to Test seems to have failed\n'${error.message}'",
          env.SLACK_HOOK,
          env.DEPLOY_CHANNEL,
          []
        )
      }
    }
  }
}
