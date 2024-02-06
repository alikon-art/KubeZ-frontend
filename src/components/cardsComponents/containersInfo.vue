<template>
<el-card  header="Container详情" style="margin-top:20px">
<el-row>
    <el-col v-for="container in props.containers" :key="container.name"  :span="12">
        <el-card shadow="hover" style="margin-bottom:16px" >
            <h3 style="margin-bottom: 10px;">{{ container.name }}</h3>
            <el-descriptions  column="1">
                <el-descriptions-item label="镜像">{{ container.image }}</el-descriptions-item>
                <el-descriptions-item label="命令">{{ container.command }}</el-descriptions-item>
                <el-descriptions-item label="端口">
                    <el-tag effect="plain" v-for="port in container.ports" :key="port.containerPort">{{ port.name }} : {{ port.containerPort }} : {{ port.protocol }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="环境变量">
                    <el-tag effect="plain" v-for="env in container.env" :key="env.name">{{ env.name }} : {{ env.value }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="卷挂载">   
                    <el-tag effect="plain" v-for="volume in container.volumeMounts" :key="volume.name">{{ volume.name }} : {{ volume.mountPath }}</el-tag>
                </el-descriptions-item>

            </el-descriptions>
            <!-- 点击展开更多信息 -->
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="更多信息" name="1">
                    <el-descriptions  column="1">
                        <el-descriptions-item label="资源限制">{{ container.resources }}</el-descriptions-item>
                        <el-descriptions-item label="livenessProbe">{{ container.livenessProbe }}</el-descriptions-item>
                        <el-descriptions-item label="readinessProbe">{{ container.readinessProbe }}</el-descriptions-item>
                        <el-descriptions-item label="安全上下文">{{ container.securityContext }}</el-descriptions-item>
                        <el-descriptions-item label="terminationMessagePath">{{ container.terminationMessagePath }}</el-descriptions-item>
                        <el-descriptions-item label="terminationMessagePolicy">{{ container.terminationMessagePolicy }}</el-descriptions-item>
                        <el-descriptions-item label="imagePullPolicy">{{ container.imagePullPolicy }}</el-descriptions-item>
                        <el-descriptions-item label="stdin">{{ container.stdin }}</el-descriptions-item>
                        <el-descriptions-item label="stdinOnce">{{ container.stdinOnce }}</el-descriptions-item>
                        <el-descriptions-item label="tty">{{ container.tty }}</el-descriptions-item>
                </el-descriptions>
                </el-collapse-item>
            </el-collapse>  
        </el-card>
    </el-col>
</el-row>
</el-card>
</template>


<script setup>
const props = defineProps({
    containers: String,
});
</script>