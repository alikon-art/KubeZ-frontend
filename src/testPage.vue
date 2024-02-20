<!-- <template> -->
    <!-- <el-divider >messageBoxTest</el-divider>
    <messageBoxTest></messageBoxTest>
    <el-divider >jsyaml</el-divider>
    <jsyaml></jsyaml>
    <el-divider >deploymentTest</el-divider>
    <deploymentTest></deploymentTest>
    <el-divider>logtest</el-divider>
    <logtest></logtest> -->
    <!-- <el-divider>table</el-divider>
    <tables></tables> -->
    <!-- <el-divider>axiostest</el-divider>
    <axiostest></axiostest> -->
        <!-- <el-divider>listCompenents</el-divider>
        <listCompenents></listCompenents> -->
    <!-- <el-divider>listTest</el-divider>
    <listTest></listTest> -->
    <!-- <el-divider>pinia</el-divider>
    <store></store> -->
    <!-- <el-divider>detailtest</el-divider>
    <detailtest></detailtest> -->
<!-- </template> -->
  
<!-- <script setup>
    import  messageBoxTest  from "./utils/elements/messageBoxTest.vue";
    import jsyaml from "./utils/jsyaml/testYaml.vue"
    import  deploymentTest  from "./model/deploymentTest.vue";
    import  logtest from "./model/logtest.vue";
    import tables from "./utils/elements/table.vue"
    import axiostest from "./utils/axios/axiosTest.vue"
    import listCompenents from "./components/listComponents.vue";
    import listTest from "./components/listTest.vue";
    import store from "./utils/pinia/piniaview.vue"
    import detailtest from "./components/detailtest.vue";
</script>  -->



<template>
  
    <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
      open
    </el-button>
  
    <el-drawer
      v-model="drawer"
      title="I am the title"
      :direction="btt"
    >
      <span>Hi, there!</span>
    </el-drawer>
    
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const drawer = ref(false)
  </script>
  


