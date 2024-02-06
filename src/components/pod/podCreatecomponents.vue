<template>
<el-card>
<podForm></podForm>

</el-card>





    podcreate
    <el-input
    v-model="podyaml"
    autosize
    type="textarea"
    placeholder="Please input"
  />
</template>


<script setup>
import { reactive, ref } from 'vue'
import { UsePostStore } from "../../utils/pinia/postStore.vue";
import { storeToRefs } from "pinia";

import {anyToYaml} from '../../utils/jsyaml/jsyaml.vue'
import {pod} from '../../model/pod.vue'
import podForm from './podForm.vue'


const postStore  =  UsePostStore()
const { postUrl,postData ,response,itemData,componentsStatus } = storeToRefs(postStore)

const podyaml = ref({})
podyaml.value = anyToYaml(pod)

</script>
