<template>
  <el-card style="margin-top: 20px;" @mouseleave="updateData" header="Configmap基础设置">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="140px"
      class="demo-ruleForm"
      status-icon
    >
    <el-form-item label="configmap名称" prop="configmapName">
    <el-input v-model="ruleForm.configmapName" />    
    </el-form-item>


    <el-form-item label="自动生成标签和注释" >
        <el-switch v-model="ruleForm.showLabelEditer" />
      </el-form-item>
        <!-- 当ruleForm.showLabel为true时,展示下面表格用于自定义deploy的标签和注释 -->
      <el-form-item v-if="ruleForm.showLabelEditer" >
        <el-tabs   v-model="activeTabName" >
          <el-tab-pane label="configmap标签" name="configmapLabel" > 
            <labelEditer :labels="configmap.metadata.labels" :disabled="disabled"></labelEditer>
          </el-tab-pane>
          <el-tab-pane label="configmap注释" name="configmapAnnotation" >
          <labelEditer :labels="configmap.metadata.annotations" :disabled="disabled"></labelEditer>
          </el-tab-pane>
        </el-tabs>
    </el-form-item>

</el-form>
</el-card>

  
  

  <el-card header='数据设置' style="margin-top: 20px;" >
    <labelEditer :labels="configmap.data" :disabled="disabled" ></labelEditer>
  </el-card>

  </template>
  
  <script lang="ts" setup>
    import { onMounted, reactive, ref ,watchEffect } from 'vue'

    // 导入pinia存储库
    import { useConfigmapStore } from "@/model/configmapStore.vue";
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    import { storeToRefs } from "pinia";

    // 导入label编辑器
    import labelEditer from '../labelEditer.vue'


    // 加载configmap存储库
    const configmapStore = useConfigmapStore()
    const { configmap } = storeToRefs(configmapStore)

    // 加载postdata存储库
    const postStore  =  UsePostStore()
    const { postUrl,postData ,response,itemData,componentsStatus } = storeToRefs(postStore)


    const disabled = ref(false)



    



    // 标签编辑器中当前激活的标签
    const activeTabName = ref('configmapLabel')
    const ruleForm = reactive({
    labels: {},
    
    valuePairs: [
      {
      key: '',
      value: '',
      }
    ],
    
    configmapName: '',

    Ports: [{
        port: '',
        targetPort: '',
        protocol: 'TCP',
        name: '',
    }],

    // 存放资源列表供选择
    itemlist:[],
    itemName: '',
    itemType: '',


  

    })

    const rules = reactive({
    configmapName: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    })

  
  
    // 保存数据
    const updateData = () => {
        console.log('保存了configmap数据',configmap.value);
        
        // 绑定configmapName
        configmapStore.setConfigmapName(ruleForm.configmapName)


      }







    // 监听postdata.value.namespace的变化
    watchEffect(() => {
        console.log('postdata-namespace改变了',postData.value.namespace)
        configmapStore.setConfigmapNamespace(postData.value.namespace)
    })



  </script>
  