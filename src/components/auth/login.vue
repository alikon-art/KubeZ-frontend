<template>
    <div class="login" clearfix>
      <div class="login-wrap">
        <el-row type="flex" justify="center">
          <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
            <h3>登录</h3>
            <hr>
            <el-form-item prop="username" label="用户名">
              <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon></el-input>
            </el-form-item>
            <el-form-item id="password" prop="password" label="密码">
              <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-upload" @click="doLogin()">登 录</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
  </template>
   
  <script>
  import { axiosInstance  } from "../../utils/axios/axios.vue";
  export default {
    name: "login",
    data() {
      return {
        user: {
          username: "",
          password: ""
        }  
      };
    },
    created() {},
    methods: {
      doLogin() {
        if (!this.user.username) {
          this.$message.error("请输入用户名！");
          return;
        } else if (!this.user.password) {
          this.$message.error("请输入密码！");
          return;
        } else {
          //校验用户名和密码是否正确;
          axiosInstance
            .post("auth/login", {
              username: this.user.username,
              password: this.user.password
            })
            .then(res => {
              // console.log("输出response.data.status", res.data.status);
                console.log(res.data);
                console.log(res.data.status);
                if (res.data.status == 200) {
                    this.$message.success("登录成功！");
                    //将token存储到localStorage中
                    localStorage.setItem("token", res.data.data.token);
                    console.log("保存token", res.data.data.token);
                    //跳转到首页
                    this.$router.push("/");
                    } else {
                    this.$message.error("用户名或密码错误！");
                    }

            });
        }
      }
    }
  };
  </script>
   
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .login {
  background-color: #c9d3e8;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='199' viewBox='0 0 100 199'%3E%3Cg fill='%23f1e5ec' fill-opacity='0.39'%3E%3Cpath d='M0 199V0h1v1.99L100 199h-1.12L1 4.22V199H0zM100 2h-.12l-1-2H100v2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  }
  .login-wrap {
    background: url("../assets/images/login_bg.png") no-repeat;
    background-size: cover;
    width: 400px;
    height: 300px;
    margin: 215px auto;
    overflow: hidden;
    padding-top: 10px;
    line-height: 40px;
  }
  #password {
    margin-bottom: 5px;
  }
  h3 {
    color: #0babeab8;
    font-size: 24px;
  }
  hr {
    background-color: #444;
    margin: 20px auto;
  }
  a {
    text-decoration: none;
    color: #aaa;
    font-size: 15px;
  }
  a:hover {
    color: coral;
  }
  .el-button {
    width: 80%;
    margin-left: -50px;
  }
  /* body {
  background-color: #c9d3e8;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='199' viewBox='0 0 100 199'%3E%3Cg fill='%23f1e5ec' fill-opacity='0.39'%3E%3Cpath d='M0 199V0h1v1.99L100 199h-1.12L1 4.22V199H0zM100 2h-.12l-1-2H100v2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
} */
  </style>