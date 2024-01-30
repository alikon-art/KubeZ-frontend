


<script >
    import { reactive } from 'vue';
    

    
    const deployment = reactive({
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: 'name-deploy',
        labels: {
          app: 'name-deploy'
        }
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: 'name-pod'
          }
        },
        template: {
          metadata: {
            labels: {
              app: 'name-pod'
            }
          },
          spec: {
            containers: [
              {
                name: 'name-container',
                image: 'image',
                ports: [
                  {
                    containerPort: 80
                  }
                ]
              }
            ]
          }
        }
      }
    });

    function deployment_updateName(newName) {
      deployment.metadata.name = newName;
    }



    export {deployment,deployment_updateName}

</script>