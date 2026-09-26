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

        DEPLOY_PATH = "/home/dejassha/Projects/jenkins/ecommerce"

        ENV_CREDENTIAL_ID = "dynamic-stamping-env"
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
                withCredentials([
                    file(
                        credentialsId: "${ENV_CREDENTIAL_ID}",
                        variable: 'ENV_FILE'
                    )
                ]) {
                    sh '''
                        set -e

                        echo "Node version:"
                        node --version

                        echo "pnpm version:"
                        pnpm --version

                        echo "Copying Jenkins environment file..."
                        cp "$ENV_FILE" .env

                        echo "Installing dependencies..."
                        pnpm install --frozen-lockfile

                        echo "Dependencies installed successfully."
                    '''
                }
            }
        }

        stage('Lint') {
            steps {
                sh '''
                    set -e

                    echo "Running ESLint..."

                    if pnpm run lint; then
                        echo "Lint passed."
                    else
                        echo ""
                        echo "WARNING: ESLint reported errors/warnings."
                        echo "WARNING: Continuing with production build."
                        echo ""
                    fi
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                    set -e

                    echo "Building production application..."

                    pnpm run build

                    if [ ! -d "dist" ]; then
                        echo "ERROR: dist directory was not generated."
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
        
                    rsync -av \
                        --delete \
                        --no-perms \
                        --no-group \
                        --no-owner \
                        --no-times \
                        --omit-dir-times \
                        dist/ \
                        "${DEPLOY_PATH}/"
        
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
