<template>

    building...
    



</template>


<!-- <script setup>


    import { storeToRefs } from "pinia";
    import { onMounted, ref } from "vue";
    import { useRoute } from 'vue-router'

    import basicInfo from "../cardsComponents/basicInfo.vue"
    import status from "../cardsComponents/status.vue"
    import deploymentInfoCard from "./deploymentInfoCard.vue"
    import containersInfo from '../cardsComponents/containersInfo.vue'
    import volumeInfo from '../cardsComponents/volumeInfo.vue'
    
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    

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
        console.log('itemData:', itemData.value);
    })
    



    




</script>
 -->
