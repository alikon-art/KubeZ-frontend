<template>
  <el-card style="margin-top: 20px;" @mouseleave="updateData" header="Service基础设置">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="140px"
      class="demo-ruleForm"
      status-icon
    >
    <el-form-item label="service名称" prop="serviceName">
    <el-input v-model="ruleForm.serviceName" />    
    </el-form-item>

    <el-form-item label="service类型">
    <el-select v-model="service.spec.type" placeholder="请选择">
      <el-option label="ClusterIP" value="ClusterIP" />
      <el-option label="NodePort" value="NodePort" />
      <el-option label="LoadBalancer" value="LoadBalancer" />
      <el-option label="ExternalName" value="ExternalName" />
    </el-select>
    </el-form-item>

    <el-form-item label="选择要代理的资源类型">
      <el-select v-model="ruleForm.itemType" placeholder="请选择" @change="getItemList">
        <el-option label="deployment" value="deployment" />
        <el-option label="statefulset" value="statefulset" />
        <el-option label="daemonset" value="daemonset" />
        <!-- <el-option label="pod" value="pod" /> -->
      </el-select>
    </el-form-item>

    <el-form-item label="选择要代理的资源">
      <el-select v-model="ruleForm.itemName" placeholder="请选择" @change="updateServiceWtihItem" >
        <el-option v-for="item in ruleForm.itemlist.items" :label="item.name" :value="item.name" />
      </el-select>
    </el-form-item>

    <el-form-item label="自动生成标签和注释" >
        <el-switch v-model="ruleForm.showLabelEditer" />
      </el-form-item>
        <!-- 当ruleForm.showLabel为true时,展示下面表格用于自定义deploy的标签和注释 -->
      <el-form-item v-if="ruleForm.showLabelEditer" >
        <div>
        <el-tabs   v-model="activeTabName" :before-leave=beforeLeaveLabelTab(activeTabName,oldActiveName)>
          <el-tab-pane label="service标签" name="serviceLabel" />
          <el-tab-pane label="service注释" name="serviceAnnotation" />
          <el-tab-pane label="selecter标签" name="selectLabel" />
          

        <el-table :data="ruleForm.valuePairs">
            <el-table-column label="key" prop="key" width="180">
              <template v-slot="{ row }">
                <el-input v-model="row.key" />
              </template>
            </el-table-column>
            <el-table-column label="value" prop="value" width="180">
              <template v-slot="{ row }">
                <el-input v-model="row.value" />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template v-slot="{ row }">
                <el-button
                  type="text"
                  size="small"
                  @click="deletelabel(row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="addlabel">添加label</el-button>
        <el-button @click="saveLabel">保存</el-button>


        </el-tabs>
      </div>
    </el-form-item>

