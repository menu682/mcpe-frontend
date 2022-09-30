<template>
    <div>
        <NavBar/>
        <div class="p-5">
            <div class="my_color d-flex flex-column align-items-center mt-4 mb-4 p-4 text-center">
                <form>
                    <div class="mb-3 text-center">
                        <label for="version_name" class="form-label">Version name</label>
                        <input type="text" class="form-control" id="version_name"
                               v-model="version_name">
                    </div>
                    <button type="button" class="btn btn-primary w-100 mb-3" @click="patchVersion">
                        Patch version
                    </button>
                    <button type="button" class="btn btn-outline-danger w-100"
                            @click="deleteVersion">Delete version
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>


import axios from "axios";
import {useToast} from "vue-toastification";
import NavBar from "@/components/NavBar";
const toast = useToast()

export default {
    name: "VersionEditView",
    components: {NavBar},
    data() {
        return {
            version_id: this.$route.params.id,
            version_name: "",
            token: "chtotebezsesnugno"
        }
    },
    created() {
        this.getVersionById()
    },
    methods: {

        deleteVersion() {
            this.$swal(
                {
                    title: 'Delete!',
                    text: "Are you sure you want to delete the version?",
                    icon: 'warning',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Delete?',
                    cancelButtonText: 'Cancel',
                    showLoaderOnConfirm: true,
                }).then((result) => {
                if (result.isConfirmed) {

                    const url = "https://minecraftpoketedition.top:8443/api_v1/version"
                    const token = localStorage.token
                    const data = {
                        "id": this.version_id,
                        "name": this.version_name
                    }

                    axios.delete(url, {
                        headers: {
                            "Authorization": token
                        },
                        data}).then(res => {

                        toast.success(res.data.message, {})
                        this.$router.push({path: '/version'})

                    }).catch(err => {
                        toast.error(err.response.data.message, {})
                    })
                }
            })
        },

        patchVersion() {
            const token = localStorage.token
            const url = "https://minecraftpoketedition.top:8443/api_v1/version"
            const data = {
                "id": this.version_id,
                "name": this.version_name
            }

            axios.patch(url, data, {
                headers: {
                    "Authorization": token
                }
            }).then(res => {

                if (res.data !== null) {
                    this.version_name = res.data.version_name
                    toast.success("Version patched!", {})

                    this.getVersionById()
                }
            }).catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message, {})
                }
            })

        },


        getVersionById() {
            const token = this.token
            const url = "https://minecraftpoketedition.top:8443/api_v1/version/" + this.version_id + "?token=" + token

            axios.get(url).then(res => {

                this.version_name = res.data.version_name

                toast.success("Version downloaded!", {})
            }).catch(err => {

                if (err.response) {
                    toast.error("Download failed!", {})
                }
            })
        },
    }
}
</script>

<style scoped>

</style>