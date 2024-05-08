<template>

</template>

<script >
  import axios from 'axios';


  // 基本配置
  const axiosInstance = axios.create({
    //   baseURL: `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/`,
      baseURL: `http://127.0.0.1:8080/api/`,
      headers: {
          'Content-Type': 'application/json'
      }
  });

  // post请求

  // 添加一个拦截器,用于在请求头中加入token
  axiosInstance.interceptors.request.use(
      config => {
          // 在发送请求之前做些什么
          const token = localStorage.getItem('token');
          console.log('取得token',token);
          if (token) {
              // 添加token
                config.headers.Authorization = token;
          }else{
              console.log('no token');
          }
          return config;
      },
  );

export { axiosInstance };
 
</script>