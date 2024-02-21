<script >
import { defineStore } from 'pinia';

const useConfigmapStore = defineStore('configmap',{
  
    state: () => ({
    configmap: {
        apiVersion: 'v1',
        kind: 'Configmap',
        metadata: {
            name: '',
            labels: {},
            annotations: {},
            namespace: 'default',
        },
        data: {
            app: 'nginx',
        },
        immutable: false,
    },
    }),


    actions: {
            
            // 设置configmap名称
            setConfigmapName(name) {
            this.configmap.metadata.name = name
            },
            // 设置configmap namespace
            setConfigmapNamespace(namespace) {
            this.configmap.metadata.namespace = namespace
            },
            // 设置configmap label
            setConfigmapLabels(labels) {
            this.configmap.metadata.labels = labels
            },
            // 删除configmap label
            deleteConfigmapLabels() {
            this.configmap.metadata.labels = {}
            },
    
            // 设置configmap annotation
            setConfigmapAnnotations(annotations) {
            this.configmap.metadata.annotations = annotations
            },
            // 删除configmap annotation
            deleteConfigmapAnnotations() {
            this.configmap.metadata.annotations = {}
            },
    
            // 设置configmap data
            setConfigmapData(data) {
            this.configmap.data = data
            },
            // 删除configmap data
            deleteConfigmapData() {
            this.configmap.data = {}
            },
    
            // 设置configmap immutable
            setConfigmapImmutable(immutable) {
            this.configmap.immutable = immutable
            },
            // 删除configmap immutable
            deleteConfigmapImmutable() {
            this.configmap.immutable = false
            },






}
})


export { useConfigmapStore }

</script>
