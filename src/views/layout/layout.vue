<template>
  <el-container>
    <el-header >
      <el-menu mode="horizontal" default-active="item1">
        <el-menu-item index="item1">
          <!-- <el-image src="../../assets/kubez-logo.png" :fit="fit"></el-image> -->
          <!-- <img src="../../assets/kubez-logo.png" alt="kubez-logo" style=" height: 50px;"> -->
          <span style="font-size: 18px;">KubeZ</span>
        </el-menu-item>
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
        <el-footer>Copyright @ 2019-{{ new Date().getFullYear() }} 915149091. All Rights Reserved</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import { RouterLink, RouterView} from 'vue-router'
import  sidemenu  from "./sidemenu.vue";

</script>
