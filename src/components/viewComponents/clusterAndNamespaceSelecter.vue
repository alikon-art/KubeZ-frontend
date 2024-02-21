<template>
    
<el-card shadow="always" >
    <el-text  size="large" style="margin: 10px;">请选择集群和命名空间:</el-text>
    
    <el-select
    v-model="clusterid"
    class="m-2"
    placeholder="选择cluster"
    style="width: 200px"
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
    style="width: 200px"
    @change="namespaceChange($event)"
  >
    <el-option
      v-for="item in namespaces"
      :value ="item.name"
    />
  </el-select>
  <!-- <p>选中的选项: {{ clusterid }} {{ namespace }}</p>  -->
  <!-- {{ namespaces }} -->
  <div style="margin-left: 10px;margin-top: 5px; " >
<el-button @click="reloadList">确定</el-button>
<!-- 当前url就是资源名称 -->
<el-button @click="createItem" v-if="showCreate">创建{{ currentUrl }}</el-button>
</div>
</el-card>


</template>


<script setup>

import { onMounted, ref,watchEffect} from 'vue'
import { UsePostStore } from "../../utils/pinia/postStore.vue";
import { storeToRefs } from "pinia";
// import { reload} from '../listComponents.vue';


import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()


// 获取不带/的当前url
const currentUrl = ref(route.path.replace('/',''))

const showCreate = ref(false)

// 如果当前url中包含Components则不显示创建按钮
if (currentUrl.value.includes('Components')) {
    showCreate.value = false
} 
// 如果当前url包含了pod也不显示创建按钮
if (currentUrl.value.includes('pod')) {
    showCreate.value = false
}


const createItem= () => {
    console.log('route to ','/'+currentUrl.value+'CreateComponents');
    router.push({path:'/'+currentUrl.value+'CreateComponents'})
}


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
    reloadList()
}


function reloadList() {
    // 设置需要重新加载列表
    componentsStatus.value.listComponents.needReload = true
    console.log('needReload改变了',componentsStatus.value.listComponents.needReload);
}
</script>