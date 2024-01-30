<template >
<el-tag v-for="(val,key,i) in props.labels">{{key}} : {{ val }}</el-tag><br>
</template>

<script setup>
const props = defineProps({
  labels: String,
});

const user={
    id:1,
    name:"巧克力",
    gender:"萌妹"
}

// console.log(props.labels);
</script>