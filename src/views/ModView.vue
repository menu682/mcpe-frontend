<template>
    <div>
        <NavBar/>
        <div class="p-5">
            <div class="my_color d-flex flex-column align-items-center pt-2 pb-4 mb-3 text-center">
                <h3>Find mods</h3>
                <form>
                    <div class="d-flex flex-row">
                        <div class="m-3 text-center find-card">
                            <label for="category" class="form-label">Select category</label>
                            <select class="form-select" id="category" v-model="find_category">
                                <option v-for="category in categories"
                                        :key="category.category_id"
                                        :value="`${category.category_id}`"
                                >{{ category.category_name }}
                                </option>
                            </select>
                            <button type="button" class="btn btn-outline-primary w-100 mt-3"
                                    @click="findByCategory">Find by category
                            </button>
                        </div>
                        <!--                        <div class="m-3 text-center find-card">-->
                        <!--                            <label for="version" class="form-label">Select version</label>-->
                        <!--                            <select class="form-select" id="version" v-model="find_version">-->
                        <!--                                <option v-for="version in versions"-->
                        <!--                                        :key="version.version_id"-->
                        <!--                                        :value="`${version.version_id}`"-->
                        <!--                                >{{version.version_name}}</option>-->
                        <!--                            </select>-->
                        <!--                            <button type="button" class="btn btn-outline-primary w-100 mt-3" @click="findByVersion">Find by version</button>-->
                        <!--                        </div>-->
                        <div class="m-3 text-center find-card">
                            <label for="name" class="form-label">Enter mod name</label>
                            <input type="text" class="form-control" id="name" v-model="mod_name">
                            <button type="button" class="btn btn-outline-primary w-100 mt-3"
                                    @click="findByName">Find by name
                            </button>
                        </div>
                        <div class="m-3 text-center find-card">
                            <button type="button" class="btn btn-outline-success w-100 h-100 mt-4"
                                    @click="addMod">Add new mod
                            </button>
                        </div>
                    </div>
                </form>
            </div>


            <div class="my_color d-flex flex-wrap align-items-center mt-5">
                <ModCard class="my_color m-2" v-for="mod in mods" :key="mod.mod_id" :card="mod"/>
            </div>

            <nav aria-label="pagination" class="d-flex justify-content-center mt-4">
                <ul class="pagination">
                    <li class="page-item">
                        <a v-if="current_page > 1" class="page-link bg-dark" href="#"
                           @click="paginate(current_page - 1)">Previous</a>
                        <a v-else class="page-link bg-dark">Previous</a>
                    </li>

                    <li class="page-item" v-for="page in pages" :key="page.page_number">
                        <a v-if="page.is_activ" class="page-link active bg-dark" href="#"
                           @click="paginate(page.page_number)">{{ page.page_number }}</a>
                        <a v-else class="page-link bg-dark" href="#"
                           @click="paginate(page.page_number)">{{ page.page_number }}</a>
                    </li>

                    <li class="page-item">
                        <a v-if="current_page < total_page" class="page-link bg-dark" href="#"
                           @click="paginate(current_page + 1)">Next</a>
                        <a v-else class="page-link bg-dark">Next</a>
                    </li>
                </ul>
            </nav>

        </div>
    </div>
</template>

<script>

import NavBar from "@/components/NavBar";
import ModCard from "@/components/ModCard";

import axios from "axios";
import {useToast} from "vue-toastification";

const toast = useToast()

export default {
    name: "ModView",
    components: {ModCard, NavBar},
    data() {
        return {

            token : 'chtotebezsesnugno',

            categories: [],
            find_category: "",

            // versions: [],
            // find_version: "",

            mod_name: "",

            mods: [],
            pages: [],
            total_page: 0,
            current_page: 1,

        }
    },
    created() {
        this.getAllCategories()
        this.getAllVersions()
    },
    methods: {
        getAllCategories() {
            const token = this.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/category?token=" + token

            axios.get(url).then(res => {

                this.categories = res.data
                toast.success("All categories downloaded!", {})
            }).catch(err => {

                if (err.response) {
                    toast.error("Download failed!", {})
                }
            })
        },

        getAllVersions() {
            const token = this.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/version?token=" + token

            axios.get(url).then(res => {

                this.versions = res.data
                toast.success("All versions downloaded!", {})
            }).catch(err => {

                if (err.response) {
                    toast.error("Download failed!", {})
                }
            })
        },

        findByName(){

            const name = this.mod_name
            const token = this.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/mod/name?token=" + token + "&mod=" + name

            axios.get(url).then(res => {

                this.mods = res.data
                this.total_page = 0
                this.current_page = 1
                toast.success("Mod downloaded!", {})
            }).catch(err => {

                this.mods = []

                if (err.response) {
                    toast.error(err.response.data.message, {})
                }
            })

        },

        paginate(page) {
            this.current_page = page
            this.findByCategory()
        },

        findByCategory() {

            const token = this.token
            const category = this.find_category
            const page = "&page=" + this.current_page
            const size = "&size=10"

            const url = "http://minecraftpoketedition.top:8888/api_v1/mod/page/" + category + "?token=" + token + page + size

            axios.get(url).then(res => {

                const pages = []
                for (let i = 0; i < res.data.total_pages; i++) {

                    if (i === res.data.current_page) {
                        pages[i] = {page_number: i + 1, is_activ: true}
                    } else {
                        pages[i] = {page_number: i + 1, is_activ: false}
                    }
                }

                this.mods = res.data.mods
                this.current_page = res.data.current_page + 1
                this.total_page = res.data.total_pages
                this.pages = pages

                toast.success("All mods downloaded!", {})
            }).catch(err => {

                if (err.response) {
                    this.mods = []
                    toast.error(err.response.data.message, {})
                }
            })

        },

        addMod(){
            this.$router.push({path: '/addmod'})
        }


    }
}
</script>

<style scoped>
.find-card {
    width: 200px;
    height: 100px;
}

.my_color {
    box-shadow: 0px 0px 5px 3px #141414;
}
</style>