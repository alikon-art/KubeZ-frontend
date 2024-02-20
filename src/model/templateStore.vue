<script >
import { defineStore } from 'pinia';


const useTemplatetStore = defineStore('template',{
  
    state: () => ({
        template: {
            metadata: {
            labels: {},
            annotations: {},
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
            image: '',
            tty: false,
            workingDir: '',
            imagePullPolicy: 'IfNotPresent',
            ports: [],
            lifecycle: {},
            volumeMounts: [],
            env: [],
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
            
        },

    
    }),

    actions: {

        //
        // 容器操作类
        //
        //
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

        // 添加容器
        addContainer() {
            this.container.name = 'container' + this.count;
            // 创建一个新的对象，与原始对象有相同的值，但是没有引用关系
            const newContainer = JSON.parse(JSON.stringify(this.container));
            this.template.spec.containers.push(newContainer);
            console.log('addContainer', this.containers);
            this.count++;
        },



        //
        // 添加容器参数类
        //
        //
        // 根据索引,添加资源限制
        addContainerResources(index) {
            this.template.spec.containers[index].resources = this.resources;
        },



        //
        // 修改容器参数类
        //
        //
        // 根据索引,设置容器名称
        setContainersName(index,name) {
            this.template.spec.containers[index].name = name
        },

        // 根据索引,设置容器镜像
        setContainersImage(index,image) {
            this.template.spec.containers[index].image = image
        },
        
        // 根据索引,设置容器镜像拉取策略
        setContainersImagePullPolicy(index,imagePullPolicy) {
            this.template.spec.containers[index].imagePullPolicy = imagePullPolicy
        },

        // 根据索引,设置容器工作目录
        setContainersWorkingDir(index,workingDir) {
            this.template.spec.containers[index].workingDir = workingDir
        },

        // 根据索引,设置容器tty
        setContainersTty(index,tty) {
            this.template.spec.containers[index].tty = tty
        },

        // 根据索引,设置容器资源requests    
        setContainersResources(index,resources) {
            this.template.spec.containers[index].resources = resources
        },

        // 根据索引,设置容器生命周期
        setContainersLifecycle(index,lifecycle) {
            this.template.spec.containers[index].lifecycle = lifecycle
        },

        // 根据索引,设置容器端口
        setContainersPorts(index,ports) {
            this.template.spec.containers[index].ports = ports
        },

        // 根据索引,设置容器环境变量
        setContainersEnv(index,env) {
            this.template.spec.containers[index].env = env
        },

        // 根据索引,设置容器命令
        setContainersCommand(index,command) {
            this.template.spec.containers[index].command = command
        },

        // 根据索引,设置容器参数
        setContainersArgs(index,args) {
            this.template.spec.containers[index].args = args
        },

        // 根据索引,设置容器卷
        setContainersVolumeMounts(index,volumeMounts) {
            this.template.spec.containers[index].volumeMounts = volumeMounts
        },

        // 根据索引,设置容器镜像拉取密钥
        setContainersImagePullSecrets(index,imagePullSecrets) {
            this.template.spec.containers[index].imagePullSecrets = imagePullSecrets
        },









        





}


})

export { useTemplatetStore }

</script>