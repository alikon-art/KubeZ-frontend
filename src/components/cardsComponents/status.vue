<!-- 资源详情页中展示运行状态的卡片组件
会从当前url中判断资源类型，然后根据资源类型展示不同的运行状态信息 -->
<template>

    <el-row >
        <el-col  >
        <el-card shadow="always" header="运行状态">
        <el-descriptions  column="2">
        <!-- pod展示以下字段 -->
        <template v-if="resourcesType === 'pod'">
        <el-descriptions-item label="状态">{{ itemData.status?.phase }}</el-descriptions-item>
        <el-descriptions-item  label="podIP">{{ itemData.status?.podIP }}</el-descriptions-item>
        <el-descriptions-item  label="hostIP">{{ itemData.status?.hostIP }}</el-descriptions-item>
        <el-descriptions-item  label="启动时间">{{ itemData.status?.startTime }}</el-descriptions-item>
        <el-descriptions-item label="qosClass">{{ itemData.status?.qosClass }}</el-descriptions-item>
        </template>
        <!-- deployment展示以下字段 -->
        <template v-if="resourcesType === 'deployment'">
        <el-descriptions-item label="observedGeneration">{{ itemData.status?.observedGeneration }}</el-descriptions-item>
        <el-descriptions-item label="readyReplicas">{{ itemData.status?.readyReplicas }}</el-descriptions-item>
        <el-descriptions-item label="replicas">{{ itemData.status?.replicas }}</el-descriptions-item>
        <el-descriptions-item label="unavailableReplicas">{{ itemData.status?.unavailableReplicas }}</el-descriptions-item>
        <el-descriptions-item label="updatedReplicas">{{ itemData.status?.updatedReplicas }}</el-descriptions-item>
        </template>
        <!-- statefulset展示以下字段 -->
        <template v-if="resourcesType === 'statefulset'">
        <el-descriptions-item label="observedGeneration">{{ itemData.status?.observedGeneration }}</el-descriptions-item>
        <el-descriptions-item label="readyReplicas">{{ itemData.status?.readyReplicas }}</el-descriptions-item>
        <el-descriptions-item label="replicas">{{ itemData.status?.replicas }}</el-descriptions-item>
        <el-descriptions-item label="currentReplicas">{{ itemData.status?.currentReplicas }}</el-descriptions-item>
        <el-descriptions-item label="updateRevision">{{ itemData.status?.updateRevision }}</el-descriptions-item>
        <el-descriptions-item label="currentRevision">{{ itemData.status?.currentRevision }}</el-descriptions-item>
        </template>
        </el-descriptions>

        <template v-if="itemData.status?.conditions">
        <el-descriptions column="1">
        <el-descriptions-item label="conditions">
            <conditions :conditions="itemData.status.conditions"></conditions>
        </el-descriptions-item>
        </el-descriptions>
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
        import conditions from './conditions.vue'

        // 导入路由组件,用于获取当前url
        import { useRoute } from 'vue-router'
        const route = useRoute()

        // 根据当前页面url判断资源类型
        const resourcesType = route.path.split('/')[1].split('Detail')[0]
        console.log('当前资源类型:'+resourcesType);



    
    
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
    