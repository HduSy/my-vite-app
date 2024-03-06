import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import './variable.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')

// import NineLottery from './views/9Lottery/index.vue'

// window['NineLottery'] = NineLottery

// console.log('import 引入的 Component NineLottery.vue 到底是啥', window['NineLottery'])

// setTimeout(() => {
//   createApp(NineLottery).mount('#app')
// }, 2000)
