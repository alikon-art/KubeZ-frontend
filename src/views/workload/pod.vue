<template>
    pod
    <listComponents></listComponents>
</template>

<script setup>
    import { onMounted } from "vue";
    import listComponents from "../../components/listComponents.vue";
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    import { storeToRefs } from "pinia";



    const postStore = UsePostStore()

    const { postUrl } = storeToRefs(postStore)


    onMounted(() =>{
        // 在这里更改api地址
        // postUrl.value = 'test'
        // console.log(postUrl.value);
    })

</script>