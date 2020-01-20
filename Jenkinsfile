pipeline {
  agent any
  stages {
    stage('Deploy to Staging') {
      agent {
        label "lead-toolchain-skaffold"
      }
      when {
        branch 'master'
      }
      environment {
        TILLER_NAMESPACE = "${env.stagingNamespace}"
        ISTIO_DOMAIN   = "${env.stagingDomain}"
        PRODUCT_NAME = "${env.product}"
      }
      steps {
        container('skaffold') {
          sh "skaffold deploy -n ${TILLER_NAMESPACE}"
          stageMessage "finished"
        }
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
        TILLER_NAMESPACE = "${env.productionNamespace}"
        ISTIO_DOMAIN   = "${env.productionDomain}"
        PRODUCT_NAME = "${env.product}"
      }
      steps {
        container('skaffold') {
          sh "skaffold deploy -n ${TILLER_NAMESPACE}"
          stageMessage "finished"
        }
      }
    }
  }
}
