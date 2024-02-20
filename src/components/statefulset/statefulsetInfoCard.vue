<template>

    <el-row >
        <el-col  >
        <el-card shadow="always" header="Statefulset详情">
        <el-descriptions  column="2">
            <el-descriptions-item label="选择器">
                <labelsComponents :labels="itemData.spec?.selector.matchLabels"></labelsComponents>
            </el-descriptions-item>
            <el-descriptions-item label="副本数">{{ itemData.spec?.replicas }}</el-descriptions-item>
            <el-descriptions-item label="重启策略">{{ itemData.spec?.template?.spec?.restartPolicy }}</el-descriptions-item>
            <el-descriptions-item label="DNS策略">{{ itemData.spec?.template?.spec?.dnsPolicy }}</el-descriptions-item>
            <el-descriptions-item label="服务账户">{{ itemData.spec?.template?.spec?.serviceAccountName }}</el-descriptions-item>
            <el-descriptions-item label="容器数量">{{ itemData.spec?.template?.spec?.containers.length }}</el-descriptions-item>
            <el-descriptions-item label="更新方式">{{ itemData.spec?.strategy?.type }}</el-descriptions-item>

           


        </el-descriptions>

          <!-- 点击展开更多信息 -->
          <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="更多信息" name="1">
                    <el-descriptions  column="1">

                        <el-descriptions-item label="最大不可用">{{ itemData.spec?.strategy?.rollingUpdate?.maxUnavailable }}</el-descriptions-item>
                        <el-descriptions-item label="最大不可用百分比">{{ itemData.spec?.strategy?.rollingUpdate?.maxSurge }}</el-descriptions-item>
                        <el-descriptions-item label="模板">
                            <el-descriptions  column="1">
                                <el-descriptions-item label="名称">{{ itemData.spec?.template?.metadata?.name }}</el-descriptions-item>
                                <el-descriptions-item label="命名空间">{{ itemData.spec?.template?.metadata?.namespace }}</el-descriptions-item>
                                <el-descriptions-item label="标签">
                                    <labelsComponents :labels="itemData.spec?.template?.metadata?.labels"></labelsComponents>
                                </el-descriptions-item>
                    
                </el-descriptions>
            </el-descriptions-item>


                    </el-descriptions>
                </el-collapse-item>
            </el-collapse>  
        </el-card >



            <!-- <el-card  header="容器详情" style="margin-top:20px">
                <template #default="scope">
                <containersInfo  :containers="itemData.spec?.template?.spec?.containers"></containersInfo>
                </template>
            </el-card>

            <el-card  header="volume详情" style="margin-top:20px">
                <template #default="scope">
                <volumeInfo  :volumes="itemData.spec?.template?.spec?.volumes"></volumeInfo>
                </template>
            </el-card> -->
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
    