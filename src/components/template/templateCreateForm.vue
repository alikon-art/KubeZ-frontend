<template>
  <volume-create-form />
 
  <el-card style="margin-top: 20px;" header="容器模板设置" >
    <div >
    <el-container>
      <el-aside width="200px">
        <el-card  header="容器列表" style="margin-right:20px;"> 
          <!-- <el-button type="primary" @click="handleTabsEdit(undefined, 'add')">添加容器</el-button> -->


          <el-tabs
            v-model="editableTabsValue"
            type="card"
            editable
            @edit="handleTabsEdit"
            :before-leave="beforeLeave"
            @tab-click="sideTabClick"
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



      <el-main style="padding: 0;">
        <el-card @mouseleave="handleMouseLeave" shadow="hover">
          <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane label="容器基本信息" name="containerBasicInfo">
              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="100px"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
              >
                <el-form-item label="容器名称" prop="name" >
                  <el-input v-model="ruleForm.name" @input="updateSideContainerName()"/>
                </el-form-item>
                <el-form-item label="镜像" prop="image">
                  <el-input v-model="ruleForm.image" />
                </el-form-item>
                <el-form-item label='镜像拉取策略' prop='imagePullPolicy'>
                  <el-select v-model="ruleForm.imagePullPolicy">
                    <el-option label="IfNotPresent" value="IfNotPresent" />
                    <el-option label="Always" value="Always" />
                    <el-option label="Never" value="Never" />
                  </el-select>
                </el-form-item>
                <el-form-item label="启动命令" prop="cmd">
                  <el-input v-model="ruleForm.cmd  " />
                </el-form-item>
                <el-form-item label="启动参数" prop="arg">
                  <el-input v-model="ruleForm.arg" />
                </el-form-item>
                <el-form-item label="镜像拉取密钥" prop="imagePullSecrets">
                  <el-input v-model="ruleForm.imagePullSecrets" />
                </el-form-item>
              </el-form>

            </el-tab-pane>
            <el-tab-pane label="高级设置" name="advancedSettings">
              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="100px"
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
                <el-form-item label="资源限制" prop="limits">
                  <el-form-item label="内存" prop="limits.memory" >
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
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="环境变量" name="env">
              <el-table
                :data="ruleForm.env"
                style="width: 100%"
              >
                <el-table-column label="名称" prop="name" width="180">
                  <template v-slot="{ row }">
                    <el-input v-model="row.name" />
                  </template>
                </el-table-column>
                <el-table-column label="值" prop="value" width="180">
                  <template v-slot="{ row }">
                    <el-input v-model="row.value" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                  <template v-slot="{ row }">
                    <el-button
                      type="text"
                      size="small"
                      @click="deleteEnv(row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-button @click="handleAddEnv">添加环境变量</el-button>

            </el-tab-pane>

            <el-tab-pane label="端口" name="ports">
              <el-table
                :data="ruleForm.ports"
                style="width: 100%"
              >
                <el-table-column
                  label="容器端口"
                  prop="containerPort"
                  width="180"
                >
                  <template v-slot="{ row }">
                    <el-input v-model="row.containerPort" />
                  </template>
              </el-table-column>
                <el-table-column label="协议" prop="protocol" width="180">
                  <template v-slot="{ row }">
                    <el-select v-model="row.protocol">
                      <el-option label="TCP" value="TCP" />
                      <el-option label="UDP" value="UDP" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="端口名称" prop="name" width="180">
                  <template v-slot="{ row }">
                    <el-input v-model="row.name" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                  <template v-slot="{ row }">
                    <el-button
                      type="text"
                      size="small"
                      @click="deletePort(row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-button @click="handleAdd">添加端口</el-button>
              


            </el-tab-pane>

            <el-tab-pane label="生命周期" name="lifecycle">
              <el-card shadow="hover">
                <el-form
                  ref="ruleFormRef"
                  :model="ruleForm"
                  :rules="rules"
                  label-width="80px"
                  class="demo-ruleForm"
                  status-icon
                >
                
                  <el-form-item label="PostStart" prop="postStart">
                    <!-- 一个按钮组,用于选择PostStart的检查方式 -->
                    <el-radio-group v-model="ruleForm.lifecycle.postStart" @change="postStartChange">
                      <el-radio-button label="close" />
                      <el-radio-button label="httpGet" />
                      <el-radio-button label="exec" />
                      <el-radio-button label="tcpSocket" />
                    </el-radio-group>
                    <!-- 当选择的检查方式为httpGet时,展示以下菜单 -->
                    <el-form-item v-if="ruleForm.lifecycle.postStart?.httpGet" label="路径" prop="path">
                      <el-input v-model="ruleForm.lifecycle.postStart.httpGet.path" />
                    </el-form-item>
                    <el-form-item v-if="ruleForm.lifecycle.postStart?.httpGet" label="端口" prop="port">
                      <el-input v-model="ruleForm.lifecycle.postStart.httpGet.port" />
                      </el-form-item>
                    <el-form-item v-if="ruleForm.lifecycle.postStart?.httpGet" label="主机" prop="host">
                      <el-input v-model="ruleForm.lifecycle.postStart.httpGet.host" />
                      </el-form-item> 
                    <!-- 当选择的检查方式为exec时,展示以下菜单 -->
                    <el-form-item v-if="ruleForm.lifecycle.postStart?.exec" label="命令" prop="command">
                      <el-input v-model="ruleForm.lifecycle.postStart.exec.command" />
                      </el-form-item> 
                    <!-- 当选择的检查方式为tcpSocket时,展示以下菜单 -->
                    <el-form-item v-if="ruleForm.lifecycle.postStart?.tcpSocket" label="端口" prop="port">
                      <el-input v-model="ruleForm.lifecycle.postStart.tcpSocket.port" />
                      </el-form-item>

                  </el-form-item>
                    
   

                  
                </el-form>
              </el-card>

              
            </el-tab-pane>

            <el-tab-pane label="存储挂载" name="volumeMounts">
              <el-card shadow="hover">
                <el-table
                :data="ruleForm.volumeMounts"
                style="width: 100%"
              >
                <!-- 要挂载的卷名称使用selecter从volumestore.volumes.name中选择 -->
                <el-table-column label="卷名称" prop="name" width="180">
                  <template v-slot="{ row }">
                    <el-select v-model="row.name" placeholder="请选择">
                      <el-option
                        v-for="item in volumeStore.volumes"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="挂载路径" prop="mountPath" width="180">
                  <template v-slot="{ row }">
                    <el-input v-model="row.mountPath" />
                  </template>
                </el-table-column>
                <el-table-column label="子路径" prop="subPath" width="180">
                  <template v-slot="{ row }">
                    <el-input v-model="row.subPath" />
                  </template>
                </el-table-column>
                <el-table-column label="只读" prop="readOnly" width="180">
                  <template v-slot="{ row }">
                    <el-switch v-model="row.readOnly" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                  <template v-slot="{ row }">
                    <el-button
                      type="text"
                      size="small"
                      @click="deleteVolumeMounts(row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-button @click="addVolumeMounts">添加存储挂载</el-button>
                </el-card>
            </el-tab-pane>

          </el-tabs>
          <!-- <el-button type="primary" @click="updateContainerInfo">保存容器信息</el-button> -->
        </el-card>
      </el-main>
    </el-container>
  </div>
  <!-- <el-button type="primary" @click="updateContainerInfo">保存容器信息</el-button> -->
  </el-card>
  </template>
  
