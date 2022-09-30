<template>
<div>
    <NavBar/>
    <div class="p-5">
        <div class="my_color d-flex flex-column align-items-center mt-4 mb-4 p-4 text-center">
            <form class="w-50">
                <div class="mb-3 text-center">
                    <label for="mod_name" class="form-label">Mod name</label>
                    <input type="text" class="form-control" id="mod_name"
                           v-model="mod_name">
                </div>
                <div class="mb-3 text-center">
                    <label for="mod_description" class="form-label">Description</label>
                    <textarea class="form-control" id="mod_description"
                              v-model="mod_description"></textarea>
                </div>
                <div class="mb-3 text-center">
                    <label for="category" class="form-label">Category</label>
                    <select class="form-select" id="category" v-model="category_id">
                        <option
                            v-for="category in allCategories"
                            :key="category.category_id"
                            :value="`${category.category_id}`"
                        >{{ category.category_name }}
                        </option>
                    </select>
                </div>

                <button type="button" class="btn btn-outline-success w-100 mb-3" @click="saveMod">Save mod</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import NavBar from "@/components/NavBar";
import axios from "axios";

import {useToast} from "vue-toastification";
const toast = useToast()

export default {
    name: "AddModVue",
    components: {NavBar},
    data() {
        return {
            token: 'chtotebezsesnugno',
            mod_name:"",
            mod_description:"",
            category_id:0,
            allCategories:[],
            mod:null
        }
    },
    created() {
        this.getAllCategories()
    },
    methods: {

        getAllCategories() {
            const token = this.token
            const url = "https://minecraftpoketedition.top:8443/api_v1/category?token=" + token

            axios.get(url).then(res => {

                this.allCategories = res.data
                this.allCategories.push({"category_id": 0, "category_name": ""})
                toast.success("All categories downloaded!", {})
            }).catch(err => {

                if (err.response) {
                    toast.error("Download failed!", {})
                }
            })
        },

        saveMod(){
            const token = localStorage.token
            const url = "https://minecraftpoketedition.top:8443/api_v1/mod"
            const data = {
                "mod_name": this.mod_name,
                "mod_description": this.mod_description,
                "category_id": this.category_id
            }

            axios.post(url, data, {
                headers: {
                    "Authorization": token
                }
            }).then(res => {
                if(res.data.length !== 0){

                    toast.success("Mod added!",{})

                    this.editMod()
                }
            }).catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message, {})
                }
            })

        },

        editMod(){

            const name = this.mod_name
            const token = this.token
            const url = "https://minecraftpoketedition.top:8443/api_v1/mod/name?token=" + token + "&mod=" + name

            axios.get(url).then(res => {

                const id = res.data[0].mod_id
                this.$router.push({path: "/mod/" + id})

            }).catch(err => {

                this.mods = []

                if (err.response) {
                    toast.error(err.response.data.message, {})
                }
            })

        },
    }
}
</script>

<style scoped>

</style>