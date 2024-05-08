<template>
    <clusterAndNamespaceSelecter></clusterAndNamespaceSelecter>
    <el-card style="margin-top: 20px;" @mouseleave="updateData" header="NameSpace基础设置">
      命名空间名称：<el-input v-model="namespaceName"></el-input>
    </el-card>

    

    <div style="margin-top: 20px; float: right;  " >
    <el-button @click="create"  type="primary" >创建</el-button>
    </div>
    </template>
    
    
    <script setup>

  // import "codemirror/mode/javascript/javascript.js"
    import Codemirror from "codemirror-editor-vue3"


    import { reactive, ref, watchEffect } from 'vue'
    
    import { storeToRefs } from "pinia";
    
    import {anyToYaml} from '../../utils/jsyaml/jsyaml.vue'

    // 导入表单组件
    import clusterAndNamespaceSelecter from '../viewComponents/clusterAndNamespaceSelecter.vue';
    

    // 导入pinia存储库
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    import { useClusterStore } from "@/model/clusterStore.vue";

    // 导入通知组件
    import { Notification } from "@/utils/elements/notification.vue"
    

    // 加载post存储库
    const postStore  =  UsePostStore()
    const { postUrl,postData ,response,itemData,componentsStatus } = storeToRefs(postStore)

    const showYaml = ref(false)

    // 初始化yaml
    const itemyaml = ref({})

    const namespaceName = ref('')


    watchEffect(() => {

        itemyaml.value = anyToYaml(postData.value)
        
    })

    const viewPostdata = () => {
      console.log(postData.value)
      
    }
    
    const create = () => {
      postStore.postUrl = 'namespace/add'
      postStore.postData.name = namespaceName.value
      console.log(namespaceName.value);
      postStore.SendQuerry()
      console.log(response.value);
      if (response.value.status === "200") {
        Notification('创建成功','创建成功','success')
      } 

    }
    </script>
    