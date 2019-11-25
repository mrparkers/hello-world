pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo "building (not really)"
        sleep 10
      }
    }
    stage('Test') {
      steps {
        echo "testing (not really)"
        sleep 30
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
        TILLER_NAMESPACE = "${env.stagingNamespace}"
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
