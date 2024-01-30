<template>
    <button @click="showInfo">showInfo</button>>
    <button @click="add">to-add</button>>
    <button @click="yaml">to-yaml</button>>
    <button @click="yaml">to-new</button>>
    <button @click="removeEmptyProperties">remove</button>
    
</template>

<script setup>

import { anyToYaml } from '../utils/jsyaml/jsyaml.vue';
import { deployment } from "./deployment.vue";
import { reactive } from 'vue';

    let add =() =>{
        deployment.test = '123'
    }

    let showInfo =() =>{
        console.log(deployment);
    }

    let yaml =()=>{
        console.log(anyToYaml(deployment));
    }

</script>