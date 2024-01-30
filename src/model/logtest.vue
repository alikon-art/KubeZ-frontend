<template>
<button @click="showInfo">showInfo</button>>

</template>

<script setup>
import { deployment } from "./deployment.vue";
let showInfo =() =>{
        console.log(deployment);
    }

</script>