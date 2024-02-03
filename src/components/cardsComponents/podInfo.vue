<template>

    <el-row >
        <el-col  >
        <el-card shadow="always" header="Pod详情">
        <el-descriptions  column="2">
            <el-descriptions-item label="nodeName">{{ itemData.spec?.nodeName }}</el-descriptions-item>
            <el-descriptions-item label="重启策略">{{ itemData.spec?.restartPolicy }}</el-descriptions-item>
            <el-descriptions-item label="DNS策略">{{ itemData.spec?.dnsPolicy }}</el-descriptions-item>
            <el-descriptions-item label="服务账户">{{ itemData.spec?.serviceAccountName }}</el-descriptions-item>
            <el-descriptions-item label="容器数量">{{ itemData.spec?.containers.length }}</el-descriptions-item>
            <el-descriptions-item label="卷数量">{{ itemData.spec?.volumes.length }}</el-descriptions-item>


        </el-descriptions>
        </el-card >

            <el-card v-if="itemData.spec?.containers" header="容器详情" style="margin-top:20px">
                <template #default="scope">
                <containersInfo  :containers="itemData.spec?.containers"></containersInfo>
                </template>
            </el-card>
        </el-col>
      </el-row>
    </template>
    
    <script setup>
    
        import { onMounted,ref,watchEffect } from "vue";
        import { UsePostStore } from "../../utils/pinia/postStore.vue";
        import { storeToRefs } from "pinia";

        import labelsComponents from '../labelsComponents.vue'
        import containersInfo from './containersInfo.vue'
    
    
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
    