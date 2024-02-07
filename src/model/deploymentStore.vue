<script >
import { defineStore } from 'pinia';

const useDeploymentStore = defineStore('deployment',{
  
    state: () => ({
    deployment: {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
            name: '',
            labels: {
                app: '',
            },
            annotations: {
                app: '',
            },
            namespace: 'default',
        },
        spec: {
            selector: {
                matchLabels: {
                    app: '',
                },
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
        setDeploymentName(name) {
        this.deployment.metadata.name = name
        this.deployment.metadata.labels.app = name
        this.deployment.metadata.annotations.app = name
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
        setDeploymentSelector(selector) {
            this.deployment.spec.selector.matchLabels.app = selector
            this.deployment.spec.template.metadata.labels.app = selector
            this.deployment.spec.template.metadata.annotations.app = selector
        },
        setDeploymentImagePullSecrets(imagePullSecrets) {
            this.deployment.spec.template.spec.imagePullSecrets = imagePullSecrets
        },






}


})

export { useDeploymentStore }

</script>