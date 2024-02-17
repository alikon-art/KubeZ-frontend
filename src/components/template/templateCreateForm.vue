<template>
  <!-- 当鼠标移除时,触发事件 -->
  <el-card style="margin-top: 20px;"  @mouseleave="handleMouseLeave">
    <div >
    <el-container>
      <el-aside width="200px">
        <el-card> 
          <!-- <el-button type="primary" @click="addContainer">添加容器</el-button> -->


          <el-tabs
            v-model="editableTabsValue"
            type="card"
            editable
            @edit="handleTabsEdit"
            :before-leave="beforeLeave"
            tab-position="left"
          >
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.name"
              :name="item.name"
            >
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-aside>



      <el-main >
        <el-card >
          <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane label="容器基本信息" name="containerBasicInfo">
              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="140px"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
              >
                <el-form-item label="容器名称" prop="name" >
                  <el-input v-model="ruleForm.name" @change="updateSideContainerName()"/>
                </el-form-item>
                <el-form-item label="镜像" prop="image">
                  <el-input v-model="ruleForm.image" />
                </el-form-item>
                </el-form>

            </el-tab-pane>
            <el-tab-pane label="高级设置" name="advancedSettings">
              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="140px"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
              >
                <el-form-item label="tty" prop="tty">
                  <el-switch v-model="ruleForm.tty" />
                </el-form-item>
                <el-form-item label="工作目录" prop="workingDir">
                  <el-input v-model="ruleForm.workingDir" />
                </el-form-item>
                <el-form-item label="镜像拉取策略" prop="imagePullPolicy">
                  <el-select v-model="ruleForm.imagePullPolicy">
                    <el-option label="IfNotPresent" value="IfNotPresent" />
                    <el-option label="Always" value="Always" />
                    <el-option label="Never" value="Never" />
                  </el-select>
                </el-form-item>
                <el-form-item label="资源限制" prop="limits">
                  <el-form-item label="内存" prop="limits.memory">
                    <el-input v-model="ruleForm.limits.memory" />
                  </el-form-item>
                  <el-form-item label="CPU" prop="limits.cpu">
                    <el-input v-model="ruleForm.limits.cpu" />
                  </el-form-item>
                </el-form-item>
                <el-form-item label="资源请求" prop="requests">
                  <el-form-item label="内存" prop="requests.memory">
                    <el-input v-model="ruleForm.requests.memory" />
                  </el-form-item>
                  <el-form-item label="CPU" prop="requests.cpu">
                    <el-input v-model="ruleForm.requests.cpu" />
                  </el-form-item>
                </el-form-item>
                <el-form-item label="端口" prop="ports">
                  <el-input v-model="ruleForm.ports" />
                </el-form-item>
                <el-form-item label="生命周期" prop="lifecycle">
                  <el-input v-model="ruleForm.lifecycle" />
                </el-form-item>
              </el-form>
            </el-tab-pane>

          </el-tabs>
          <el-button type="primary" @click="updateContainerInfo">保存容器信息</el-button>
        </el-card>
      </el-main>
    </el-container>
  </div>
  <el-button type="primary" @click="addContainer">保存容器信息</el-button>
  </el-card>
  </template>
  
<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import type { TabPaneName } from 'element-plus'
import pinia from 'pinia'
import { useTemplatetStore } from "@/model/templateStore.vue";
import { storeToRefs } from "pinia";

// 加载template存储库
const templateStore = useTemplatetStore()
const { containers,template } = storeToRefs(templateStore)


// 当前激活的容器名称
const activeContainerName = ref('container1')

// 当前激活的容器索引
const activeContainerIndex = ref(0)

// 默认打开的标签页
const activeName = ref('containerBasicInfo')




// 添加容器到templateStore
const addContainer = () => {
  templateStore.addContainer()
  console.log('添加容器')
}

const beforeLeave = (activeName, oldName) => {
  console.log('即将离开', oldName, '即将去',activeName)
  getContainerInfo(activeName)
  return true
}

