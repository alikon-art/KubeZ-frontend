<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="testpage"
        unique-opened="true"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router="ture"
      >

      <!-- <el-menu-item index="testpage">
        <el-icon><document /></el-icon>
        <span>testPage</span>
      </el-menu-item>  
      <el-menu-item index="detailsComponents">
        <el-icon><document /></el-icon>
        <span>detailsComponents</span>
      </el-menu-item> 
      <el-menu-item index="listComponents">
        <el-icon><document /></el-icon>
        <span>listComponents</span>
      </el-menu-item>  -->

      <!-- 仪表盘 -->
      <el-menu-item index="dashboard">
        <el-icon><document /></el-icon>
        <span>仪表盘</span>
      </el-menu-item>

      <!-- 集群资源 -->
      <el-sub-menu index="clusterResources">
        <template #title>
          <el-icon><document /></el-icon>
          <span>集群资源</span>
        </template>
        <el-menu-item index="cluster">集群管理</el-menu-item>
        <el-menu-item index="node">Node</el-menu-item>
        <el-menu-item index="namespace">NameSpace</el-menu-item>
      </el-sub-menu>

      <!-- 工作负载 -->
      <el-sub-menu index="workloads">
        <template #title>
          <el-icon><document /></el-icon>
          <span>工作负载</span>
        </template>
        <el-menu-item index="pod">Pod</el-menu-item>
        <el-menu-item index="deployment">Deployment</el-menu-item>
        <el-menu-item index="statefulSet">StatefulSet</el-menu-item>
        <el-menu-item index="daemonSet">DaemonSet</el-menu-item>
        <!-- <el-menu-item index="cronJob">CronJob</el-menu-item> -->
      </el-sub-menu>

      <!-- 服务发布资源 -->
      <el-sub-menu index="serviceResources">
        <template #title>
          <el-icon><document /></el-icon>
          <span>服务发布资源</span>
        </template>
        <el-menu-item index="service">Service</el-menu-item>
        <!-- <el-menu-item index="ingress">Ingress</el-menu-item> -->
        <!-- <el-menu-item index="endpoints">Endpoints</el-menu-item> -->
      </el-sub-menu>

      <!-- 配置和存储资源 -->
      <el-sub-menu index="configStorageResources">
        <template #title>
          <el-icon><document /></el-icon>
          <span>配置和存储资源</span>
        </template>
        <el-menu-item index="configMap">ConfigMap</el-menu-item>
        <el-menu-item index="secret">Secret</el-menu-item>
        <!-- <el-menu-item index="pv">PV</el-menu-item>
        <el-menu-item index="pvc">PVC</el-menu-item> -->
      </el-sub-menu>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
