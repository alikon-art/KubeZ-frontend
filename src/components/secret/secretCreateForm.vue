<template>
  <el-card style="margin-top: 20px;" @mouseleave="updateData" header="Secret基础设置">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="140px"
      class="demo-ruleForm"
      status-icon
    >
    <el-form-item label="secret名称" prop="secretName">
    <el-input v-model="ruleForm.secretName" />    
    </el-form-item>


    <el-form-item label="自动生成标签和注释" >
        <el-switch v-model="ruleForm.showLabelEditer" />
      </el-form-item>
        <!-- 当ruleForm.showLabel为true时,展示下面表格用于自定义deploy的标签和注释 -->
      <el-form-item v-if="ruleForm.showLabelEditer" >
        <el-tabs   v-model="activeTabName" >
          <el-tab-pane label="secret标签" name="secretLabel" > 
            <labelEditer :labels="secret.metadata.labels" :disabled="disabled"></labelEditer>
          </el-tab-pane>
          <el-tab-pane label="secret注释" name="secretAnnotation" >
          <labelEditer :labels="secret.metadata.annotations" :disabled="disabled"></labelEditer>
          </el-tab-pane>
        </el-tabs>
    </el-form-item>

</el-form>
</el-card>

  
  

  <el-card header='数据设置' style="margin-top: 20px;" >
    <labelEditer :labels="secret.stringData" :disabled="disabled" ></labelEditer>
  </el-card>

  </template>
  
  <script lang="ts" setup>
    import { onMounted, reactive, ref ,watchEffect } from 'vue'

    // 导入pinia存储库
    import { useSecretStore } from "@/model/secretStore.vue";
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    import { storeToRefs } from "pinia";

    // 导入label编辑器
    import labelEditer from '../labelEditer.vue'


    // 加载secret存储库
    const secretStore = useSecretStore()
    const { secret } = storeToRefs(secretStore)

    // 加载postdata存储库
    const postStore  =  UsePostStore()
    const { postUrl,postData ,response,itemData,componentsStatus } = storeToRefs(postStore)


    const disabled = ref(false)



    



    // 标签编辑器中当前激活的标签
    const activeTabName = ref('secretLabel')
    const ruleForm = reactive({
    labels: {},
    
    valuePairs: [
      {
      key: '',
      value: '',
      }
    ],
    
    secretName: '',

    showLabelEditer: false,

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
    secretName: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    })

  
  
    // 保存数据
    const updateData = () => {
        console.log('保存了secret数据',secret.value);
        
        // 绑定secretName
        secretStore.setSecretName(ruleForm.secretName)


      }







    // 监听postdata.value.namespace的变化
    watchEffect(() => {
        console.log('postdata-namespace改变了',postData.value.namespace)
        secretStore.setSecretNamespace(postData.value.namespace)
    })



  </script>
  