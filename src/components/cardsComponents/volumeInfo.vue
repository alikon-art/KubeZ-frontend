<template>
    <el-card  header="volume详情" style="margin-top:20px">
    <el-row>
        <el-col v-for="volume in props.volumes" :key="volume.name" :span="12">
            <el-card shadow="hover" style="margin-bottom:16px" >
                <h3 style="margin-bottom: 10px;">{{ volume.name }}</h3>
                <el-descriptions  column="1">
                    
                    <el-descriptions-item label="configMap">{{ volume.configMap }}</el-descriptions-item>
                    <el-descriptions-item label="secret">{{ volume.secret }}</el-descriptions-item>
                    <el-descriptions-item label="emptyDir">{{ volume.emptyDir }}</el-descriptions-item>
                    <el-descriptions-item label="hostPath">{{ volume.hostPath }}</el-descriptions-item>
                    <el-descriptions-item label="nfs">{{ volume.nfs }}</el-descriptions-item>
                    <el-descriptions-item label="persistentVolumeClaim">{{ volume.persistentVolumeClaim }}</el-descriptions-item>

                    
    
                </el-descriptions>
                <!-- 点击展开更多信息 -->
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="更多信息" name="1">
                        <el-descriptions  column="1">
                            <el-descriptions-item label="projected">{{ volume.projected }}</el-descriptions-item>
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
        volumes: String,
    });
    </script>