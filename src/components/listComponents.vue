<template>
  <el-card shadow="hover" style="margin-top: 20px;">
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="clusterid" label="集群id"  />
    <el-table-column prop="name" label="资源名称"  />
    <el-table-column prop="namespace" label="命名空间"  />
    
    <el-table-column prop="labels" label="lables" >
      <!-- 使用插槽 -->
      <template #default="scope">
        <!-- 展示label的组件 -->
        <labelsComponents v-if="scope.row.labels" :labels="scope.row.labels"></labelsComponents>
      </template>
  </el-table-column>

    <el-table-column prop="createtime" label="创建时间" />
    <el-table-column prop="operactions" label="操作" >
      <!-- 按钮插槽 -->
      <template #default="scope">
        <el-button @click="showItemInfo(scope.row)">详情</el-button>
        <el-button @click="deleteItem(scope.row)">删除</el-button>
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
import { useRouter } from 'vue-router'

// 使用路由
const router = useRouter()

// 使用存储库
const postStore  =  UsePostStore()

// 从存储中加载数据
const { postUrl,postData ,response,componentsStatus } = storeToRefs(postStore)

// 初始化数据
const res = postStore.response
const tableData = reactive([])

// 在挂载时发起网络请求
onMounted(async () => {
  reload()
})

// 重新加载数据
async function reload(){
  postUrl.value = '/pod/list'
  await postStore.SendQuerry()
  // console.log('response', response.value.data.items,typeof(response));
  if (response.value.data.items && response.value.data.items.length > 0) {
    tableData.push(...response.value.data.items)
  }else{}
}

function log (){
  console.log('response',response.value);
  console.log('tabledata',tableData);
}

const showItemInfo = (row) =>{
  console.log('row',row,row.name);
  // postData.value.name = row.name
  // postData.value.namespace = row.namespace
  // console.log('postdata',postData.value);
  // router.push({path:'detailsComponents',query:{userid:'123'}})
  router.push({
    path:'podDetailsComponents',
    query:{
      // clusterid:row.clusterid,
      namespace:row.namespace,
      name:row.name,
    }
  })
}


const deleteItem = (row) =>{
  console.log(row);
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