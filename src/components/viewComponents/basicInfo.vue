<template>

<el-row >
    <el-col  >
        <el-card shadow="always" header="headerInfo"> 
            展示 Pod 的基本信息，例如 Pod 名称、命名空间、创建时间、状态等。这些是用户最常需要查看的信息 
            <br><br>
        <h3>Name: {{ itemData?.value?.metadata?.name }}</h3>
        <h3>Name: {{ name }}</h3>
    <el-descriptions  column="2">
        <el-descriptions-item label="资源类型">{{ itemData.value?.metadata?.name }}</el-descriptions-item>
        <el-descriptions-item label="资源名称">资源名称</el-descriptions-item>
        <el-descriptions-item label="命名空间">命名空间</el-descriptions-item>
        <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
        </el-descriptions-item>
  </el-descriptions>
        </el-card>
    </el-col>
  </el-row>
</template>

<script setup>

    import { onMounted,ref,watchEffect } from "vue";
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    import { storeToRefs } from "pinia";


    const postStore = UsePostStore()

    const { postData,postUrl,response,itemData } = storeToRefs(postStore)

    const name = ref('')

    onMounted(() =>{
        watchEffect(() => {
            if (itemData.value.metadata) {
                console.log('itemdata',itemData.value.metadata.name);
                name.value = itemData.value.metadata.name  
            }
        });
    })

   


   

</script>