<template>
    <div>
      <h1>Vue 3 删除对象属性示例</h1>
      <p>{{ userInfo }}</p>
      <button @click="deleteProperty('age')">删除年龄属性</button>
    </div>
  </template>
   
   <script>
   import { reactive, toRefs } from 'vue';
    
   export default {
     setup() {
       // 创建一个响应式对象
       const state = reactive({
         userInfo: {
           name: 'Alice',
           age: 25,
           email: 'alice@example.com'
         }
       });
    
       // 删除属性的函数
       function deleteProperty(prop) {
         // 使用 delete 关键字删除属性
         // delete state.userInfo[prop];
    
         // 或者使用 Reflect.deleteProperty 方法
         Reflect.deleteProperty(state.userInfo, prop);
       }
    
       // 使用 toRefs 使每个属性都成为响应式的引用
       return {
         ...toRefs(state),
         deleteProperty
       };
     }
   };
   </script>
