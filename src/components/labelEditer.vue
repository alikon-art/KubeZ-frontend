<template>

    <!-- 展示valuePairs的表格,可以编辑 -->
    <el-table
        :data="valuePairs"
        style="width: 100%"
        :border="true"
        max-height="300"
        @mouseleave="saveValuePairsToLabels"
    >
        <el-table-column
            prop="key"
            label="键"
            width="180"
        >
            <template #default="{ row }">
                <el-input v-model="row.key" placeholder="请输入键" :disabled='props.disabled' ></el-input>
            </template>
        </el-table-column>
        <el-table-column
            prop="value"
            label="值"
            width="180"
        >
            <template #default="{ row }">
                <el-input v-model="row.value" placeholder="请输入值" :disabled='props.disabled' ></el-input>
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="180"
        >
            <template #default="{ row }">
                <el-button
                    type="danger"
                    size="small"
                    @click="deleteValuePair(row)"
                    plain
                    :disabled='props.disabled'
                > 删除</el-button>
                
            </template>
        </el-table-column>
        
    </el-table>
    <el-button @click="addValuePair('','')"  type="primary" 
    size="small" plain style="margin-top: 10px;" 
    :disabled='props.disabled'
    >添加</el-button>
    <!-- <el-button @click="convertLabelsToValuePairs"  type="plain" >转换labels</el-button> -->
    <!-- <el-button @click="saveValuePairsToLabels"  type="primary" >保存labels</el-button> -->

</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';


const props = defineProps({
    labels: {
        type: Object,
        default: () => {
        return {};
        },
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});


const valuePairs = ref([])


const logProps = () => {
    console.log('获取到的props',props);
    console.log('valuePairs',valuePairs.value);
}



// 将props.labels中的对象转换为键值对数组,添加到valuePairs中的函数
// 会将app:nginx转换为{key: 'app', value: 'nginx'}形式
const convertLabelsToValuePairs = () => {
    console.log('转换前的labels',props.labels);
    if (props.labels && typeof props.labels === 'object') {
      for (let labelKey in props.labels) {
        valuePairs.value.push({ key: labelKey, value: props.labels[labelKey] });
      }
    }
    console.log('转换后的valuePairs',valuePairs.value);
  }

// 保存valuePairs中的键值对到props.labels中
const saveValuePairsToLabels = () => {
    props.labels = {};
    valuePairs.value.forEach((pair) => {
        // 判断是否为空
        if (pair.key != '' && pair.value != '') {
            props.labels[pair.key] = pair.value;
        }
    });
    console.log('保存后的labels',props.labels);
  }


// 向valuePairs中添加键值对
const addValuePair = (key, value) => {
    valuePairs.value.push({ key, value })
}

// 删除valuePairs中的键值对
const deleteValuePair = (pair) => {
    const index = valuePairs.value.indexOf(pair);
    valuePairs.value.splice(index, 1);
    // 同时删除props.labels中的键值对
    delete props.labels[pair.key];

    console.log('删除后的labels',props.labels);
}



watchEffect(() => {
    if (props.labels) {
        convertLabelsToValuePairs();
    }
})



// 组件挂载后执行
onMounted(() => {
    logProps();
    convertLabelsToValuePairs();
    
    
  });

</script>