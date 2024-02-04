<template>
    
<el-card shadow="hover" >
    <el-select
    v-model="clusterid"
    class="m-2"
    placeholder="选择cluster"
    style="width: 240px"
    @change="clusteridChange($event)"

  >
    <el-option
      v-for="item in clusters"
      :value ="item.clusterid"
    />
  </el-select>
  <el-select
    v-model="namespace"
    class="m-2"
    placeholder="选择namespace"
    style="width: 240px"
    @change="namespaceChange($event)"
  >
    <el-option
      v-for="item in namespaces"
      :value ="item.name"
    />
  </el-select>
  <p>选中的选项: {{ clusterid }} {{ namespace }}</p> 
  <!-- {{ namespaces }} -->
  
<el-button @click="reloadList">确定</el-button>
</el-card>


</template>


<script setup>

import { onMounted, ref,watchEffect} from 'vue'
import { UsePostStore } from "../../utils/pinia/postStore.vue";
import { storeToRefs } from "pinia";
// import { reload} from '../listComponents.vue';


// 使用存储库
const postStore  =  UsePostStore()

// 从存储中加载数据
const { postUrl,postData ,response,itemData,componentsStatus } = storeToRefs(postStore)


const clusterid = ref('')
const namespace = ref('')
const clusters = ref([])
const namespaces = ref([])


onMounted(async () => {
    postUrl.value = '/cluster/list'
    await postStore.SendQuerry()
    console.log('selecter', itemData.value.clusters,typeof(itemData));
    clusters.value = itemData.value.clusters

})

// 获取namespace信息的函数
const getNamespace = async () => {
    postUrl.value = '/namespace/list'
    await postStore.SendQuerry()
    namespaces.value = itemData.value.items
}

// 监听clusterid的变化
function clusteridChange(e) {
    postData.value.clusterid = e
    console.log('postdata-clusterid改变了',postData.value.clusterid)
    getNamespace()
}

// 监听namespace的变化
function namespaceChange(e) {
    postData.value.namespace = e
    console.log('postdata-namespace改变了',postData.value.namespace)
}


function reloadList() {
    // 设置需要重新加载列表
    componentsStatus.value.listComponents.needReload = true
    console.log('needReload改变了',componentsStatus.value.listComponents.needReload);
}
</script>