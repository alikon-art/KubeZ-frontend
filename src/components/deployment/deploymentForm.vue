<template>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="140px"
      class="demo-ruleForm"
      :size="formSize"
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

 

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'

    // 导入pinia存储库
    import { useDeploymentStore } from "@/model/deploymentStore.vue";
    import { storeToRefs } from "pinia";

    // 加载deployment存储库
    const deploymentStore = useDeploymentStore()
    const { deployment } = storeToRefs(deploymentStore)

  
    interface RuleForm {
    deploymentName: string
    replicas: number
    dnsPolicy: string  


    hostNetwork: boolean
    selector: string
    imagePullSecrets: string


    }

    const formSize = ref('default')
    const ruleFormRef = ref<FormInstance>()

    const ruleForm = reactive<RuleForm>({
    deploymentName: '',
    replicas: 1,
    dnsPolicy: 'ClusterFirst',
    hostNetwork: false,
    selector: '',
    imagePullSecrets: '',

    })

    const rules = reactive<FormRules<RuleForm>>({
    deploymentName: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    })

    const submitForm = async (formEl: FormInstance | undefined) => {
        updateData()
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
            console.log('submit!')
            } else {
            console.log('error submit!', fields)
            }
        })
    }

    const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    }
  
    const updateData = () => {
        console.log(ruleForm.deploymentName);
        
        // 绑定deploymentName
        deploymentStore.setDeploymentName(ruleForm.deploymentName)
        
        // 绑定replicas
        deploymentStore.setDeploymentReplicas(ruleForm.replicas)
        // 绑定dnsPolicy
        deploymentStore.setDeploymentDnsPolicy(ruleForm.dnsPolicy)

        // 绑定hostNetwork
        deploymentStore.setDeploymentHostNetwork(ruleForm.hostNetwork)

        
    }

  </script>
  