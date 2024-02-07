<script >
import { defineStore } from 'pinia';


const useTemplatetStore = defineStore('template',{
  
    state: () => ({
        template: {
            metadata: {
            labels: {
                app: '123',
            },
            annotations: {
                app: '123',
            },
            },
            spec: {
                restartPolicy: 'Always',
                imagePullSecrets: [],
                dnsPolicy: 'ClusterFirst',
                hostNetwork: false,
                volumes: [],
                containers: [
                    // 容器
                ],
                initContainers: [],
                nodeSelector: {},
            },
        },
        count: 1,
        container: {
        name: '',
        image: '123',
        tty: false,
        workingDir: '',
        imagePullPolicy: 'IfNotPresent',
        resources: {
        limits: {
            memory: '1024Mi',
            cpu: '1',
        },
        requests: {
            memory: '128Mi',
            cpu: '100m',
        },
        },
        ports: [],
        lifecycle: {},
    },
    
    }),

    actions: {
        addContainer() {
            this.container.name = 'container' + this.count;
            // 创建一个新的对象，与原始对象有相同的值，但是没有引用关系
            const newContainer = JSON.parse(JSON.stringify(this.container));
            this.template.spec.containers.push(newContainer);
            console.log('addContainer', this.containers);
            this.count++;
        },

        setContainersName(index,name) {
            this.containers[index].name = name
        },
        





}


})

export { useTemplatetStore }

</script>