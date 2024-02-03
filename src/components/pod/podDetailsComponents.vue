<template>

    <basicInfo></basicInfo>

  <el-row >
    <el-col  >
        <el-card shadow="always" header="overview"> 
            展示 Pod 的一些关键信息，例如 IP 地址、所在节点、标签、注解等

        </el-card>
    </el-col>
  </el-row>

  <el-row >
    <el-col  >
        <el-card shadow="always" header="containerInfo"> 
            例如容器的名称、镜像、启动命令、环境变量、资源限制/请求等

        </el-card>
    </el-col>
  </el-row>


</template>


<script setup>
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    import { storeToRefs } from "pinia";
    import { onMounted, ref } from "vue";
    import { useRoute } from 'vue-router'
    import basicInfo from "../viewComponents/basicInfo.vue"

    const postStore = UsePostStore()
    const { postData,postUrl,response,itemData } = storeToRefs(postStore)
    
    const route = useRoute()

    onMounted(async () =>{
        postUrl.value='/pod/get'
        if (route.query.name != null) {
            postData.value.name = route.query.name
            postData.value.namespace = route.query.namespace
            console.log('querry name not nil',postData.value);
        }else{
            console.log("name is nil,use default");
        }
        
        await postStore.SendQuerry()
        
        // console.log('Response:', response.value);
        // console.log('itemData:', itemData.value);
    })
    

    




</script>

<style>
.el-row {
  margin-bottom: 20px;
  
}
.el-col {
  border-radius: 4px;
}

</style>