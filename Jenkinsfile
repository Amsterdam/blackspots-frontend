#!groovy
def PROJECT_NAME = "blackspots-frontend"
def SLACK_CHANNEL = '#opdrachten-deployments'
def PLAYBOOK = 'deploy.yml'
def CONTAINERNAME = "ois/blackspots-frontend:${env.BUILD_NUMBER}"
def SLACK_MESSAGE = [
    "title_link": BUILD_URL,
    "fields": [
        ["title": "Project","value": PROJECT_NAME],
        ["title":"Branch", "value": BRANCH_NAME, "short":true],
        ["title":"Build number", "value": BUILD_NUMBER, "short":true]
    ]
]
pipeline {
    agent any
    environment {
        IS_PRE_RELEASE_BRANCH = "${env.BRANCH_NAME ==~ "release/.*"}"
    }
    stages {
        stage('Build') {
            tryStep "build", {
                docker.withRegistry("${DOCKER_REGISTRY_HOST}",'docker_registry_auth') {
                    image = docker.build("${CONTAINERNAME}",
                        "--shm-size 1G " +
                        "--build-arg BUILD_ENV=acc " +
                        "--build-arg BUILD_NUMBER=${env.BUILD_NUMBER} " +
                        ". ")
                    image.push()
                }
            }
        }
        stage('Push and deploy') {
            when {
                anyOf {
                    branch 'master'
                    branch 'development'
                    buildingTag()
                    environment name: 'IS_PRE_RELEASE_BRANCH', value: 'true'
                }
            }
            stages {
                stage('Deploy to acceptance') {
                    when {
                        anyOf {
                            branch 'master'
                            branch 'development'
                            buildingTag()
                            environment name: 'IS_PRE_RELEASE_BRANCH', value: 'true'
                        }
                    }
                    steps {
                        docker.withRegistry("${DOCKER_REGISTRY_HOST}",'docker_registry_auth') {
                           image.push("acceptance")
                        }
                        build job: 'Subtask_Openstack_Playbook', parameters: [
                            string(name: 'PLAYBOOK', value: PLAYBOOK),
                            string(name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_blackspots-frontend"),
                            string(name: 'INVENTORY', value: "acceptance")
                        ], wait: true
                    }
                }
                stage('Waiting for approval') {
                    when {
                         anyOf {
                            branch 'master'
                            tag pattern: "\\d+\\.\\d+\\.\\d+\\.*", comparator: "REGEXP"
                        }
                    }
                    slackSend(channel: SLACK_CHANNEL, attachments: [SLACK_MESSAGE <<
                            [
                                "color": "#36a64f",
                                "title": "blackspots-frontend is waiting for Production Release - please confirm",
                            ]
                        ])
                    timeout(10) {
                       input "Deploy to Production?"
                    }
                }
                stage('Deploy to production') {
                    when {
                         anyOf {
                            branch 'master'
                            tag pattern: "\\d+\\.\\d+\\.\\d+\\.*", comparator: "REGEXP"
                        }
                    }
                    steps {
                        docker.withRegistry("${DOCKER_REGISTRY_HOST}",'docker_registry_auth') {
                           image.push("production")
                        }
                        build job: 'Subtask_Openstack_Playbook', parameters: [
                            string(name: 'PLAYBOOK', value: PLAYBOOK),
                            string(name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_blackspots-frontend"),
                            string(name: 'INVENTORY', value: "production")
                        ], wait: true
                        slackSend(channel: SLACK_CHANNEL, attachments: [SLACK_MESSAGE <<
                            [
                                "color": "#36a64f",
                                "title": "Deploy to production succeeded :rocket:",
                            ]
                        ])
                    }
                }
            }
        }
    }
    post {
        failure {
            slackSend(channel: SLACK_CHANNEL, attachments: [SLACK_MESSAGE <<
                [
                    "color": "#D53030",
                    "title": "Build failed :fire:",
                ]
            ])
        }
    }
}
