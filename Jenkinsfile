#!groovy

def tryStep(String message, Closure block, Closure tearDown = null) {
    try {
        block();
    }
    catch (Throwable t) {
        slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-channel', color: 'danger'

        throw t;
    }
    finally {
        if (tearDown) {
            tearDown();
        }
    }
}

node {
    stage("Checkout") {
        checkout scm
    }


    stage('Test') {
        String PROJECT = "blackspots-unittests-${env.GIT_COMMIT}"

        tryStep "unittests start", {
            sh "docker-compose -p ${PROJECT} up --build --exit-code-from unittest unittest"
        }, {
            sh "docker-compose -p ${PROJECT} down -v || true"
        }
    }


    stage("Build develop image") {
        tryStep "build", {
            def image = docker.build("build.app.amsterdam.nl:5000/blackspots-frontend:${env.BUILD_NUMBER}")
            image.push()
        }
    }
}

String BRANCH = "${env.BRANCH_NAME}"


if (BRANCH == "master" || BRANCH == "develop") {
    node {
        stage('Push acceptance image') {
            tryStep "image tagging", {
                def image = docker.image("build.app.amsterdam.nl:5000/blackspots-frontend:${env.BUILD_NUMBER}")
                image.pull()
                image.push("acceptance")
            }
        }
    }

    node {
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


if (BRANCH == "master") {
    stage('Waiting for approval') {
        slackSend channel: '#ci-channel', color: 'warning', message: 'Blackspots is waiting for Production Release - please confirm'
        input "Deploy to Production?"
    }

    node {
        stage('Push production image') {
            tryStep "image tagging", {
                def image = docker.image("build.app.amsterdam.nl:5000/blackspots-frontend:${env.BUILD_NUMBER}")
                image.pull()
                image.push("production")
                image.push("latest")
            }
        }
    }

    node {
        stage("Deploy") {
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
