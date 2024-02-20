<script >
import { defineStore } from 'pinia';

const useDaemonSetStore = defineStore('daemonSet',{
  
    state: () => ({
    daemonSet: {
        apiVersion: 'apps/v1',
        kind: 'DaemonSet',
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
        // 设置daemonSet名称
        setDaemonSetName(name) {
        this.daemonSet.metadata.name = name
        this.daemonSet.metadata.labels.app = name
        this.daemonSet.metadata.annotations.app = name
        },
        // 设置label
        setDaemonSetLabels(labels) {
        this.daemonSet.metadata.labels = labels
        },
        // 删除所有label
        deleteDaemonSetLabels() {
        this.daemonSet.metadata.labels = {}
        },

        // 设置annotations
        setDaemonSetAnnotations(annotations) {
        this.daemonSet.metadata.annotations = annotations
        },
        // 删除所有annotations
        deleteDaemonSetAnnotations() {
        this.daemonSet.metadata.annotations = {}
        },

        // 设置selector,同时设置template的label
        setDaemonSetSelector(selector) {
            console.log(selector);
        this.daemonSet.spec.selector.matchLabels = selector
        this.daemonSet.spec.template.metadata.labels = selector
        },
        // 删除所有selector和template的label
        deleteDaemonSetSelector() {
        this.daemonSet.spec.selector.matchLabels = {}
        this.daemonSet.spec.template.metadata.labels = {}
        },

        // 设置template的annotations
        setDaemonSetTemplateAnnotations(annotations) {
        this.daemonSet.spec.template.metadata.annotations = annotations
        },

        // 删除所有template的annotations
        deleteDaemonSetTemplateAnnotations() {
        this.daemonSet.spec.template.metadata.annotations = {}
        },

        // 删除所有Strategy
        deleteDaemonSetStrategy() {
        this.daemonSet.spec.strategy = {}
        },


        setDaemonSetNamespace(namespace) {
        this.daemonSet.metadata.namespace = namespace
        },
        setDaemonSetReplicas(replicas) {
            this.daemonSet.spec.replicas = replicas
        },
        setDaemonSetDnsPolicy(dnsPolicy) {
            this.daemonSet.spec.template.spec.dnsPolicy = dnsPolicy
        },
        setDaemonSetStrategy(strategy) {
            this.daemonSet.spec.strategy = strategy
        },
        setDaemonSetHostNetwork(hostNetwork) {
            this.daemonSet.spec.template.spec.hostNetwork = hostNetwork
        },
        setDaemonSetImagePullSecrets(imagePullSecrets) {
            this.daemonSet.spec.template.spec.imagePullSecrets = imagePullSecrets
        },






}


})

export { useDaemonSetStore }

</script>