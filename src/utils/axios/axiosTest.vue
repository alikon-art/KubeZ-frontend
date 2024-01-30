<template>
    <h3>123</h3>
    <!-- <h3>{{ tableData }}</h3> -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="ClusterId" label="ClusterId" width="180" />
      <el-table-column prop="name" label="name" width="180" />
      <el-table-column prop="createtime" label="CreateTime" />
    </el-table>

    <button @click="add">test</button> 
    <button @click="getinfo">getinfo</button> 
</template>


<script setup>
import { axiosInstance  } from "./axios.vue";
import {  onMounted, reactive, ref } from "vue";

let postData = {
  clusterid: "cluster1"
};

let tableData = reactive([]);

function getinfo(){
    axiosInstance.post("pod/list",postData).then(function (response) {
        console.log(response.data);
        tableData.push(...response.data.data.items)
        console.log(tableData);
    })
    
}

</script>