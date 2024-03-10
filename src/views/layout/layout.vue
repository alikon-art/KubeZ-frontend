<template>
  <el-container>
    <el-header >
      <el-menu mode="horizontal" default-active="item1" :ellipsis="false">
        <el-menu-item index="item1" >
          <!-- <el-image src="../../assets/kubez-logo.png" :fit="fit"></el-image> -->
          <!-- <img src="../../assets/kubez-logo.png" alt="kubez-logo" style=" height: 50px;"> -->
          <span style="font-size: 18px;">KubeZ</span>
        </el-menu-item>
        <div class="flex-grow" />
        
        <el-button type="success" style="margin: 15px;" size="small" @click="login">登录</el-button>
        <el-button type="danger" style="margin: 15px;" size="small" @click="logout" >退出</el-button>


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
import {useRouter} from 'vue-router'

const router = useRouter()



const login = () => {
  console.log('login');
  router.push('/login')
}

const logout = () => {
  console.log('logout');
  // 清除token
  localStorage.removeItem('token')
  router.push('/login')
}

</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