</el-form>
</el-card>

  <el-card header='端口设置' style="margin-top: 20px;" >
    <el-table
      :data="ruleForm.Ports"
      style="width: 100%"
      :default-sort="{prop: 'port', order: 'descending'}"
      :border="true"
      height="300"
    >
    <el-table-column
        prop="name"
        label="名称"
        width="180" 
      >
        <template #default="scope">
          <el-input v-model="scope.row.name" />
        </template>
      </el-table-column>

      <el-table-column
        prop="port"
        label="port"
        width="180"
      >
        <template #default="scope">
          <el-input   v-model="scope.row.port" />
        </template>

      </el-table-column>
      <el-table-column
        prop="targetPort"
        label="targetPort"
        width="180"
      >
        <template #default="scope">
          <el-input v-model="scope.row.targetPort" />
        </template>
      </el-table-column>

      <el-table-column
        prop="protocol"
        label="protocol"
        width="180"
      >
        <template #default="scope">
          <el-select v-model="scope.row.protocol" placeholder="请选择">
            <el-option label="TCP" value="TCP" />
            <el-option label="UDP" value="UDP" />
            <el-option label="SCTP" value="SCTP" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column 
        label="NodePort"
        width="180"
      >
        <template #default="scope">
          <el-input v-model="scope.row.nodePort" />
        </template>
      </el-table-column>



      <el-table-column
        label="操作"
        width="180" 
      >
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="deletePort(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-button @click="addPort">添加端口</el-button>
  </el-card>

  </template>
  
  <script lang="ts" setup>
    import { onMounted, reactive, ref ,watchEffect } from 'vue'

    // 导入pinia存储库
    import { useServiceStore } from "@/model/serviceStore.vue";
    import { UsePostStore } from "../../utils/pinia/postStore.vue";
    import { storeToRefs } from "pinia";

    // 加载service存储库
    const serviceStore = useServiceStore()
    const { service } = storeToRefs(serviceStore)

    // 加载postdata存储库
    const postStore  =  UsePostStore()
    const { postUrl,postData ,response,itemData,componentsStatus } = storeToRefs(postStore)


    const oldActiveName = ref('serviceLabel')


    // 添加label的方法
    const addlabel = () => {
    ruleForm.valuePairs.push({
        key: '',
        value: '',
    })
    console.log(ruleForm.valuePairs);
    
    }

    // 删除label的方法
    const deletelabel = (row: any) => {
    const index = ruleForm.valuePairs.indexOf(row)
    ruleForm.valuePairs.splice(index, 1)
    }

    // 保存编辑器中label的方法,将数据添加到ruleForm.label中
    // 会将{key: 'app',value:'nginx'}格式的valuePairs转换成符合service的label格式
    const saveLabel = (labelName) => {
      // 初始化label
      serviceStore.deleteServiceSelector()
      ruleForm.label = {}
      // 将valuePairs转换成ruleForm.label
      ruleForm.valuePairs.forEach((item) => {
        ruleForm.label[item.key] = item.value
      })
      // 根据labelName的不同,将ruleForm.label存入不同的serviceStore中
      if (labelName == 'serviceLabel') {
        serviceStore.setServiceLabels(ruleForm.label)
      } else if (labelName == 'serviceAnnotation') {
        serviceStore.setServiceAnnotations(ruleForm.label)
      } else if (labelName == 'selectLabel') {
        serviceStore.setServiceSelector(ruleForm.label)
      }

    }

    // 离开标签页时,保存数据
    const beforeLeaveLabelTab = (activeTabName,oldactiveTabName) => {
      console.log('beforeLeaveLabelTab',activeTabName,oldactiveTabName);
      saveLabel(oldActiveName)
    }
                

    // 获取资源列表
     const getItemList = async () =>{
        // 清空ruleForm.itemlist
        ruleForm.itemlist = []
        // 置空ruleForm.itemName
        ruleForm.itemName = ''

        console.log('获取资源列表');
        postUrl.value = '/'+ruleForm.itemType+'/list'
        await postStore.SendQuerry()
        // 等待上一步操作完成后,将获取的资源列表存入ruleForm.itemlist中,使用深拷贝
        ruleForm.itemlist = JSON.parse(JSON.stringify(response.value.data))
        console.log('获取到的资源列表',ruleForm.itemlist);
    }




    // 标签编辑器中当前激活的标签
    const activeTabName = ref('serviceLabel')
    const ruleForm = reactive({
    labels: {},
    
    valuePairs: [
      {
      key: '',
      value: '',
      }
    ],
    
    serviceName: '',

    Ports: [{
        port: '',
        targetPort: '',
        protocol: 'TCP',
        name: '',
    }],

    // 存放资源列表供选择
    itemlist:[],
    itemName: '',
    itemType: '',


  

    })

    const rules = reactive({
    serviceName: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    })


    // 更新service数据
    // 会在点击要代理的资源时触发
    const updateServiceWtihItem = () => {

        console.log('要代理的对象变化了,即将更新service数据');
        // 将ruleForm.itemName存入serviceStore
        ruleForm.serviceName = ruleForm.itemName
        
        console.log('itemData',itemData.value);
        
        // 从itemData列表中中寻找name=ruleForm.itemName的对象
        let item = itemData.value.items.find((item) => {
            return item.name == ruleForm.itemName
        })
        console.log('找到的item',item);

        // 将对象的labels存入ruleForm.valuePairs中
        if (item.item.metadata.labels) {
            console.log('item.item.metadata.labels存在');
            // 清空ruleForm.valuePairs
            ruleForm.valuePairs = []
            // 遍历item.item.metadata.labels,将每个label添加到ruleForm.valuePairs中
            for (let key in item.item.metadata.labels) {
                ruleForm.valuePairs.push({
                    key: key,
                    value: item.item.metadata.labels[key],
                })
            }
        }

        // 遍历containers,如果任一container存在ports,则将ports添加到ruleForm.Ports中
        for (let i = 0; i < item.item.spec.template.spec.containers.length; i++) {
          if (item.item.spec.template.spec.containers[i].ports) {
              console.log('item.item.spec.template.spec.containers[0].ports存在');
              // 清空ruleForm.Ports
              ruleForm.Ports = []
              // 遍历item.item.spec.template.spec.containers[0].ports,将每个port添加到ruleForm.Ports中
              item.item.spec.template.spec.containers[i].ports.forEach((port) => {
                  ruleForm.Ports.push({
                      port: port.containerPort,
                      targetPort: port.containerPort,
                      protocol: port.protocol,
                      name: port.name,
                  })
              })
          }
        }
       
        

        // 转换ruleForm.valuePairs到ruleForm.labels中
        ruleForm.labels = {}
        ruleForm.valuePairs.forEach((item) => {
            ruleForm.labels[item.key] = item.value
        })

        // 将ruleForm.labels存入serviceStore
        serviceStore.setServiceLabels(ruleForm.labels)
        // serviceStore.setServiceAnnotations(ruleForm.labels)
        serviceStore.setServiceSelector(ruleForm.labels)

        // 将ruleForm.Ports存入serviceStore
        serviceStore.setServicePorts(ruleForm.Ports)





        
    }
  
  
    // 保存数据
    const updateData = () => {
        console.log('保存了service数据',service.value);
        
        // 绑定serviceName
        serviceStore.setServiceName(ruleForm.serviceName)


      }



    // 添加端口
    const addPort = () =>{
        ruleForm.Ports.push({
            port: '',
            targetPort: '',
            protocol: 'TCP',
            name: '',
        })
    }

    // 删除端口
    const deletePort = (row: any) => {
        const index = ruleForm.Ports.indexOf(row)
        ruleForm.Ports.splice(index, 1)
    }


    // 监听postdata.value.namespace的变化
    watchEffect(() => {
        console.log('postdata-namespace改变了',postData.value.namespace)
        serviceStore.setServiceNamespace(postData.value.namespace)
        // 如果ruleForm.itemType不为空,则获取资源列表
        if (ruleForm.itemType != '' && ruleForm.itemName == '') {
            getItemList()
        }
    })



  </script>
  