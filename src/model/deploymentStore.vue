<script >
import { defineStore } from 'pinia';

const useDeploymentStore = defineStore('deployment',{
  
    state: () => ({
    deployment: {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
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
                type: 'RollingUpdate',
                rollingUpdate: {
                maxSurge: '25%',
                maxUnavailable: '25%',
                },
            },
            template: {
                // 模板
            },
        },
    },
    }),

    actions: {
        // 设置deployment名称
        setDeploymentName(name) {
        this.deployment.metadata.name = name
        this.deployment.metadata.labels.app = name
        this.deployment.metadata.annotations.app = name
        },
        // 设置label
        setDeploymentLabels(labels) {
        this.deployment.metadata.labels = labels
        },
        // 删除所有label
        deleteDeploymentLabels() {
        this.deployment.metadata.labels = {}
        },

        // 设置annotations
        setDeploymentAnnotations(annotations) {
        this.deployment.metadata.annotations = annotations
        },
        // 删除所有annotations
        deleteDeploymentAnnotations() {
        this.deployment.metadata.annotations = {}
        },

        // 设置selector,同时设置template的label
        setDeploymentSelector(selector) {
            console.log(selector);
        this.deployment.spec.selector.matchLabels = selector
        this.deployment.spec.template.metadata.labels = selector
        },
        // 删除所有selector和template的label
        deleteDeploymentSelector() {
        this.deployment.spec.selector.matchLabels = {}
        this.deployment.spec.template.metadata.labels = {}
        },

        // 设置template的annotations
        setDeploymentTemplateAnnotations(annotations) {
        this.deployment.spec.template.metadata.annotations = annotations
        },

        // 删除所有template的annotations
        deleteDeploymentTemplateAnnotations() {
        this.deployment.spec.template.metadata.annotations = {}
        },


        setDeploymentNamespace(namespace) {
        this.deployment.metadata.namespace = namespace
        },
        setDeploymentReplicas(replicas) {
            this.deployment.spec.replicas = replicas
        },
        setDeploymentDnsPolicy(dnsPolicy) {
            this.deployment.spec.template.spec.dnsPolicy = dnsPolicy
        },
        setDeploymentHostNetwork(hostNetwork) {
            this.deployment.spec.template.spec.hostNetwork = hostNetwork
        },
        setDeploymentImagePullSecrets(imagePullSecrets) {
            this.deployment.spec.template.spec.imagePullSecrets = imagePullSecrets
        },






}


})

export { useDeploymentStore }

</script>