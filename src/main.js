import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app=createApp(App)
app.config.globalProperties.$url = 'http://3.216.4.3:3000/'
app.use(router).mount('#app')