<script >
import { defineStore } from 'pinia';

const useServiceStore = defineStore('service',{
  
    state: () => ({
    service: {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
            name: '',
            labels: {},
            annotations: {},
            namespace: 'default',
        },
        spec: {
            selector: {},
            ports: [],
            type: 'ClusterIP',
        },
    },
    }),


    actions: {

        // 设置service名称
        setServiceName(name) {
        this.service.metadata.name = name
        },
        // 设置service namespace
        setServiceNamespace(namespace) {
        this.service.metadata.namespace = namespace
        },
        // 设置service label
        setServiceLabels(labels) {
        this.service.metadata.labels = labels
        },
        // 删除service label
        deleteServiceLabels() {
        this.service.metadata.labels = {}
        },

        // 设置service annotation
        setServiceAnnotations(annotations) {
        this.service.metadata.annotations = annotations
        },
        // 删除service annotation
        deleteServiceAnnotations() {
        this.service.metadata.annotations = {}
        },

        // 设置service selector
        setServiceSelector(selector) {
        this.service.spec.selector = selector
        },
        // 删除service selector
        deleteServiceSelector() {
        this.service.spec.selector = {}
        },
        
        // 设置service type
        setServiceType(type) {
        this.service.spec.type = type
        },
        // 设置service ports
        setServicePorts(ports) {
        this.service.spec.ports = ports
        },



}
})


export { useServiceStore }

</script>
