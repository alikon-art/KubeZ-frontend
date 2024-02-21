<template>

    <basicInfo></basicInfo>
    <!-- <status></status> -->
    <secretInfoCard></secretInfoCard>

    



</template>


<script setup>


    import { storeToRefs } from "pinia";
    import { onMounted, ref } from "vue";
    import { useRoute } from 'vue-router'

    import basicInfo from "../cardsComponents/basicInfo.vue"
    import status from "../cardsComponents/status.vue"
    import secretInfoCard from "./secretInfoCard.vue"

    
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    

    const postStore = UsePostStore()
    const { postData,postUrl,response,itemData } = storeToRefs(postStore)


    
    const route = useRoute()

    // 挂载时发起网络请求
    onMounted(async () =>{
        postUrl.value='/secret/get'
        if (route.query.name != null) {
            postData.value.name = route.query.name
            postData.value.namespace = route.query.namespace
            console.log('querry name not nil',postData.value);
        }else{
            console.log("name is nil,use default");
        }
        
        await postStore.SendQuerry()
        
        // console.log('Response:', response.value);
        console.log('itemData:', itemData.value);
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