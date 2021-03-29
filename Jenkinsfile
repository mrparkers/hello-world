pipeline {
  agent { label "minimal" }
  environment {
    DOCKER_TAG   = "0.1.0-${GIT_COMMIT[0..7]}"
    PRODUCT_NAME = "${env.product}"
  }
  stages {
    stage('Build Image') {
      agent {
        label "lead-toolchain-skaffold"
      }
      when {
        branch 'master'
      }
      steps {
        container('skaffold') {
          sh '''
            docker build -t ${DOCKER_DEFAULT_REPO}/hello-world:${DOCKER_TAG} .
            docker push ${DOCKER_DEFAULT_REPO}/hello-world:${DOCKER_TAG}
          '''
        }
      }
    }
    stage('Deploy to Staging') {
      agent {
        label "lead-toolchain-skaffold"
      }
      when {
        branch 'master'
      }
      environment {
        NAMESPACE   = "${env.stagingNamespace}"
        APP_DOMAIN  = "${env.product}-hello-world.${env.stagingDomain}"
        ENVIRONMENT = "staging"
      }
      steps {
        container('skaffold') {
          sh '''
            helm upgrade --install app charts/hello-world -n ${NAMESPACE} \
              --set image.repository=${DOCKER_DEFAULT_REPO}/hello-world \
              --set image.tag=${DOCKER_TAG} \
              --set ingress.domain=${APP_DOMAIN} \
              --set ingress.class=${ENVIRONMENT}-app-nginx
          '''
          stageMessage "finished deploying to staging: https://${APP_DOMAIN}"
        }
      }
    }
    stage('Test') {
      agent none
      steps {
        echo "testing"
        sleep 30
      }
    }
    stage('Deploy to Production') {
      agent {
        label "lead-toolchain-skaffold"
      }
      when {
        branch 'master'
      }
      environment {
		NAMESPACE   = "${env.productionNamespace}"
		APP_DOMAIN  = "${env.product}-hello-world.${env.productionDomain}"
		ENVIRONMENT = "prod"
      }
      steps {
        container('skaffold') {
          sh '''
            helm upgrade --install app charts/hello-world -n ${NAMESPACE} \
              --set image.repository=${DOCKER_DEFAULT_REPO}/hello-world \
              --set image.tag=${DOCKER_TAG} \
              --set ingress.domain=${APP_DOMAIN} \
              --set ingress.class=${ENVIRONMENT}-app-nginx
          '''
          stageMessage "finished deploying to production: https://${APP_DOMAIN}"
        }
      }
    }
  }
}
