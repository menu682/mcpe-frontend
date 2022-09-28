<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link v-if="isAuth === true" to="/adminpanel" class="navbar-brand">MCPE</router-link>
            <router-link v-else to="/login" class="navbar-brand">MCPE</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/mod" aria-current="page" class="nav-link">Mod</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/category" aria-current="page" class="nav-link">Category</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/version" aria-current="page" class="nav-link">Version</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a v-if="isAuth === true" class="nav-link auth-links" aria-current="page"
                       href="" @click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import router from "@/router";
export default {
    name: "NavBar",
    data() {
        return {

        }
    },
    computed : {
        isAuth(){
            if(localStorage.isAuth === "true"){
                return true
            }
            router.push({path: '/'})
            return false
        }
    },
    methods:{
        logout(){
            localStorage.clear()
            this.$router.push({path: '/login'})
        }
    }
}
</script>

<style scoped>
nav{
    box-shadow: 0px 0px 5px 3px #141414;
}


</style>