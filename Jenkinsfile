pipeline {
  agent any

  environment {
    DEPLOY_HOST = "127.0.0.1"
    DEPLOY_USER = "ubuntu"
    APP_DIR     = "/var/www/nodeapp"
    APP_NAME    = "nodeapp"
    PORT        = "3000"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Deploy to EC2') {
      steps {
        sh """
          ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} '
            set -e
            mkdir -p ${APP_DIR}
          '
          rsync -az --delete -e "ssh -o StrictHostKeyChecking=no" ./ ${DEPLOY_USER}@${DEPLOY_HOST}:${APP_DIR}/
          ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} '
            set -e
            cd ${APP_DIR}
            npm install
            pm2 start index.js --name ${APP_NAME} --update-env || pm2 restart ${APP_NAME}
            pm2 save
          '
        """
      }
    }

    stage('Smoke Test') {
      steps {
        sh """
          curl -sSf http://${DEPLOY_HOST}:${PORT}/ > /dev/null
        """
      }
    }
  }
}