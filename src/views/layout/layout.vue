<template>
  <el-container>
    <el-header >
      <el-menu mode="horizontal" default-active="item1">
        <el-menu-item index="item1">已选内容</el-menu-item>
        <el-menu-item index="item2">菜单内容一</el-menu-item>
        <el-menu-item index="item3">菜单内容二</el-menu-item>
        <el-menu-item index="item4" :disabled="true">菜单内容三</el-menu-item>
      </el-menu>
    </el-header>

    <el-container>
      <el-aside width="200">
        <sidemenu></sidemenu>
      </el-aside>

      <el-container>
        <el-main>
          <div>
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer>Copyright @ 2019-{{ new Date().getFullYear() }} Tencent. All Rights Reserved</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import { RouterLink, RouterView} from 'vue-router'
import  sidemenu  from "./sidemenu.vue";

</script>
