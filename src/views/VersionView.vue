<template>
    <div>
        <NavBar/>
        <div class="p-5">
            <div class="my_color d-flex flex-column align-items-center mt-4 mb-4 p-4 text-center">
                <h3>Add version form</h3>
                <form>
                    <div class="mb-3 text-center">
                        <label for="version_name" class="form-label">Version name</label>
                        <input type="text" class="form-control" id="version_name" v-model="add_version_name">
                    </div>
                    <button type="button" class="btn btn-primary w-100" @click="addVersion">Add version</button>
                </form>
            </div>
            <div class="my_color d-flex flex-wrap align-items-center mt-2">
                <VersionCard class="my_color" v-for="version in versions" :key="version.version_id" :card="version" />
            </div>
        </div>
    </div>
</template>

<script>

import NavBar from "@/components/NavBar";
import VersionCard from "@/components/VersionCard"

import axios from "axios"
import { useToast } from "vue-toastification";

const toast = useToast()

export default {
    name: "VersionView",
    components: {VersionCard, NavBar},
    data() {
        return {
            versions: [],
            add_version_name: "",
            token: "chtotebezsesnugno"
        }
    },
    created() {
        this.getAllVersions()
    },
    methods: {
        getAllVersions(){
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

        addVersion(){

            const token = localStorage.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/version"
            const data = {
                "name": this.add_version_name,
            }

            axios.post(url, data, {
                headers: {
                    "Authorization": token
                }
            }).then(res => {
                if(res.data.length !== 0){
                    this.versions.push(res.data)
                    toast.success("Version added!",{})
                }
            }).catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message, {})
                }
            })
        }
    }
}
</script>

<style scoped>

.my_color{
    box-shadow: 0px 0px 5px 3px #141414;
}


</style>