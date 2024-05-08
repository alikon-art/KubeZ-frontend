import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import TDesign from 'tdesign-vue-next';


const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(TDesign);
app.use(ElementPlus)

app.mount('#app')
