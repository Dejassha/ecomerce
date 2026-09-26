pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        NODE_ENV = "production"

        // Local deploy target (served / proxied to this path)
        DEPLOY_PATH = "/home/dejassha/Projects/jenkins/ecommerce"

        // Frontend .env Jenkins credential (backend uses "ecommerce-backend")
        ENV_CREDENTIAL_ID = "ecommerce-frontend"
    }

    stages {

        stage('Checkout') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Optional .env from Jenkins credentials.
                    // Does not fail the build if the credential is missing —
                    // falls back to the .env committed in the repo.
                    try {
                        withCredentials([
                            file(
                                credentialsId: "${ENV_CREDENTIAL_ID}",
                                variable: 'ENV_FILE'
                            )
                        ]) {
                            sh '''
                                set -e
                                if [ -f "$ENV_FILE" ]; then
                                    echo "Copying Jenkins environment file..."
                                    cp "$ENV_FILE" .env
                                fi
                            '''
                        }
                    } catch (err) {
                        echo "WARNING: credential '${ENV_CREDENTIAL_ID}' not found. Using repo .env as fallback."
                    }

                    sh '''
                        set -e

                        echo "Node version:"
                        node --version
                        echo "npm version:"
                        npm --version

                        echo "Installing dependencies..."
                        if [ -f "package-lock.json" ]; then
                            # Repo uses npm (package-lock.json exists, no pnpm-lock.yaml).
                            # npm ci is deterministic and fails fast on lock mismatch.
                            npm ci
                        else
                            npm install
                        fi

                        echo "Dependencies installed successfully."
                    '''
                }
            }
        }

        stage('Lint') {
            steps {
                sh '''
                    set -e

                    echo "Checking for lint script..."
                    if node -e "process.exit(require('./package.json').scripts && require('./package.json').scripts.lint ? 0 : 1)"; then
                        echo "Running lint..."
                        npm run lint
                        echo "Lint passed."
                    else
                        echo "No lint script defined in package.json. Skipping."
                    fi
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                    set -e

                    echo "Building production application..."

                    npm run build

                    if [ ! -d "dist" ]; then
                        echo "ERROR: dist directory was not generated."
                        exit 1
                    fi

                    if [ ! -f "dist/index.html" ]; then
                        echo "ERROR: dist/index.html was not generated."
                        exit 1
                    fi

                    echo ""
                    echo "Build completed successfully."
                    echo ""
                    echo "Build output:"
                    ls -lh dist

                    echo ""
                    echo "Build size:"
                    du -sh dist
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    set -e

                    echo "Preparing deployment..."

                    if [ ! -d "dist" ]; then
                        echo "ERROR: Build folder not found. Aborting."
                        exit 1
                    fi

                    mkdir -p "${DEPLOY_PATH}"

                    echo "Deploying to:"
                    echo "${DEPLOY_PATH}"

                    if ! command -v rsync >/dev/null 2>&1; then
                        echo "ERROR: rsync is not installed in the Jenkins runtime."
                        exit 1
                    fi

                    echo "Using:"
                    rsync --version | head -1

                    echo "Synchronizing files..."

                    rsync -av --delete dist/ "${DEPLOY_PATH}/"

                    echo "Deployment completed successfully."
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    set -e

                    echo "Verifying deployment..."

                    if [ ! -f "${DEPLOY_PATH}/index.html" ]; then
                        echo "ERROR: index.html was not found after deployment."
                        exit 1
                    fi

                    echo "index.html found."

                    echo ""
                    echo "Deployed files:"
                    ls -lh "${DEPLOY_PATH}" | head -20

                    echo ""
                    echo "Deployment size:"
                    du -sh "${DEPLOY_PATH}"

                    echo ""
                    echo "Deployment verification successful."
                '''
            }
        }
    }

    post {
        success {
            echo "=============================================="
            echo "Production deployment successful."
            echo "Build: #${BUILD_NUMBER}"
            echo "Path: ${DEPLOY_PATH}"
            echo "=============================================="
        }

        failure {
            echo "=============================================="
            echo "Production deployment FAILED."
            echo "Build: #${BUILD_NUMBER}"
            echo "Check the Jenkins console output."
            echo "=============================================="
        }

        always {
            cleanWs()
        }
    }
}