<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import type { TabPaneName } from 'element-plus'

import { storeToRefs } from "pinia";

// 导入volume创建表单
import VolumeCreateForm from "@/components/volume/volumeCreateForm.vue";


// 导入存储库
import { useTemplatetStore } from "@/model/templateStore.vue";
import { useVolumeStore } from "@/model/volumeStore.vue";


// 加载存储库
const templateStore = useTemplatetStore()
const { containers,template } = storeToRefs(templateStore)
const volumeStore = useVolumeStore()
const { volumes } = storeToRefs(volumeStore)


// 从volumeStore添加volume对象到template中
templateStore.template.spec.volumes = volumes.value





// 当前激活的容器名称
const activeContainerName = ref('Container1')

// 当前激活的容器索引
const activeContainerIndex = ref(0)

const formSize = ref('default')

// 右侧默认打开的标签页
const activeName = ref('containerBasicInfo')





// 添加容器到templateStore
const addContainer = () => {
  templateStore.addContainer()
  console.log('添加容器')
}


// 点击左侧切换容器标签页时,触发事件
// 用于加载右侧容器的信息
const sideTabClick = (tab, event) => {
  console.log('点击了标签页',tab.props.name);
  getContainerInfo(tab.props.name)
}

const handleClick = (tab, event) => {
  console.log('点击了标签页',tab,event);
}

