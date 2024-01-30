

<script >
    import { defineStore } from 'pinia'
    import { axiosInstance  } from "../../utils/axios/axios.vue";
    import { Message,successMessage,warningMessage,errorMessage } from "../elements/messageBox.vue";
    import { Notification } from "../elements/notification.vue";

    // 发送post请求需要的数据
    const UsePostStore = defineStore('postStore', {
    state: () => ({ 
        postData: {
            clusterid:'cluster1',
            namespace:'default',
            name:'',
        } ,
        postUrl:'pod/list',
        response:{

        }
    }),
    getters: {
        double: (state) => state.count * 2,
    },
    actions: {
        UpdatePostUrl(newUrl) {
        this.postUrl = newUrl
        },
        async SendQuerry() {
            try {
                const res = await axiosInstance.post(this.postUrl, this.postData);
                console.log(res.data);
                this.response = res.data;
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