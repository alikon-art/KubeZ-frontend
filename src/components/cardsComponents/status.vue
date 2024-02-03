<template>

    <el-row >
        <el-col  >
        <el-card shadow="always" header="运行状态">
        <el-descriptions  column="2">
        <el-descriptions-item label="状态">{{ itemData.status?.phase }}</el-descriptions-item>
        <el-descriptions-item  label="podIP">{{ itemData.status?.podIP }}</el-descriptions-item>
        <el-descriptions-item  label="hostIP">{{ itemData.status?.hostIP }}</el-descriptions-item>
        <el-descriptions-item  label="启动时间">{{ itemData.status?.startTime }}</el-descriptions-item>
        <el-descriptions-item label="qosClass">{{ itemData.status?.qosClass }}</el-descriptions-item>
        

      </el-descriptions>
            </el-card>
        </el-col>
      </el-row>
    </template>
    
    <script setup>
    
        import { onMounted,ref,watchEffect } from "vue";
        import { UsePostStore } from "../../utils/pinia/postStore.vue";
        import { storeToRefs } from "pinia";
        import labelsComponents from '../labelsComponents.vue'
    
    
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
    