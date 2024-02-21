<template>
    <clusterAndNamespaceSelecter></clusterAndNamespaceSelecter>

    <clusterCreateForm></clusterCreateForm>

    

    <div style="margin-top: 20px; float: right;  " >
    <el-button @click="showYaml = true ">预览Yaml</el-button>
    <el-button @click="create"  type="primary" >创建</el-button>
    </div>

    <!-- 侧边弹出框 -->
    <el-drawer
      v-model="showYaml"
      title="Yaml预览"
      :direction="btt"
      size="60%"
    >
    <el-card style="margin-top: 20px;">
    <Codemirror v-model:value="itemyaml " />
    </el-card>
    </el-drawer>



    </template>
    
    
    <script setup>

  // import "codemirror/mode/javascript/javascript.js"
    import Codemirror from "codemirror-editor-vue3"


    import { reactive, ref, watchEffect } from 'vue'
    
    import { storeToRefs } from "pinia";
    
    import {anyToYaml} from '../../utils/jsyaml/jsyaml.vue'

    // 导入表单组件
    import clusterCreateForm from './clusterCreateForm.vue'
    import clusterAndNamespaceSelecter from '../viewComponents/clusterAndNamespaceSelecter.vue';
    

    // 导入pinia存储库
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    import { useClusterStore } from "@/model/clusterStore.vue";

    // 导入通知组件
    import { Notification } from "@/utils/elements/notification.vue"
    

    // 加载post存储库
    const postStore  =  UsePostStore()
    const { postUrl,postData ,response,itemData,componentsStatus } = storeToRefs(postStore)

    // 加载secret存储库
    const clusterStore = useClusterStore()




    const showYaml = ref(false)



    // 初始化yaml
    const itemyaml = ref({})

    const addContainer = () =>{
      templateStore.addContainer()
    
    }

    // itemyaml.value = anyToYaml(containers.value)


    

    // 添加deplotment到postdata
    postStore.postData.item = clusterStore.secret



    watchEffect(() => {

        itemyaml.value = anyToYaml(postData.value)
        
    })

    const viewPostdata = () => {
      console.log(postData.value)
      
    }
    
    const create = () => {
      postStore.postUrl = 'secret/add'
      clusterStore.secret.metadata.namespace = 'kubez'
      postStore.SendQuerry()
      console.log(response.value);
      if (response.value.status === "200") {
        Notification('创建成功','创建成功','success')
      } 

    }
    </script>
    