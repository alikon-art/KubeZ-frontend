<template>
<el-row>
    <el-col v-for="container in props.containers" :key="container.name" >
        <el-card shadow="always" style="margin-bottom:16px" >
            <h3 style="margin-bottom: 10px;">{{ container.name }}</h3>
            <el-descriptions  column="1">
                <el-descriptions-item label="镜像">{{ container.image }}</el-descriptions-item>
                <el-descriptions-item label="命令">{{ container.command }}</el-descriptions-item>
                <el-descriptions-item label="端口">{{ container.ports }}</el-descriptions-item>
                <el-descriptions-item label="环境变量">{{ container.env }}</el-descriptions-item>
                <el-descriptions-item label="资源限制">{{ container.resources }}</el-descriptions-item>
                <el-descriptions-item label="卷挂载">{{ container.volumeMounts }}</el-descriptions-item>
            </el-descriptions>
        </el-card>
    </el-col>
</el-row>
</template>


<script setup>
const props = defineProps({
    containers: String,
});
</script>