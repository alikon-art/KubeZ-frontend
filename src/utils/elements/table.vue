<template>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="ClusterId" label="ClusterId" width="180" />
      <el-table-column prop="PodName" label="PodName" width="180" />
      <el-table-column prop="CreateTime" label="CreateTime" />
    </el-table>

    <button @click="change">change</button>
</template>
  
<script setup>
import { reactive } from 'vue';

const tableData = [
{
    ClusterId: '2016-05-03',
    PodName: 'Tom',
    CreateTime: 'No. 189, Grove St, Los Angeles',
},
]

function change(){
    tableData[0].PodName = '123'
    console.log(tableData[0].PodName);
}
console.log(tableData);
</script>
  