// 切换标签页时,触发事件
const beforeLeave = (activeName, oldName) => {
  console.log('即将离开', oldName, '即将去',activeName)

  // 获取即将跳转的容器的详细信息
  // getContainerInfo(activeName)
  return true
}

// 从templateStore中获取容器信息
// 会在切换左侧容器标签页时触发
const getContainerInfo = (containerName) => {
  console.log('即将获取容器信息',containerName);
  // 获取要读取的容器的索引
  const index = templateStore.getContainerIndex(containerName)
  // 获取容器基本信息
  ruleForm.value.name = templateStore.template.spec.containers[index].name
  ruleForm.value.image = templateStore.template.spec.containers[index].image
  ruleForm.value.imagePullPolicy = templateStore.template.spec.containers[index].imagePullPolicy
  ruleForm.value.command = templateStore.template.spec.containers[index].command
  ruleForm.value.args = templateStore.template.spec.containers[index].args
  ruleForm.value.imagePullSecrets = templateStore.template.spec.containers[index].imagePullSecrets
  // 获取容器高级设置
  ruleForm.value.tty = templateStore.template.spec.containers[index].tty
  ruleForm.value.workingDir = templateStore.template.spec.containers[index].workingDir
  ruleForm.value.limits = templateStore.template.spec.containers[index].resources.limits
  ruleForm.value.requests = templateStore.template.spec.containers[index].resources.requests
  // 获取容器环境变量
  ruleForm.value.env = templateStore.template.spec.containers[index].env
  // 获取容器端口
  ruleForm.value.ports = templateStore.template.spec.containers[index].ports
  // 获取容器生命周期
  ruleForm.value.lifecycle = templateStore.template.spec.containers[index].lifecycle
  // 获取容器存储挂载
  ruleForm.value.volumeMounts = templateStore.template.spec.containers[index].volumeMounts


  console.log('获得容器信息为',ruleForm.value);
}

// 将右侧输入卡片的信息保存到templateStore中
// 会在鼠标移出右侧输入卡片时触发
const updateContainerInfo = () => {
  console.log('即将保存容器'+activeContainerName.value+'的信息到templateStore中');
  // 获取要更新的容器的索引
  const index = templateStore.getContainerIndex(activeContainerName.value)
  templateStore.setContainersName(index,ruleForm.value.name)
  templateStore.setContainersImage(index,ruleForm.value.image)
  templateStore.setContainersImagePullPolicy(index,ruleForm.value.imagePullPolicy)  
  templateStore.setContainersCommand(index,ruleForm.value.command)
  templateStore.setContainersArgs(index,ruleForm.value.args)
  templateStore.setContainersEnv(index,ruleForm.value.env)
  templateStore.setContainersImagePullSecrets(index,ruleForm.value.imagePullSecrets)
  templateStore.setContainersTty(index,ruleForm.value.tty)
  templateStore.setContainersWorkingDir(index,ruleForm.value.workingDir)

  templateStore.setContainersPorts(index,ruleForm.value.ports)

  // 设置资源限制
  templateStore.setContainersResources(index,{
    limits: ruleForm.value.limits,
    requests: ruleForm.value.requests,
  })

  // 设置生命周期
  templateStore.setContainersLifecycle(index,ruleForm.value.lifecycle)

  // 设置存储挂载
  templateStore.setContainersVolumeMounts(index,ruleForm.value.volumeMounts)

  console.log('保存的容器信息为',ruleForm.value);
}

