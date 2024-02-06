<template>

    <el-row >
        <el-col  >
        <el-card shadow="always" header="Pod详情">
        <el-descriptions  column="2">
            <el-descriptions-item label="Node名称">{{ itemData.spec?.nodeName }}</el-descriptions-item>
            <el-descriptions-item label="重启策略">{{ itemData.spec?.restartPolicy }}</el-descriptions-item>
            <el-descriptions-item label="DNS策略">{{ itemData.spec?.dnsPolicy }}</el-descriptions-item>
            <el-descriptions-item label="服务账户">{{ itemData.spec?.serviceAccountName }}</el-descriptions-item>
            <el-descriptions-item label="容器数量">{{ itemData.spec?.containers.length }}</el-descriptions-item>
            <el-descriptions-item label="卷数量">{{ itemData.spec?.volumes.length }}</el-descriptions-item>

        </el-descriptions>

          <!-- 点击展开更多信息 -->
          <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="更多信息" name="1">
                    <el-descriptions  column="1">
                        <el-descriptions-item v-if=itemData.spec?.hostNetwork label="主机网络">{{ itemData.spec?.hostNetwork }}</el-descriptions-item>
                        <el-descriptions-item v-if="itemData.spec?.hostPID" label="主机PID">{{ itemData.spec?.hostPID }}</el-descriptions-item>
                        <el-descriptions-item v-if="itemData.spec?.hostIPC" label="主机IPC">{{ itemData.spec?.hostIPC }}</el-descriptions-item>
                        <el-descriptions-item v-if="itemData.spec?.securityContext" label="安全上下文">{{ itemData.spec?.securityContext }}</el-descriptions-item>
                        <el-descriptions-item label="污点">
                            <el-tag effect="plain" v-for="toleration in itemData.spec?.tolerations" :key="toleration.key">{{ toleration.key }} : {{ toleration.operator }} : {{ toleration.effect }}: {{ toleration.tolerationSeconds }}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="节点选择器">
                            <el-tag effect="plain" v-for="(val,key,i) in itemData.spec?.nodeSelector" :key="i">{{ key }} : {{ val }}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="主机名">{{ itemData.spec?.hostname }}</el-descriptions-item>
                        <el-descriptions-item label="主机域名">{{ itemData.spec?.subdomain }}</el-descriptions-item>
                        <el-descriptions-item label="主机名模式">{{ itemData.spec?.hostAliases }}</el-descriptions-item>
                        <el-descriptions-item label="priorityClassName">{{ itemData.spec?.priorityClassName }}</el-descriptions-item>
                        <el-descriptions-item label="调度器名称">{{ itemData.spec?.schedulerName }}</el-descriptions-item>
                        <el-descriptions-item label="enableServiceLinks">{{ itemData.spec?.enableServiceLinks }}</el-descriptions-item>
                        <el-descriptions-item label="preemptionPolicy">{{ itemData.spec?.preemptionPolicy }}</el-descriptions-item>
                        <el-descriptions-item label="overhead">{{ itemData.spec?.overhead }}</el-descriptions-item>
                        <el-descriptions-item label="DNS配置">{{ itemData.spec?.dnsConfig }}</el-descriptions-item>
                        <el-descriptions-item label="共享进程命名空间">{{ itemData.spec?.shareProcessNamespace }}</el-descriptions-item>
                        
                    </el-descriptions>
                </el-collapse-item>
            </el-collapse>  
        </el-card >

           
        </el-col>
      </el-row>
    </template>
    
    <script setup>
    
        import { onMounted,ref,watchEffect } from "vue";
        import { UsePostStore } from "../../utils/pinia/postStore.vue";
        import { storeToRefs } from "pinia";

        import labelsComponents from '../labelsComponents.vue'
        import containersInfo from '../cardsComponents/containersInfo.vue'
        import volumeInfo from '../cardsComponents/volumeInfo.vue'
    
    
        const postStore = UsePostStore()
    
        let { postData,postUrl,response,itemData } = storeToRefs(postStore)
    
        const name = ref('')
    
        onMounted(() => {
            watchEffect(() => {
                    if (itemData.value.metadata) {
                        console.log('itemdata', itemData.value);
                        name.value = itemData.value.metadata.name;
                    }
                });
        
        });
        </script>
    