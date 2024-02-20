<!-- 创建volume的表单 -->
<template>

<el-card style="margin-top: 20px;" header="Volumes设置">
    <el-container>
    <div>
        <!-- 左侧边栏,用于选择volume和添加volume -->
        
            <el-aside width="200px">
                <el-card header="Volume列表" style="margin-right:20px;">
                    <el-tabs
                        v-model="editableVolumeValue"
                        type="card"
                        editable
                        @edit="handleVolumeEdit"
                        :before-leave="beforeLeave"
                        @tab-click="sideTabClick"
                        tab-position="left"
                    >
                        <el-tab-pane
                        v-for="item in editableVolumes"
                        :key="item.name"
                        :label="item.name"
                        :name="item.name"
                        >
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-aside>
    </div>

    <div>
        <!-- 右侧主区域,用于根据选择的volume展示和编辑详细信息 -->
        <el-main style="padding: 0;">
            <!-- 当鼠标移出时,执行保存操作 -->
            <el-card @mouseleave="handleMouseLeave" shadow="hover" header="Volume详情">
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    :rules="rules"
                    label-width="100px"
                    status-icon
                >
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="ruleForm.name" />
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="请选择">
                            <el-option label="hostPath" value="hostPath" />
                            <el-option label="emptyDir" value="emptyDir" />
                            <el-option label="persistentVolumeClaim" value="persistentVolumeClaim" />
                        </el-select>
                    </el-form-item>
                    <!-- hostPath输入项 -->
                    <div v-if="ruleForm.type === 'hostPath'">
                    <el-form-item  label="hostPath" prop="hostpath">
                        <el-input v-model="ruleForm.hostPath.path" placeholder="请输入hostPath" />
                    </el-form-item>
                    <el-form-item label="挂载类型" prop="type">
                        <el-select v-model="ruleForm.hostPath.type" placeholder="请选择">
                            <el-option label="空(默认值)" value=" " />
                            <el-option label="DirectoryOrCreate" value="DirectoryOrCreate" />
                            <el-option label="Directory" value="Directory" />
                            <el-option label="File" value="File" />
                            <el-option label="FileOrCreate" value="FileOrCreate" />
                            <el-option label="Socket" value="Socket" />
                            <el-option label="CharDevice" value="CharDevice" />
                            <el-option label="BlockDevice" value="BlockDevice" />
                        </el-select>
                    </el-form-item>
                    </div>
                    <!-- emptyDir输入项 -->
                    <el-form-item v-if="ruleForm.type === 'emptyDir'" label="挂载介质类型" prop="emptyDir">
                        <el-select v-model="ruleForm.emptyDir.medium" placeholder="请选择">
                            <el-option label="空(默认值)" value=" " />
                            <el-option label="Memory" value="Memory" />
                        </el-select>
                    </el-form-item>
                    <!-- persistentVolumeClaim输入项 -->
                    <el-form-item v-if="ruleForm.type === 'persistentVolumeClaim'" label="persistentVolumeClaim" prop="persistentVolumeClaim">
                        <el-input v-model="ruleForm.persistentVolumeClaim.claimName" placeholder="请输入persistentVolumeClaim" />
                    </el-form-item>

                </el-form>

                <!-- <el-button @click="logref">logreg</el-button> -->
            </el-card>
        </el-main>
    </div>
</el-container>



</el-card>

</template>


<script setup>

import { reactive, ref ,watchEffect,onMounted } from 'vue'


// 导入volumeStore
import { useVolumeStore } from '@/model/volumeStore.vue'
const volumeStore = useVolumeStore()

const logref = () => {
    console.log('ruleFormRef',ruleForm);
}




const ruleForm = reactive({
    name: '',
    type: '',
    hostPath: {
        path: '',
        type: '',
    },
    emptyDir: {
        medium: '',
    },
    persistentVolumeClaim: {
        claimName: '',
    },
})

// 初始化ruleForm的函数
const initRuleForm = () => {
    ruleForm.name = ''
    ruleForm.type = ''

    ruleForm.hostPath.path = ''
    ruleForm.hostPath.type = ''

    ruleForm.emptyDir.medium = ''

    ruleForm.persistentVolumeClaim.claimName = ''
}



// 当点击左侧边栏的tab时,更新右侧主区域的内容
const sideTabClick = (tab, event) => {
    console.log('tab', tab.props.name);
    getVolumeInfo(tab.props.name)
}

// 从volumeStore中获取volume信息
// 会在点击左侧边栏的tab时调用
const getVolumeInfo = (volumeName) => {
    console.log('即将获取右侧volume信息', volumeName);

    // 初始化ruleForm
    initRuleForm()

    // 获取索引
    const index = volumeStore.getVolumeIndex(volumeName)
    // 获取volume信息
    ruleForm.name = volumeStore.volumes[index].name
    // 如果 volumeStore.volumes[index].hostPath 存在,则赋值给ruleForm.hostpath
    if (volumeStore.volumes[index].hostPath) {
        ruleForm.type = 'hostPath'
        ruleForm.hostPath.path = volumeStore.volumes[index].hostPath.path
    }
    // 如果 volumeStore.volumes[index].emptyDir 存在,则赋值给ruleForm.emptyDir
    if (volumeStore.volumes[index].emptyDir) {
        ruleForm.type = 'emptyDir'
        ruleForm.emptyDir.medium = volumeStore.volumes[index].emptyDir.medium
    }


}

// 鼠标移出时,执行保存操作
const handleMouseLeave = () => {
    console.log('鼠标移出');
    // 保存volume信息
    saveVolumeInfo()
}

// 保存volume信息
const saveVolumeInfo = () => {
    console.log('即将保存volume信息', ruleForm.name);

    // 如果ruleForm.type为hostPath,则将ruleForm.hostpath作为属性保存
    if (ruleForm.type === 'hostPath') {
        volumeStore.addVolumeAttributesWithName(ruleForm.name, {hostPath: ruleForm.hostPath})
    }
    // 如果ruleForm.type为emptyDir,则将ruleForm.emptyDir作为属性保存
    if (ruleForm.type === 'emptyDir') {
        volumeStore.addVolumeAttributesWithName(ruleForm.name, {emptyDir: ruleForm.emptyDir})
    }
    // 如果ruleForm.type为persistentVolumeClaim,则将ruleForm.persistentVolumeClaim作为属性保存
    if (ruleForm.type === 'persistentVolumeClaim') {
        volumeStore.addVolumeAttributesWithName(ruleForm.name, {persistentVolumeClaim: ruleForm.persistentVolumeClaim})
    }
    
}

// 左侧边栏的volume列表
const editableVolumes = ref([])
// 左侧边栏当前选中的volume
const editableVolumeValue = ref('')

watchEffect(() => {
    console.log('ruleForm', ruleForm);
})



// 添加和删除左侧volume标签
const volumeTabIndex = ref(0)
const handleVolumeEdit = (targetName, action) => {
    // 添加volume方法
    if (action === 'add') {
        volumeStore.addVolume()
        const newTabName = 'volume'+(++volumeTabIndex.value)
        editableVolumes.value.push({
            name: newTabName,
        })
        editableVolumeValue.value = newTabName
        // 获取新volume的信息
        getVolumeInfo(newTabName)
    }
    if (action === 'remove') {
        const tabs = editableVolumes.value
        let activeName = editableVolumeValue.value
        if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        activeName = nextTab.name
                    }
                }
            })
        }

        editableVolumeValue.value = activeName
        editableVolumes.value = tabs.filter(tab => tab.name !== targetName)
    }
}


onMounted(() => {

})

</script>