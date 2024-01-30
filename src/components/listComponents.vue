<template>
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
  <button @click="log">log</button>
</template>


<script setup>
import {  onMounted, reactive, ref } from "vue";
import labelsComponents from './labelsComponents.vue'
import { UsePostStore } from "../utils/pinia/myStore.vue";
import { storeToRefs } from "pinia";


// 使用存储库
const postStore  =  UsePostStore()

// 从存储中加载数据
const { postData ,response } = storeToRefs(postStore)

// 初始化数据
const res = postStore.response
const tableData = reactive([])

// 在挂载时发起网络请求
onMounted(async () => {
  await postStore.SendQuerry()
  // console.log('response', response.value.data.items,typeof(response));
  tableData.push(...response.value.data.items)
})

function log (){
  console.log('response',response.value);
  console.log('tabledata',tableData);
}

const showItemInfo = (row) =>{
  console.log(row);
}


const deleteItem = (row) =>{
  console.log(row);
}



// // 要传入的数据
// const props = defineProps({
//   clusterid:{
//     type: String,
//     default: 'cluster1'
//   },
//   namespace:{
//     type: String,
//     default: 'default'
//   },
//   url:{
//     type: String,
//     required: true,
//     default: 'pod/list'
//   },
// });

// // 构建请求体
// let postData = reactive({
//   clusterid: props.clusterid,
//   namespace: props.namespace,
// });

// // 请求url
// let posturl = ref(props.url)

// // 初始化表格数据
// let tableData = reactive([]);


// // 发送请求
// function getinfo(){
//   axiosInstance.post(posturl.value,postData).then(function (response) {
//       // console.log(response.data.data);
//       tableData.push(...response.data.data.items)
//       // console.log(tableData); 
//   })
// }


</script>