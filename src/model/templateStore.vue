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
            this.container.name = 'Container' + this.count;
            // 创建一个新的对象，与原始对象有相同的值，但是没有引用关系
            const newContainer = JSON.parse(JSON.stringify(this.container));
            this.template.spec.containers.push(newContainer);
            console.log('addContainer', this.containers);
            this.count++;
        },
        // 根据容器名称,返回template中容器索引
        getContainerIndex(name) {
            return this.template.spec.containers.findIndex((item) => item.name === name);
        
        },

        // 根据容器名称,删除容器
        removeContainerWithName(name) {
            const index = this.template.spec.containers.findIndex((item) => item.name === name);
            this.template.spec.containers.splice(index, 1);
        },
        
        // 根据索引,删除容器
        removeContainerWithIndex(index) {
            this.template.spec.containers.splice(index, 1);
        },

        setContainersName(index,name) {
            this.template.spec.containers[index].name = name
        },

        setContainersImage(index,image) {
            this.template.spec.containers[index].image = image
        },


        





}


})

export { useTemplatetStore }

</script>