#!groovy

def tryStep(String message, Closure block, Closure tearDown = null) {
    try {
        block()
    }
    catch (Throwable t) {
        slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-channel', color: 'danger'

        throw t
    }
    finally {
        if (tearDown) {
            tearDown()
        }
    }
}

node {
    stage("Checkout") {
        checkout scm
    }

String BRANCH = "${env.BRANCH_NAME}"


if (BRANCH == "master") {

    stage("Build image") {
        tryStep "build", {
            docker.withRegistry('build.app.amsterdam.nl:5000', 'docker-registry') {
                def image = docker.build("blackspots-frontend:${env.BUILD_NUMBER}")
                image.push()
            }
        }
    }

    node {
        stage('Push image') {
            tryStep "image tagging", {
                docker.withRegistry('build.app.amsterdam.nl:5000', 'docker-registry') {
                    def image = docker.image("blackspots-frontend:${env.BUILD_NUMBER}")
                    image.pull()
                    if (BRANCH == "master") {
                        image.push("acceptance")
                }
            }
        }
    }

    node {
       if (BRANCH == "master" || BRANCH == "test-acc") {
        stage("Deploy to ACC") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                    parameters: [
                        [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
                        [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-blackspots-frontend.yml'],
                    ]
            }
        }
      }
    }

    stage('Waiting for approval') {
        slackSend channel: '#ci-channel', color: 'warning', message: 'Blackspots Frontend is waiting for Production Release - please confirm'
        input "Deploy to Production?"
    }

    node {
        stage("Build and Push Production image") {
            tryStep "build", {
                docker.withRegistry('build.app.amsterdam.nl:5000','docker-registry') {
                    def image = docker.build("blackspots-frontend:${env.BUILD_NUMBER}")
                    image.pull()
                    image.push("production")
                    image.push("latest")
                }
            }
        }
    }

    node {
        stage("Deploy to PROD") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                parameters: [
                    [$class: 'StringParameterValue', name: 'INVENTORY', value: 'production'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-blackspots-frontend.yml'],
                ]
            }
        }
    }
}
