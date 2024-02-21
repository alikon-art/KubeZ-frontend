<template>

</template>

<script >
  import axios from 'axios';

  // 基本配置
  const axiosInstance = axios.create({
      baseURL: 'http://127.0.0.1:80/api/',
      headers: {
          'Content-Type': 'application/json'
      }
  });

  // post请求

export { axiosInstance };
 
</script>