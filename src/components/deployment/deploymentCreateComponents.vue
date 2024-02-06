<template>
    <el-card>
    <deploymentForm></deploymentForm>
    
    </el-card>
    
    
    
    
    
        podcreate
        <el-input
        v-model="podyaml"
        autosize
        type="textarea"
        placeholder="Please input"
      />
    </template>
    
    
    <script setup>
    import { reactive, ref } from 'vue'
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    import { storeToRefs } from "pinia";
    
    import {anyToYaml} from '../../utils/jsyaml/jsyaml.vue'
    import {pod} from '../../model/pod.vue'
    import deploymentForm from './deploymentForm.vue'
    
    
    const postStore  =  UsePostStore()
    const { postUrl,postData ,response,itemData,componentsStatus } = storeToRefs(postStore)
    
    const podyaml = ref({})
    podyaml.value = anyToYaml(pod)
    
    </script>
    