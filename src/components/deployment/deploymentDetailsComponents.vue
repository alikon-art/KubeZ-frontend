<template>

    <basicInfo></basicInfo>
    <status></status>
    <deploymentInfoCard></deploymentInfoCard>
    <containersInfo  :containers="itemData.spec?.template?.spec?.containers"></containersInfo>
    <volumeInfo></volumeInfo>
    



</template>


<script setup>
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    import { storeToRefs } from "pinia";
    import { onMounted, ref } from "vue";
    import { useRoute } from 'vue-router'

    import basicInfo from "../cardsComponents/basicInfo.vue"
    import status from "../cardsComponents/status.vue"
    import deploymentInfoCard from "./deploymentInfoCard.vue"
    import containersInfo from '../cardsComponents/containersInfo.vue'
    import volumeInfo from '../cardsComponents/volumeInfo.vue'
    

    const postStore = UsePostStore()
    const { postData,postUrl,response,itemData } = storeToRefs(postStore)
    
    const route = useRoute()

    // 挂载时发起网络请求
    onMounted(async () =>{
        postUrl.value='/deployment/get'
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