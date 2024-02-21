<template>

    <el-row >
        <el-col  >
        <el-card shadow="always" header="Configmap详情"> 
            <labelEditer :labels="itemData.data" :disabled=true ></labelEditer>
        
        </el-card >

        

        </el-col>
      </el-row> 


    </template>
    
    <script setup>
    
        import { onMounted,ref,watchEffect } from "vue";
        import { UsePostStore } from "../../utils/pinia/postStore.vue";
        import { storeToRefs } from "pinia";

        import labelEditer from '../labelEditer.vue'

    
    
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
    