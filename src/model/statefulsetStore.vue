<script >
import { defineStore } from 'pinia';

const usestatefulsetStore = defineStore('statefulset',{
  
    state: () => ({
    statefulset: {
        apiVersion: 'apps/v1',
        kind: 'statefulset',
        metadata: {
            name: '',
            labels: {},
            annotations: {},
            namespace: 'default',
        },
        spec: {
            selector: {
                matchLabels: {},
            },
            replicas: 1,
            strategy: {
            },
            template: {
                // 模板
            },
        },
    },
    }),

    actions: {
        // 设置statefulset名称
        setstatefulsetName(name) {
        this.statefulset.metadata.name = name
        this.statefulset.metadata.labels.app = name
        this.statefulset.metadata.annotations.app = name
        },
        // 设置label
        setstatefulsetLabels(labels) {
        this.statefulset.metadata.labels = labels
        },
        // 删除所有label
        deletestatefulsetLabels() {
        this.statefulset.metadata.labels = {}
        },

        // 设置annotations
        setstatefulsetAnnotations(annotations) {
        this.statefulset.metadata.annotations = annotations
        },
        // 删除所有annotations
        deletestatefulsetAnnotations() {
        this.statefulset.metadata.annotations = {}
        },

        // 设置selector,同时设置template的label
        setstatefulsetSelector(selector) {
            console.log(selector);
        this.statefulset.spec.selector.matchLabels = selector
        this.statefulset.spec.template.metadata.labels = selector
        },
        // 删除所有selector和template的label
        deletestatefulsetSelector() {
        this.statefulset.spec.selector.matchLabels = {}
        this.statefulset.spec.template.metadata.labels = {}
        },

        // 设置template的annotations
        setstatefulsetTemplateAnnotations(annotations) {
        this.statefulset.spec.template.metadata.annotations = annotations
        },

        // 删除所有template的annotations
        deletestatefulsetTemplateAnnotations() {
        this.statefulset.spec.template.metadata.annotations = {}
        },

        // 删除所有sStrategy
        deletestatefulsetStrategy() {
        this.statefulset.spec.strategy = {}
        },




        setstatefulsetNamespace(namespace) {
        this.statefulset.metadata.namespace = namespace
        },
        setstatefulsetReplicas(replicas) {
            this.statefulset.spec.replicas = replicas
        },
        setstatefulsetDnsPolicy(dnsPolicy) {
            this.statefulset.spec.template.spec.dnsPolicy = dnsPolicy
        },
        setstatefulsetStrategy(strategy) {
            this.statefulset.spec.strategy = strategy
        },
        setstatefulsetHostNetwork(hostNetwork) {
            this.statefulset.spec.template.spec.hostNetwork = hostNetwork
        },
        setstatefulsetImagePullSecrets(imagePullSecrets) {
            this.statefulset.spec.template.spec.imagePullSecrets = imagePullSecrets
        },






}


})

export { usestatefulsetStore }

</script>