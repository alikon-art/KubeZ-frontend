

<script >
    import { defineStore } from 'pinia'
    import { axiosInstance  } from "../../utils/axios/axios.vue";
    import { Message,successMessage,warningMessage,errorMessage } from "../elements/messageBox.vue";
    import { Notification } from "../elements/notification.vue";

    // 发送post请求需要的数据
    const UsePostStore = defineStore('postStore', {
    state: () => ({ 
        // post传入的参数
        postData: {
            clusterid:'cluster1',
            namespace:'default',
            name:'',
        } ,
        // post请求的url
        postUrl:'pod/list',

        // 返回的结果,置空初始化
        response:{
        },
        // 返回结果中的data字段,list接口为列表,get/update接口为资源详情
        itemData:{
            // 一般的元数据
            metadata:{
                name:''
            },
            // cluster列表
            clusters:[],
        },
        componentsStatus:{
            listComponents:{
                needReload:false,
            },
        }
    }),

    // 计算属性
    getters: {
        
        double: (state) => state.count * 2,
    },

    // 方法(函数)
    actions: {

        UpdatePostUrl(newUrl) {
        this.postUrl = newUrl
        },

        // 发送请求的方法,有错误处理(弹窗)
        async SendQuerry() {
            try {
                const res = await axiosInstance.post(this.postUrl, this.postData);
                console.log(res.data);
                this.response = res.data;
                this.itemData = res.data.data
                // 当res内的状态码不是200
                if (res.data.status != "200") {
                    Notification('请求错误',res.data.message+'<br>'+res.data.data.error,'error');
                }
            } catch (error) {
                // 处理错误情况
                console.log(error);
                Notification(error.name, error.message, 'error');
            }
        },

        SendMessage(){
            successMessage('test seccess')
        },
    },
    })

    export {UsePostStore}
</script>