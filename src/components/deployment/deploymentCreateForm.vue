<template>
  <el-card style="margin-top: 20px;" @mouseleave="updateData">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="140px"
      class="demo-ruleForm"
      status-icon
    >
    <el-form-item label="deployment名称" prop="deploymentName">
    <el-input v-model="ruleForm.deploymentName" />    
    </el-form-item>

    <el-form-item label="副本数" prop="replicas">
        <el-slider v-model="ruleForm.replicas" :step="1" show-stops :max="10" show-input/>
    </el-form-item>

      <el-form-item label="Dns策略" prop="dnsPolicy">
      <el-select v-model="ruleForm.dnsPolicy" >
        <el-option  value="ClusterFirst" />
        <el-option  value="ClusterFirstWithHostNet" />
        <el-option  value="None" />
      </el-select>
    </el-form-item>

    <el-form-item label="使用主机网络" prop="hostNetwork">
        <el-switch v-model="ruleForm.hostNetwork" />
    </el-form-item>

    <el-form-item label="自动生成标签和注释" >
        <el-switch v-model="ruleForm.showLabelEditer" />

      </el-form-item>
        <!-- 当ruleForm.showLabel为true时,展示下面表格用于自定义deploy的标签和注释 -->
      <el-form-item v-if="ruleForm.showLabelEditer" >
        <div>
        <el-tabs   v-model="activeTabName">
          <el-tab-pane label="控制器标签" name="controllerLabel" />
          <el-tab-pane label="控制器注释" name="controllerAnnotation" />
          <el-tab-pane label="Pod模板标签" name="podTemplateLabel" />
          <el-tab-pane label="Pod模板注释" name="podTemplateAnnotation" />
          

        <el-table :data="ruleForm.valuePairs">
            <el-table-column label="key" prop="key" width="180">
              <template v-slot="{ row }">
                <el-input v-model="row.key" />
              </template>
            </el-table-column>
            <el-table-column label="value" prop="value" width="180">
              <template v-slot="{ row }">
                <el-input v-model="row.value" />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template v-slot="{ row }">
                <el-button
                  type="text"
                  size="small"
                  @click="deletelabel(row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="addlabel">添加label</el-button>
        <el-button @click="saveLabel">保存</el-button>


        </el-tabs>
      </div>
    </el-form-item>

 

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  </template>
  
  <script lang="ts" setup>
    import { reactive, ref ,watchEffect } from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'

    // 导入pinia存储库
    import { useDeploymentStore } from "@/model/deploymentStore.vue";
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    import { storeToRefs } from "pinia";

    // 加载deployment存储库
    const deploymentStore = useDeploymentStore()
    const { deployment } = storeToRefs(deploymentStore)

    // 加载postdata存储库
    const postStore  =  UsePostStore()
    const { postUrl,postData ,response,itemData,componentsStatus } = storeToRefs(postStore)




    // 添加label的方法
    const addlabel = () => {
    ruleForm.valuePairs.push({
        key: '',
        value: '',
    })
    console.log(ruleForm.valuePairs);
    
    }

    // 删除label的方法
    const deletelabel = (row: any) => {
    const index = ruleForm.valuePairs.indexOf(row)
    ruleForm.valuePairs.splice(index, 1)
    }

    // 保存编辑器中label的方法,将数据添加到ruleForm.label中
    // 会将{key: 'app',value:'nginx'}格式的valuePairs转换成符合deployment的label格式
    const saveLabel = () => {
      // 如果当前激活的标签页是controllerLabel,则保存label到deployment.metadata.labels
      if (activeTabName.value === 'controllerLabel') {
        // 初始化label
        deploymentStore.deleteDeploymentLabels()
        ruleForm.label = {}
        // 将valuePairs转换成ruleForm.label
        ruleForm.valuePairs.forEach((item) => {
          ruleForm.label[item.key] = item.value
        })
        // 将label存入deploymentStore
        deploymentStore.setDeploymentLabels(ruleForm.label)
      }
      // 如果当前激活的标签页是controllerAnnotation,则保存annotation到deployment.metadata.annotations
      else if (activeTabName.value === 'controllerAnnotation') {
        // 初始化annotation
        deploymentStore.deleteDeploymentAnnotations()
        ruleForm.label = {}
        // 将valuePairs转换成ruleForm.label
        ruleForm.valuePairs.forEach((item) => {
          ruleForm.label[item.key] = item.value
        })
        // 将label存入deploymentStore
        deploymentStore.setDeploymentAnnotations(ruleForm.label)
      }
      // 如果当前激活的标签页是podTemplateLabel,则保存label到deployment.spec.template.metadata.labels
      else if (activeTabName.value === 'podTemplateLabel') {
        // 初始化label
        deploymentStore.deleteDeploymentSelector()
        ruleForm.label = {}
        // 将valuePairs转换成ruleForm.label
        ruleForm.valuePairs.forEach((item) => {
          ruleForm.label[item.key] = item.value
        })
        // 将label存入deploymentStore
        deploymentStore.setDeploymentSelector(ruleForm.label)
      }
      // 如果当前激活的标签页是podTemplateAnnotation,则保存annotation到deployment.spec.template.metadata.annotations
      else if (activeTabName.value === 'podTemplateAnnotation') {
        // 初始化annotation
        deploymentStore.deleteDeploymentTemplateAnnotations()
        ruleForm.label = {}
        // 将valuePairs转换成ruleForm.label
        ruleForm.valuePairs.forEach((item) => {
          ruleForm.label[item.key] = item.value
        })
        // 将label存入deploymentStore
        deploymentStore.setDeploymentTemplateAnnotations(ruleForm.label)
      }


    }
                
    // const ruleFormRef = ref<FormInstance>()

    // 标签编辑器中当前激活的标签
    const activeTabName = ref('controllerLabel')
    const ruleForm = reactive({
    label: {},
    
    valuePairs: [
      {
      key: 'app',
      value: 'nginx',
      }
    ],
    
    deploymentName: '',
    replicas: 1,
    dnsPolicy: 'ClusterFirst',
    hostNetwork: false,

    imagePullSecrets: '',
    showLabelEditer: false,


    })

    const rules = reactive({
    deploymentName: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    })


  
  
    // 更新数据
    const updateData = () => {
        console.log('保存了deployment数据');
        
        // 绑定deploymentName
        deploymentStore.setDeploymentName(ruleForm.deploymentName)
        
        // 绑定replicas
        deploymentStore.setDeploymentReplicas(ruleForm.replicas)
        // 绑定dnsPolicy
        deploymentStore.setDeploymentDnsPolicy(ruleForm.dnsPolicy)

        // 绑定hostNetwork
        deploymentStore.setDeploymentHostNetwork(ruleForm.hostNetwork)

        // 如果未启用标签编辑器,则自动创建注释和标签
        if (!ruleForm.showLabelEditer) {
          console.log('未启用标签编辑器,自动创建标签和注释');
          
          // 创建标签
          deploymentStore.setDeploymentLabels({
              app: ruleForm.deploymentName
          })
          // 创建注释
          deploymentStore.setDeploymentAnnotations({
              app: ruleForm.deploymentName
          })
          // 创建selector,同时设置template的label
          deploymentStore.setDeploymentSelector({
              app: ruleForm.deploymentName
          })
          // 创建pod模板注释
          deploymentStore.setDeploymentTemplateAnnotations({
              app: ruleForm.deploymentName
          }) 
        }
        // 启用标签编辑器,则使用编辑器中的标签和注释
        else {
          console.log('启用标签编辑器,使用编辑器中的标签和注释');
          saveLabel()
        }
      }

    // 监听postdata.value.namespace的变化
    watchEffect(() => {
        console.log('postdata-namespace改变了',postData.value.namespace)
        deploymentStore.setDeploymentNamespace(postData.value.namespace)
    })

  </script>
  