// 从templateStore中获取容器信息
const getContainerInfo = (containerName) => {
  // 获取要读取的容器的索引
  const index = templateStore.getContainerIndex(containerName)
  ruleForm.value.name = templateStore.template.spec.containers[index].name
  ruleForm.value.image = templateStore.template.spec.containers[index].image
  console.log('容器信息为',ruleForm.value);
}

// 更新templateStore中容器信息
const updateContainerInfo = () => {
  templateStore.setContainersName(activeContainerIndex.value,ruleForm.value.name)
  templateStore.setContainersImage(activeContainerIndex.value,ruleForm.value.image)
}

const handleMouseLeave = () => {
  console.log('onmouseout')
}


// 更新左侧容器名称
const updateSideContainerName = () => {
  // 更新templateStore中容器名称
  templateStore.setContainersName(activeContainerIndex.value,ruleForm.value.name)

  // 从editableTabs中寻找name为editableTabsValue的容器的index
  const index = editableTabs.value.findIndex((tab) => tab.name === editableTabsValue.value)
  // 更新容器名称
  editableTabs.value[index].name = ruleForm.value.name
  // 更新当前选中的容器名称
  editableTabsValue.value = ruleForm.value.name

  console.log('左侧容器名称更新为',editableTabs.value[index].name);
  
}

const ruleForm = ref({
  name: '',
  image: '',
  tty: false,
  workingDir: '',
  imagePullPolicy: 'IfNotPresent',
  limits: {
    memory: '1024Mi',
    cpu: '1',
  },
  requests: {
    memory: '128Mi',
    cpu: '100m',
  },


  
  ports: [],
  lifecycle: {},
})
const rules = ref({
  name: [{ required: true, message: '请输入容器名称', trigger: 'blur' }],
  image: [{ required: true, message: '请输入镜像', trigger: 'blur' }],
})



const formSize = ref('default')





const editableTabs = ref([
  // {
  //   title: 'Container1',
  //   name: '1',
  // },
])

// 当前选中的容器id,默认为1
const editableTabsValue = ref('1')
// 当前选中的容器id变化时,触发事件
watchEffect(() => {
  console.log('editableTabsValue变化了',editableTabsValue.value)
  // 从editableTabs中寻找name为editableTabsValue的容器
  const tab = editableTabs.value.find((tab) => tab.name === editableTabsValue.value)
  // 将当前选中的容器的title赋值给activeContainerName
  activeContainerName.value = tab?.name
  console.log('当前选中的容器名称为',activeContainerName.value)
  // 将当前选中的容器的索引赋值给activeContainerIndex,索引从templateStore中获取
  activeContainerIndex.value = templateStore.getContainerIndex(activeContainerName.value)
  console.log('当前选中的容器索引为',activeContainerIndex.value)
  // console.log(templateStore.template.spec.containers);

})

// 容器的起始id
let tabIndex = 1
let tabName = 'Container'

// 标签页的编辑事件
const handleTabsEdit = (
  targetName: TabPaneName | undefined,
  action: 'remove' | 'add'
) => {

  // 添加容器的函数
  if (action === 'add') {
    // 在yaml中添加容器
    templateStore.addContainer()
    // 容器id自增
    const newTabName = tabName + tabIndex++
    // 添加一个新的容器
    editableTabs.value.push({
      name: newTabName,
    })
    editableTabsValue.value = newTabName


  // 删除容器的函数
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value

    // 这块逻辑是为了解决删除当前激活的标签页时,激活下一个标签页
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          tabIndex--
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    // 获取要被删除的容器的名称
    const targetContainerName = tabs.find((tab) => tab.name === targetName)?.name
    console.log('要删除的容器名称为',targetContainerName);
    

    // 从templateStore中删除容器
    templateStore.removeContainerWithName(targetContainerName)
    console.log(templateStore.template.spec.containers);
    

    // 删除标签页
    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)


  }
}

onMounted(() => {
  console.log('mounted')
  // templateStore.addContainer()
})
</script>
