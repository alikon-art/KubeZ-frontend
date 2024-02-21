<script >
import { defineStore } from 'pinia';

const useClusterStore = defineStore('secret',{
  
    state: () => ({
    secret: {
        apiVersion: 'v1',
        kind: 'Secret',
        metadata: {
            name: '',
            labels: {
                app: 'kubez'
            },
            annotations: {},
            namespace: 'default',
        },
        stringData: {
            annotations: '',
            clusterconfig: '',
            clusterid: '',
            clustername: '',
            version: '',

        },
        type: 'Opaque',
    },
    }),


    actions: {
            
            // 设置secret名称
            setSecretName(name) {
            this.secret.metadata.name = name
            },
            // 设置secret namespace
            setSecretNamespace(namespace) {
            this.secret.metadata.namespace = namespace
            },
            // 设置secret label
            setSecretLabels(labels) {
            this.secret.metadata.labels = labels
            },
            // 删除secret label
            deleteSecretLabels() {
            this.secret.metadata.labels = {}
            },
    
            // 设置secret annotation
            setSecretAnnotations(annotations) {
            this.secret.metadata.annotations = annotations
            },
            // 删除secret annotation
            deleteSecretAnnotations() {
            this.secret.metadata.annotations = {}
            },
    
            // 设置secret stringData
            setSecretStringData(stringData) {
            this.secret.stringData = stringData
            },
            // 删除secret stringData
            deleteSecretStringData() {
            this.secret.stringData = {}
            },
            
    






}
})


export { useClusterStore }

</script>
