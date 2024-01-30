<template>
    <el-button  @click="message">message</el-button>
    <el-button  @click="successmsg">success</el-button>
    <el-button  @click="warningmsg">warning</el-button>
    <el-button  @click="errormsg">error</el-button>

</template>


<script setup>
    import { Message,successMessage,warningMessage,errorMessage } from "./messageBox.vue";


    const message = () =>{
        Message('123')
    };
    const successmsg = () =>{
        successMessage('123')
    };
    const warningmsg = () =>{
        warningMessage('123')
    };
    const errormsg = () =>{
        errorMessage('123')
    };
</script>