<template>

<p>{{ postData }}  {{ PostUrl }}</p>

</template>


<script setup>
    import { UsePostStore } from "../utils/pinia/myStore.vue";
    import { storeToRefs } from "pinia";

    const postStore = UsePostStore()
    const {postData,PostUrl} = storeToRefs(postStore)


</script>