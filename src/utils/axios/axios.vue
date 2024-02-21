<template>

</template>

<script >
  import axios from 'axios';

  // 基本配置
  const axiosInstance = axios.create({
      baseURL: `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/`,
      headers: {
          'Content-Type': 'application/json'
      }
  });

  // post请求

export { axiosInstance };
 
</script>