<template>
    <div>
        <NavBar/>
        <div class="container text-center align-items-center justify-content-center">
            <div class="row h-100 align-items-center justify-content-center">
                <div class="col m-4 justify-content-center">
                    <router-link to="/category" class="nav-link">
                        <div class="card bg-dark w-100">
                            <div class="card-header text-uppercase">
                                <h3>category</h3>
                            </div>
                            <div class="card-body">
                                <p>
                                    Go to add and refactor category
                                </p>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="col m-4 justify-content-center">
                    <router-link to="/mod" class="nav-link">
                        <div class="card bg-dark w-100">
                            <div class="card-header text-uppercase">
                                <h3>mods</h3>
                            </div>
                            <div class="card-body">
                                <p>
                                    Go to add and refactor mods
                                </p>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="col m-4 justify-content-center">
                    <router-link to="/version" class="nav-link">
                        <div class="card bg-dark w-100">
                            <div class="card-header text-uppercase">
                                <h3>version</h3>
                            </div>
                            <div class="card-body">
                                <p>
                                    Go to add and refactor version
                                </p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
    name: "AdminPanel",
    components: {NavBar},
    data() {
        return {}
    },
    created() {

    },
    methods: {}
}
</script>


<style scoped>

.container{
    height: 75vh;
}

.card {
    width: 300px;
    height: 200px;
    box-shadow: 0px 0px 5px 3px #141414;
}

p {
    font-size: 1.5em;
    text-align: center;
}

</style>