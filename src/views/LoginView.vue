<template>
    <div class="d-flex justify-content-center align-items-center">
        <form class="d-flex flex-column">
            <div class="mb-3 d-flex flex-column justify-content-center align-items-center">
                <label for="username" class="form-label">Login</label>
                <input type="text" class="form-control" id="login" v-model="username">
            </div>
            <div class="mb-3 d-flex flex-column justify-content-center align-items-center">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <button type="button" class="btn btn-primary d-flex justify-content-center"
                    @click="login">GO
            </button>
        </form>
    </div>
</template>

<script>

import axios from "axios"

import { useToast } from "vue-toastification";
const toast = useToast()

export default {
    name: "LoginView",
    data() {
        return {
            username: "",
            password: "",

        }
    },
    methods: {
        login() {

            const reqData = {
                "name": this.username,
                "password": this.password
            }

            const url = "http://minecraftpoketedition.top:8888/api_v1/auth/login"

            axios.post(url, reqData).then((res) => {

                if (res.data.length !== 0) {

                    localStorage.token = "Bearer " + res.data.token
                    localStorage.refreshToken = "Bearer " + res.data.refreshToken
                    localStorage.userId = res.data.id
                    localStorage.username = res.data.name
                    localStorage.userRoles = res.data.roles
                    localStorage.isAuth = true

                    toast.success("Login Ok! Please wait...",{})


                    setTimeout(this.goToAdminPanel, 3000)
                }
            }).catch(err => {
                if(err.response){

                    localStorage.clear()

                    toast.error("Login failed!",{})

                }
            })
        },

        goToAdminPanel(){
            this.$router.push({path: '/adminpanel'})
        }
    }
}
</script>

<style scoped>


</style>