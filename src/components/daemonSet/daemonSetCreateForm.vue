<template>
  <el-card style="margin-top: 20px;" @mouseleave="updateData" header="DaemonSet基础设置">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="140px"
      class="demo-ruleForm"
      status-icon
    >
    <el-form-item label="daemonSet名称" prop="daemonSetName">
    <el-input v-model="ruleForm.daemonSetName" />    
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

    <el-form-item label="更新方式" >
      <el-select v-model="ruleForm.strategy.type" >
        <el-option  value="RollingUpdate" />
        <el-option  value="Recreate" />
      </el-select>
      <!-- <div v-if="ruleForm.strategy.type ===  'RollingUpdate'" > -->
      <el-form-item label="最大可用" prop="maxSurge" label-width="auto" style="margin-top: 15px;margin-right: 15px;" v-if="ruleForm.strategy.type ===  'RollingUpdate'">
        <el-input v-model="ruleForm.strategy.rollingUpdate.maxSurge" />
      </el-form-item>
      <el-form-item label="最大不可用" prop="maxUnavailable"  label-width="auto" style="margin-top: 15px;" v-if="ruleForm.strategy.type ===  'RollingUpdate'">
          <el-input v-model="ruleForm.strategy.rollingUpdate.maxUnavailable" />
      </el-form-item> 
    <!-- </div> -->
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

 

      <!-- <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item> -->
    </el-form>
  </el-card>
  </template>
  
  <script lang="ts" setup>
    import { reactive, ref ,watchEffect } from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'

    // 导入pinia存储库
    import { useDaemonSetStore } from "@/model/daemonSetStore.vue";
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    import { storeToRefs } from "pinia";

    // 加载daemonSet存储库
    const daemonSetStore = useDaemonSetStore()
    const { daemonSet } = storeToRefs(daemonSetStore)

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
    // 会将{key: 'app',value:'nginx'}格式的valuePairs转换成符合daemonSet的label格式
    const saveLabel = () => {
      // 如果当前激活的标签页是controllerLabel,则保存label到daemonSet.metadata.labels
      if (activeTabName.value === 'controllerLabel') {
        // 初始化label
        daemonSetStore.deleteDaemonSetLabels()
        ruleForm.label = {}
        // 将valuePairs转换成ruleForm.label
        ruleForm.valuePairs.forEach((item) => {
          ruleForm.label[item.key] = item.value
        })
        // 将label存入daemonSetStore
        daemonSetStore.setDaemonSetLabels(ruleForm.label)
      }
      // 如果当前激活的标签页是controllerAnnotation,则保存annotation到daemonSet.metadata.annotations
      else if (activeTabName.value === 'controllerAnnotation') {
        // 初始化annotation
        daemonSetStore.deleteDaemonSetAnnotations()
        ruleForm.label = {}
        // 将valuePairs转换成ruleForm.label
        ruleForm.valuePairs.forEach((item) => {
          ruleForm.label[item.key] = item.value
        })
        // 将label存入daemonSetStore
        daemonSetStore.setDaemonSetAnnotations(ruleForm.label)
      }
      // 如果当前激活的标签页是podTemplateLabel,则保存label到daemonSet.spec.template.metadata.labels
      else if (activeTabName.value === 'podTemplateLabel') {
        // 初始化label
        daemonSetStore.deleteDaemonSetSelector()
        ruleForm.label = {}
        // 将valuePairs转换成ruleForm.label
        ruleForm.valuePairs.forEach((item) => {
          ruleForm.label[item.key] = item.value
        })
        // 将label存入daemonSetStore
        daemonSetStore.setDaemonSetSelector(ruleForm.label)
      }
      // 如果当前激活的标签页是podTemplateAnnotation,则保存annotation到daemonSet.spec.template.metadata.annotations
      else if (activeTabName.value === 'podTemplateAnnotation') {
        // 初始化annotation
        daemonSetStore.deleteDaemonSetTemplateAnnotations()
        ruleForm.label = {}
        // 将valuePairs转换成ruleForm.label
        ruleForm.valuePairs.forEach((item) => {
          ruleForm.label[item.key] = item.value
        })
        // 将label存入daemonSetStore
        daemonSetStore.setDaemonSetTemplateAnnotations(ruleForm.label)
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
    
    daemonSetName: '',
    replicas: 1,
    dnsPolicy: 'ClusterFirst',
    hostNetwork: false,

    imagePullSecrets: '',
    showLabelEditer: false,
    
    strategy: {
      type: 'RollingUpdate',
      rollingUpdate: {
      maxSurge: '0',
      maxUnavailable: '1',
      },
    },

    })

    const rules = reactive({
    daemonSetName: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    })


  
  
    // 更新数据
    const updateData = () => {
        console.log('保存了daemonSet数据');
        
        // 绑定daemonSetName
        daemonSetStore.setDaemonSetName(ruleForm.daemonSetName)
        
        // 绑定replicas
        daemonSetStore.setDaemonSetReplicas(ruleForm.replicas)
        // 绑定dnsPolicy
        daemonSetStore.setDaemonSetDnsPolicy(ruleForm.dnsPolicy)

        // 绑定更新策略
        if (ruleForm.strategy.type === 'RollingUpdate') {
          daemonSetStore.setDaemonSetStrategy(ruleForm.strategy)
        }
        else {
          daemonSetStore.deleteDaemonSetStrategy()
          daemonSetStore.setDaemonSetStrategy({
            
            type: ruleForm.strategy.type
          })
        }
        

        // 绑定hostNetwork
        daemonSetStore.setDaemonSetHostNetwork(ruleForm.hostNetwork)

        // 如果未启用标签编辑器,则自动创建注释和标签
        if (!ruleForm.showLabelEditer) {
          console.log('未启用标签编辑器,自动创建标签和注释');
          
          // 创建标签
          daemonSetStore.setDaemonSetLabels({
              app: ruleForm.daemonSetName
          })
          // 创建注释
          daemonSetStore.setDaemonSetAnnotations({
              app: ruleForm.daemonSetName
          })
          // 创建selector,同时设置template的label
          daemonSetStore.setDaemonSetSelector({
              app: ruleForm.daemonSetName
          })
          // 创建pod模板注释
          daemonSetStore.setDaemonSetTemplateAnnotations({
              app: ruleForm.daemonSetName
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
        daemonSetStore.setDaemonSetNamespace(postData.value.namespace)
    })

  </script>
  