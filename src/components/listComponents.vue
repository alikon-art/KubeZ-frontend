<template>
  <el-card shadow="hover" style="margin-top: 20px;">
  <el-table :data="tableData" stripe style="width: 100%">
    <!-- 集群类 -->
    <el-table-column prop="clusterid" label="集群id" v-if="isCluster" />
    <el-table-column prop="clustername" label="集群名称" v-if="isCluster" />
    <el-table-column prop="version" label="集群版本" v-if="isCluster" />
    <el-table-column prop="annotations" label="注释" v-if="isCluster" />

    <!-- node类 -->
    <el-table-column prop="metadata.name" label="Node名称" v-if="isNode" /> 
    <el-table-column prop="status?.conditions[4]?.status" label="状态" v-if="isNode" >
      <template #default="scope" >
        <div v-if="scope.row.status?.conditions[4]?.type == 'Ready'">
        <el-tag v-if="scope.row.status?.conditions[4]?.status === 'True'  " type="success">Ready</el-tag>
        <el-tag v-if="scope.row.status?.conditions[4]?.status === 'False'" type="danger">NotReady</el-tag>
        <el-tag v-if="scope.row.status?.conditions[4]?.status === 'Unknown' " type="info">Unknow</el-tag>
        </div>
        <div v-if="scope.row.status?.conditions[3]?.type == 'Ready'">
        <el-tag v-if="scope.row.status?.conditions[3]?.status === 'True'  " type="success">Ready</el-tag>
        <el-tag v-if="scope.row.status?.conditions[3]?.status === 'False'" type="danger">NotReady</el-tag>
        <el-tag v-if="scope.row.status?.conditions[3]?.status === 'Unknown' " type="info">Unknow</el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="status.nodeInfo.osImage" label="操作系统" v-if="isNode" />
    <el-table-column prop="status.nodeInfo.kubeletVersion" label="kubelet版本" v-if="isNode" />
    <el-table-column prop="status.nodeInfo.containerRuntimeVersion" label="容器运行时版本" v-if="isNode" />
    <el-table-column prop="status.nodeInfo.architecture" label="架构" v-if="isNode" />
    <el-table-column prop="status.conditions[4].lastHeartbeatTime" label="上次就绪时间" v-if="isNode" />

    <!-- 非集群类 -->
    <el-table-column prop="name" label="名称" v-if="showName" />
    <el-table-column prop="namespace" label="命名空间" v-if="showNamespace" />
    
    <el-table-column prop="labels" label="lables" v-if="showNamespace">
      <!-- 使用插槽 -->
      <template #default="scope">
        <!-- 展示label的组件 -->
        <labelsComponents v-if="scope.row.labels" :labels="scope.row.labels"></labelsComponents>
      </template>
  </el-table-column>

    <el-table-column prop="item.status.phase" label="状态" v-if="isPod" />
    <el-table-column prop="item.status.phase" label="状态" v-if="isDeployment" >
      <template #default="scope">
        <el-tag  >{{scope.row.item.status.replicas-scope.row.item.status.unavailableReplicas  }} / {{ scope.row.item.status.replicas }}</el-tag>
      </template>
      </el-table-column>

    <el-table-column prop="createtime" label="创建时间" v-if="showCreateTime" />


    <el-table-column prop="operactions" label="操作" v-if="showOperation">
      <!-- 按钮插槽 -->
      <template #default="scope">
        <el-button @click="showItemInfo(scope.row)"  >详情</el-button>
        <el-button @click="deleteItem(scope.row)" type="danger" size="small" v-if="showDelete">删除</el-button>
      </template>
 
    </el-table-column>
  </el-table>
  <!-- <button @click="log">log</button> -->
</el-card>
</template>


<script setup>
import {  onMounted, reactive, ref,watchEffect } from "vue";
import labelsComponents from './labelsComponents.vue'
import { UsePostStore } from "../utils/pinia/postStore.vue";
import { storeToRefs } from "pinia";
import { useRouter,useRoute } from 'vue-router'

// 加载通知组件
import { Notification } from "@/utils/elements/notification.vue"

// 使用路由
const router = useRouter()
const route = useRoute()

// 获取不带/的当前url
const currentUrl = ref(route.path.replace('/',''))
// 将当前url转换为小写
currentUrl.value = currentUrl.value.toLowerCase()

// 使用存储库
const postStore  =  UsePostStore()

// 从存储中加载数据
const { postUrl,postData ,response,componentsStatus } = storeToRefs(postStore)

// 初始化数据
const res = postStore.response
const tableData = reactive([])


// 控制列表展示项目
const isCluster = ref(false)
if (currentUrl.value === 'cluster') {
  isCluster.value = true
} else {
  isCluster.value = false
}

const isPod = ref(false)
if (currentUrl.value === 'pod') {
  isPod.value = true
}

const isDeployment = ref(false)
if (currentUrl.value === 'deployment') {
  isDeployment.value = true
}



// 控制菜单显示项  
const showName = ref(true)
if (  currentUrl.value === 'cluster' || currentUrl.value === 'node') {
  showName.value = false
}

const showNamespace = ref(true)
if (currentUrl.value === 'namespace' || currentUrl.value === 'cluster' || currentUrl.value === 'node') {
  showNamespace.value = false
} 

const showCreateTime = ref(true)
if (currentUrl.value === 'node') {
  showCreateTime.value = false
}

const showOperation = ref(true)
// if (currentUrl.value === 'cluster') {
//   showOperation.value = false
// }

const showDelete = ref(true)
if (currentUrl.value === 'node' || currentUrl.value === 'cluster' ) {
  showDelete.value = false
}

// 当前为node
const isNode = ref(false)
if (currentUrl.value === 'node') {
  isNode.value = true
}

// 在挂载时发起网络请求
onMounted(async () => {
  reload()
})

// 重新加载数据
async function reload(){
  postUrl.value = '/'+currentUrl.value+'/list'
  await postStore.SendQuerry()
  // console.log('response', response.value.data.items,typeof(response));
  if (response.value.data.items && response.value.data.items.length > 0) {
    tableData.push(...response.value.data.items)
  }
  if (response.value.data.clusters && response.value.data.clusters.length > 0) {
    tableData.push(...response.value.data.clusters)
  }
}

function log (){
  console.log('response',response.value);
  console.log('tabledata',tableData);
}

const showItemInfo = (row) =>{
  console.log('row',row);
  let itemName = ''
  let itemNameSpace = ''
  if (currentUrl.value === 'node') {
    itemName = row.metadata.name
  }else if (currentUrl.value === 'cluster'){
    itemName = row.clusterid
    itemNameSpace = 'kubez'
  }
  else  {
    itemName = row.name
    itemNameSpace = row.namespace
  }
  router.push({
    path:currentUrl.value+'DetailsComponents',
    query:{
      // clusterid:row.clusterid,
      namespace:itemNameSpace,
      name:itemName,
    }
  })
}



const deleteItem = (row) =>{
  console.log(currentUrl.value,row.namespace,row.name);
  postUrl.value = '/'+currentUrl.value+'/delete'
  postData.value.namespace = row.namespace
  postData.value.name = row.name
  postStore.SendQuerry()
  if (response.value.status === "200") {
    Notification('删除成功','删除成功','success')
    tableData.splice(0,tableData.length)
    reload()
  }
}


// 监听状态变化
 watchEffect(() => {
  if (componentsStatus.value.listComponents.needReload) {
    // 清空列表数据
    tableData.splice(0,tableData.length)
    reload()
    componentsStatus.value.listComponents.needReload = false
  }
  console.log('needReload改变了',componentsStatus.value.listComponents.needReload);
})
</script>