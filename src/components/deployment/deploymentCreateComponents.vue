<template>
    <clusterAndNamespaceSelecter></clusterAndNamespaceSelecter>

    <el-card style="margin-top: 20px;">
    <deploymentForm></deploymentForm>
    
    </el-card>
    
    
    <!-- <el-card style="margin-top: 20px;">
        <el-input
        v-model="itemyaml"
        autosize
        type="textarea"
        placeholder="Please input"
      />
    </el-card> -->
    <el-button @click="addContainer" >添加容器</el-button>
    <el-button @click="pushTest" >测试</el-button>
    <el-card style="margin-top: 20px;">
        <el-input
        v-model="itemyaml"
        autosize
        type="textarea"
        placeholder="Please input"
      />
    </el-card>
    </template>
    
    
    <script setup>
    import { reactive, ref, watchEffect } from 'vue'
    
    import { storeToRefs } from "pinia";
    
    import {anyToYaml} from '../../utils/jsyaml/jsyaml.vue'

    import deploymentForm from './deploymentForm.vue'
    import clusterAndNamespaceSelecter from '../viewComponents/clusterAndNamespaceSelecter.vue';
    

    // 导入pinia存储库
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    import { useDeploymentStore } from "@/model/deploymentStore.vue";
    import { useTemplatetStore } from "@/model/templateStore.vue";
    

    // 加载post存储库
    const postStore  =  UsePostStore()
    const { postUrl,postData ,response,itemData,componentsStatus } = storeToRefs(postStore)

    // 加载deployment存储库
    const deploymentStore = useDeploymentStore()
    const { deployment } = storeToRefs(deploymentStore)

    // 加载template存储库
    const templateStore = useTemplatetStore()
    const { containers,template } = storeToRefs(templateStore)


    // 初始化yaml
    const itemyaml = ref({})

    const addContainer = () =>{
      templateStore.addContainer()
    
    }


  templateStore.addContainer()
  templateStore.addContainer()

    // itemyaml.value = anyToYaml(containers.value)


    // 添加容器到deployment
    deploymentStore.deployment.spec.template = template.value

    watchEffect(() => {

        itemyaml.value = anyToYaml(deployment.value)
    })
    
    </script>
    