const handleMouseLeave = () => {
  console.log('鼠标移出右侧卡片');
  updateContainerInfo()
}


// 更新左侧容器名称
// 会在右侧容器名称输入框输入时触发
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
  ports: [

  ],
  lifecycle: {},

  // 待转换的输入参数
  cmd: '',
  arg: '',
  // 真实参数
  command: [],
  args: [],

  
  imagePullSecrets: '',
  dnsPolicy: 'ClusterFirst',
  hostNetwork: false,
  selector: '',

  env:[
  ],

  volumeMounts: [
  ],


})
const rules = ref({
  name: [{ required: true, message: '请输入容器名称', trigger: 'blur' }],
  image: [{ required: true, message: '请输入镜像', trigger: 'blur' }],
})


// 监听ruleForm的cmd,arg的变化,将其转换为数组
// 例如,将'ls -l'转换为['ls','-l']
watchEffect(() => {
  console.log('cmd,arg变化了',ruleForm.value.cmd,ruleForm.value.arg);
  ruleForm.value.command = ruleForm.value.cmd.split(' ')
  ruleForm.value.args = ruleForm.value.arg.split(' ')
})

// 当postStart改变时,触发事件
const postStartChange = (value) => {
  console.log('postStart改变了',value);
  // 根据选择的检查方式,向postStart添加对应的检查方式
  if (value === 'httpGet') {
    ruleForm.value.lifecycle.postStart = {
      httpGet: {
        path: '/',
        port: 80,
        host: 'localhost',
      },
    }
  } else if (value === 'exec') {
    ruleForm.value.lifecycle.postStart = {
      exec: {
        command: ['ls', '-l'],
      },
    }
  } else if (value === 'tcpSocket') {
    ruleForm.value.lifecycle.postStart = {
      tcpSocket: {
        port: 80,
      },
    }
  } else if (value === 'close') {
    // 删除postStart
    delete ruleForm.value.lifecycle.postStart
  }



  
}


// 添加端口
const handleAdd = () => {
  ruleForm.value.ports.push({
    containerPort: 80,
    protocol: 'TCP',
    name: 'http',
  })
}

// 删除端口
const deletePort = (row) => {
  const index = ruleForm.value.ports.indexOf(row)
  ruleForm.value.ports.splice(index, 1)

}

// 添加环境变量
const handleAddEnv = () => {
  ruleForm.value.env.push({
    name: '',
    value: '',
  })
}

// 删除环境变量
const deleteEnv = (row) => {
  const index = ruleForm.value.env.indexOf(row)
  ruleForm.value.env.splice(index, 1)
}



// 添加存储挂载
const addVolumeMounts = () => {
  ruleForm.value.volumeMounts.push({
    name: '',
    mountPath: '',
    subPath: '',
    readOnly: false,
  })
}

// 删除存储挂载
const deleteVolumeMounts = (row) => {
  const index = ruleForm.value.volumeMounts.indexOf(row)
  ruleForm.value.volumeMounts.splice(index, 1)
}



// 左侧标签的容器列表
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
  console.log('当前选中的容器id变化了',editableTabsValue.value)
  // 从editableTabs中寻找name为editableTabsValue的容器
  const tab = editableTabs.value.find((tab) => tab.name === editableTabsValue.value)
  // 将当前选中的容器的名称赋值给activeContainerName
  activeContainerName.value = tab?.name
  console.log('当前选中的容器名称为',activeContainerName.value)
  // 将当前选中的容器的索引赋值给activeContainerIndex,索引从templateStore中获取
  activeContainerIndex.value = templateStore.getContainerIndex(activeContainerName.value)
  console.log('当前选中的容器索引为',activeContainerIndex.value)
  // console.log(templateStore.template.spec.containers);

})

// 容器的起始id
let tabIndex = 1
let tabName = 'container'

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
  console.log('mounted');
  // 默认添加一个容器
  handleTabsEdit(undefined, 'add')
  // 获取容器信息
  getContainerInfo('container1')
})
</script>
