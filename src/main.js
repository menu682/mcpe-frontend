import * as Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import VueAxios from "vue-axios"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Notifications from '@kyvg/vue3-notification'

Vue.createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(Notifications)
    .mount('#app')


