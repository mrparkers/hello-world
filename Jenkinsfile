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
        NAMESPACE = "${env.stagingNamespace}"
        PRODUCT_NAME = "${env.product}"
      }
      steps {
        container('skaffold') {
          sh "skaffold deploy -n ${NAMESPACE}"
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
        NAMESPACE = "${env.productionNamespace}"
        PRODUCT_NAME = "${env.product}"
      }
      steps {
        container('skaffold') {
          sh "skaffold deploy -n ${NAMESPACE}"
          stageMessage "finished"
        }
      }
    }
  }
}
