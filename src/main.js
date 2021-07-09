import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import Svgs from './assets/svg'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn'
import './guard'


createApp(App).use(store)
  .use(ElementPlus, { locale })
  .use(Svgs)
  .use(router)
  .mount('#app')
