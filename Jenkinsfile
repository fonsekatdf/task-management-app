pipeline {
    agent any

    environment {
        PATH = "${WORKSPACE}/tools/node/bin:${env.PATH}"
        NODE_VERSION = "v22.16.0"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Source code is checked out from GitHub.'
                sh 'pwd && ls -la'
            }
        }

        stage('Setup Node.js') {
            steps {
                sh '''
                    set -e

                    if [ ! -x "$WORKSPACE/tools/node/bin/node" ]; then
                        echo "Downloading Node.js..."

                        mkdir -p "$WORKSPACE/tools/node"

                        curl -fL \
                        https://nodejs.org/dist/v22.16.0/node-v22.16.0-linux-x64.tar.xz \
                        -o "$WORKSPACE/node.tar.xz"

                        tar -xJf "$WORKSPACE/node.tar.xz" \
                        --strip-components=1 \
                        -C "$WORKSPACE/tools/node"

                        rm "$WORKSPACE/node.tar.xz"
                    fi

                    node --version
                    npm --version
                '''
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Frontend Lint') {
            steps {
                dir('frontend') {
                    sh 'npm run lint'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
    }

    post {
        success {
            echo 'Task Management App CI completed successfully!'
        }

        failure {
            echo 'Task Management App CI failed. Check the console output.'
        }

        always {
            echo 'Jenkins pipeline execution finished.'
        }
    }
}
