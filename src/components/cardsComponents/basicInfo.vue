<template>
<el-row >
    <el-col  >
    <el-card shadow="always" style="margin-bottom:16px" >
        <h3>{{ itemData.metadata?.name }}</h3>
        <el-button    @click="showYaml">查看Yaml</el-button>
        <el-button    @click="showEdit">日志</el-button>
        <el-button    @click="deleteItem">删除</el-button>
    </el-card>
    <el-card shadow="always" header="基本信息"> 
    <el-descriptions  column="2">
        <el-descriptions-item label="名称">{{ itemData.metadata?.name }}</el-descriptions-item>
        <el-descriptions-item label="命名空间">{{ itemData.metadata?.namespace }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ itemData.metadata?.creationTimestamp }}</el-descriptions-item>
        <el-descriptions-item label="标签" v-if="itemData.metadata?.labels" >
            <template #default="scope">
            <!-- 展示label的组件 -->
            <labelsComponents  :labels="itemData.metadata?.labels"></labelsComponents>
            </template>
        </el-descriptions-item>
        <el-descriptions-item label="uid">{{ itemData.metadata?.uid }}</el-descriptions-item>

        <!-- 注解展示出来不好看,以后再调整
        <el-descriptions-item label="注解" v-if="itemData.metadata?.annotations" >
            <template #default="scope">
            <labelsComponents  :labels="itemData.metadata?.annotations"></labelsComponents>
            </template>
        </el-descriptions-item>
    <el-descriptions-item label="uid">{{ itemData.metadata?.uid }}</el-descriptions-item> -->


    <!-- <el-descriptions-item label="资源版本">{{ itemData.metadata?.resourceVersion }}</el-descriptions-item> -->
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
