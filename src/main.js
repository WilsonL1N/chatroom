import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import VueNativeSock from "vue-native-websocket-vue3"

axios.defaults.withCredentials = false

const app = createApp(App).use(router)

app.use(store)

app.use(VueNativeSock,'ws://localhost:8081/msgWebsocket',{
    store: store,
    connectManually: true,
})

app.mount('#app')

export default app
