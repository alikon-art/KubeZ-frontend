<template>

<h3>{{ postUrl }}</h3>
<h3>{{ postData }}</h3>
<h3>{{ response }}</h3>

<button @click="updateurl">updateurl</button>
<button @click="sendquerry">sendquerry</button>
<button @click="sendMessage">sendMessage</button>
<button @click="SendNotiffication">SendNotiffication</button>
</template>

<script setup>

    import { UsePostStore } from "./myStore.vue";
    import { storeToRefs } from "pinia";
    

    const store = UsePostStore()
    const { postUrl,postData,response } = storeToRefs(store)

    function updateurl() {
        store.UpdatePostUrl('123')
        console.log(postUrl.value);
    }

    function sendMessage(){
        store.sendMessage()
    }

    function sendquerry(){
        store.SendQuerry()
    }

    function SendNotiffication(){
        store.SendNotiffication()
    }
</script>