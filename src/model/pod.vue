<script >

import { reactive } from 'vue'

const pod = reactive({
  apiVersion: 'v1',
  kind: 'Pod',
  metadata: {
    name: 'complex-pod',
    labels: {
      app: 'complex-app'
    }
  },
  spec: {
    containers: [
      {
        name: 'complex-container',
        image: 'my-image',
        env: [
          {
            name: 'ENV_VAR',
            value: 'Some Value'
          }
        ],
        volumeMounts: [
          {
            name: 'my-volume',
            mountPath: '/path/to/mount'
          }
        ],
        resources: {
          requests: {
            memory: '64Mi',
            cpu: '250m'
          },
          limits: {
            memory: '128Mi',
            cpu: '500m'
          }
        },
        ports: [
          {
            containerPort: 8080
          }
        ]
      }
    ],
    volumes: [
      {
        name: 'my-volume',
        emptyDir: {}
      }
    ],
    restartPolicy: 'OnFailure'
  }
})


export { pod }



</script>