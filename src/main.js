import * as Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import VueAxios from "vue-axios"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueSweetalert2 from 'vue-sweetalert2';


const toastOptions = {
    // You can set your default options here
    position: "bottom-right",
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
};

const alertOptions = {
    confirmButtonColor: 'rgba(0, 200, 0, 0.75)',
    cancelButtonColor: 'rgba(200, 0, 0, 0.75)',
};


Vue.createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(Toast, toastOptions)
    .use(VueSweetalert2, alertOptions)
    .mount('#app')


