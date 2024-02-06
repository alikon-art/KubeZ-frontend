<template>
    <el-row>
        <el-col v-for="condition in props.conditions" :key="condition.type" :span="12">
            <el-card shadow="hover" style="margin-bottom:16px" >
                <h3 style="margin-bottom: 10px;">{{ condition.type }}</h3>
                <el-descriptions  column="1">
                    <el-descriptions-item label="状态">{{ condition.status }}</el-descriptions-item>
                    <el-descriptions-item label="原因">{{ condition.reason }}</el-descriptions-item>
                    <el-descriptions-item label="消息">{{ condition.message }}</el-descriptions-item>
                    <el-descriptions-item label="最后更新时间">{{ condition.lastUpdateTime }}</el-descriptions-item>
                    <el-descriptions-item label="最后转换时间">{{ condition.lastTransitionTime }}</el-descriptions-item>
                    
                </el-descriptions>
                <!-- 点击展开更多信息 -->
                <!-- <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="更多信息" name="1">
                        <el-descriptions  column="1">
  
                    </el-descriptions>
                    </el-collapse-item>
                </el-collapse>   -->
            </el-card>
        </el-col>
    </el-row>
    </template>
    
    
    <script setup>
    const props = defineProps({
        conditions: String,
    });
    </script>