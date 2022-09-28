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

                    <button type="button" class="btn btn-primary w-100 mb-3" @click="patchMod">Patch
                        mod
                    </button>
                    <button type="button" class="btn btn-outline-danger w-100" @click="deleteMod">
                        Delete mod
                    </button>
                </form>


            </div>

            <div
                class="my_color m-3 d-flex flex-row flex-wrap align-items-center mt-4 mb-4 p-4 text-center">
                <div v-if="mod_photos.length > 0" class="d-flex flex-row flex-wrap">
                    <div v-for="photo in mod_photos" :key="photo.id" class="my_color m-2 p-2">
                        <img :src="`${photoUrl + mod_id + '/'+ photo.link + '?token=' + token}`">
                        <button type="button" class="btn btn-outline-danger w-50 mt-3"
                                @click="deletePhoto(photo.name)">Delete photo
                        </button>
                    </div>
                </div>
                <div class="h-100 d-flex flex-column align-items-center my_color m-2 p-3">
                    <form class="h-100 d-flex flex-column align-items-center mt-5">
                        <div class="mb-3 text-center">
                            <label for="photo" class="form-label">Add photo</label>
                            <input type="file" class="form-control" id="photo">
                        </div>
                        <button type="button" class="btn btn-outline-success w-50"
                                @click="uploadPhoto">Save photo
                        </button>
                    </form>
                </div>
            </div>

            <div
                class="my_color m-3 d-flex flex-row flex-wrap align-items-center m-2 p-4 text-center">
                <div v-if="mod_files.length > 0" class="d-flex flex-row h-100 flex-wrap">
                    <div v-for="file in mod_files" :key="file.id" class="my_color m-2 p-2">
                        <h5>{{ file.name }}</h5>
                        <h5>{{ file.version.name }}</h5>

                        <button type="button" class="btn btn-outline-info w-50 m-3"
                                @click="downloadFile(file.name, file.version.name)">Download file
                        </button>
                        <button type="button" class="btn btn-outline-danger w-50 m-3"
                                @click="deleteFile(file.name, file.link, file.version.id)">Delete file
                        </button>
                    </div>
                </div>
                <div class="h-100 d-flex flex-column align-items-center my_color m-2 p-3">
                    <form class="h-100 d-flex flex-column align-items-center mt-5">
                        <div class="mb-3 text-center">
                            <label for="add_file" class="form-label">Add file</label>
                            <input type="file" class="form-control" id="add_file">
                        </div>
                        <div class="mb-3 text-center">
                            <label for="version" class="form-label">Version</label>
                            <select class="form-select" id="version" v-model="version_id">
                                <option
                                    v-for="version in allVersions"
                                    :key="version.version_id"
                                    :value="`${version.version_id}`"
                                >{{ version.version_name }}
                                </option>
                            </select>
                        </div>
                        <button type="button" class="btn btn-outline-success w-50"
                                @click="uploadFile">Save file
                        </button>
                    </form>
                </div>
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
    name: "ModEditView",
    components: {NavBar},
    data() {
        return {
            token: 'chtotebezsesnugno',
            mod_id: this.$route.params.id,
            mod_name: "",
            mod_description: "",
            mod_photos: [],
            mod_files: [],
            category_id: 0,
            allCategories: [],
            photoUrl: "http://minecraftpoketedition.top:8888/api_v1/photo/mod/getphoto/",
            allVersions: [],
            version_id: 0
        }
    },
    created() {
        this.getAllCategories(),
        this.getAllVersions(),
        this.getModById()
    },
    methods: {

        getAllVersions() {
            const token = this.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/version?token=" + token

            axios.get(url).then(res => {

                this.allVersions = res.data
                toast.success("All versions downloaded!", {})
            }).catch(err => {

                if (err.response) {
                    toast.error("Download failed!", {})
                }
            })
        },

        getAllCategories() {
            const token = this.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/category?token=" + token

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

        getModById() {

            const token = this.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/mod/" + this.mod_id + "?token=" + token

            axios.get(url).then(res => {

                this.mod_name = res.data.mod_name
                this.mod_description = res.data.mod_description
                this.category_id = res.data.mod_category.id

                if (res.data.mod_photos.length > 0) {
                    this.mod_photos = res.data.mod_photos
                } else {
                    this.mod_photos = []
                }

                if (res.data.mod_files.length > 0) {
                    this.mod_files = res.data.mod_files
                } else {
                    this.mod_files = []
                }

                toast.success("Mod downloaded!", {})
            }).catch(err => {

                if (err.response) {
                    toast.error("Download failed!", {})
                }
            })
        },

        patchMod() {

            const token = localStorage.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/mod"
            const data = {
                "id": this.mod_id,
                "mod_name": this.mod_name,
                "mod_description": this.mod_description,
                "category_id": this.category_id
            }

            axios.patch(url, data, {
                headers: {
                    "Authorization": token
                }
            }).then(res => {

                if (res.data !== null) {
                    this.categories = res.data
                    toast.success("Mod patched!", {})

                    this.getAllCategories()
                    this.getAllVersions()
                    this.getModById()

                }
            }).catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message, {})
                }
            })

        },

        uploadPhoto() {

            const token = localStorage.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/photo/mod/upload"
            const photo = document.querySelector("#photo")
            const formData = new FormData()
            const json = JSON.stringify({
                "mod_id": this.mod_id,
                "mod_name": this.mod_name,
                "mod_description": this.mod_description,
                "category_id": this.category_id
            })

            const blob = new Blob([json], {
                type: 'application/json'
            })

            formData.append("mod", blob)
            formData.append("file", photo.files[0])

            axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": token
                }
            }).then(res => {

                if (res.data !== null) {

                    toast.success("Photo uploaded!", {})

                    this.getAllCategories()
                    this.getAllVersions()
                    this.getModById()
                }
            }).catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message, {})
                }
            })

        },

        deletePhoto(name) {

            const token = localStorage.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/photo/mod/removephoto/" + this.mod_id + "/" + name

            axios.delete(url, {
                headers: {
                    "Authorization": token
                }
            }).then(res => {

                if (res.data !== null) {

                    toast.success("Photo deleted!!", {})

                    this.getAllCategories()
                    this.getAllVersions()
                    this.getModById()
                }
            }).catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message, {})
                }
            })

        },

        deleteMod() {
            this.$swal(
                {
                    title: 'Delete!',
                    text: "Are you sure you want to delete the mod?",
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

                    const url = "http://minecraftpoketedition.top:8888/api_v1/mod"
                    const token = localStorage.token
                    const data = {
                        "id": this.mod_id,
                        "mod_name": this.mod_name,
                        "mod_description": this.mod_description,
                        "category_id": this.category_id
                    }

                    axios.delete(url, {
                        headers: {
                            "Authorization": token
                        },
                        data
                    }).then(res => {

                        toast.success(res.data.message, {})
                        this.$router.push({path: '/mod'})

                    }).catch(err => {
                        toast.error(err.response.data.message, {})
                    })
                }
            })
        },

        downloadFile(file_name, version_name) {

            const token = this.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/file/download/"
                + this.mod_id + "/"
                + version_name + "/"
                + file_name
                + "?token=" + token

            axios.get(url, {
                responseType: 'blob'
            }).then(res => {

                const href = URL.createObjectURL(res.data)

                const link = document.createElement('a')
                link.href = href
                link.setAttribute('download', file_name)
                document.body.appendChild(link)
                link.click();

                document.body.removeChild(link)
                URL.revokeObjectURL(href)
            }).catch(err => {

                if (err.response) {
                    toast.error("Download failed!", {})
                }
            })
        },

        deleteFile(file_name, file_link, version_id){
            this.$swal(
                {
                    title: 'Delete!',
                    text: "Are you sure you want to delete this file?",
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

                    const url = "http://minecraftpoketedition.top:8888/api_v1/file/remove/" + this.mod_id
                    const token = localStorage.token
                    const data = {
                        "file_name": file_name,
                        "file_link": file_link,
                        "version_id": version_id
                    }

                    axios.delete(url, {
                        headers: {
                            "Authorization": token
                        },
                        data
                    }).then(res => {

                        toast.success("Deleted!", {})
                        this.mod_files = res.data.mod_files

                    }).catch(err => {
                        toast.error(err.response.data.message, {})
                    })
                }
            })
        },

        uploadFile(){

            const token = localStorage.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/file/upload"
            const file = document.querySelector("#add_file")
            const v = document.querySelector("#version")
            const version_id = v.value
            const version_name = v.options[v.selectedIndex].text
            const formData = new FormData()
            const jsonMod = JSON.stringify({
                "mod_id": this.mod_id,
                "mod_name": this.mod_name,
                "mod_description": this.mod_description,
                "category_id": this.category_id
            })

            const jsonVersion = JSON.stringify({
                "version_id": version_id,
                "version_name": version_name
            })

            const blobMod = new Blob([jsonMod], {
                type: 'application/json'
            })

            const blobVersion = new Blob([jsonVersion], {
                type: 'application/json'
            })

            formData.append("mod", blobMod)
            formData.append("version", blobVersion)
            formData.append("file", file.files[0])

            axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": token
                }
            }).then(res => {

                if (res.data !== null) {

                    toast.success("File uploaded!", {})

                    this.getAllCategories()
                    this.getAllVersions()
                    this.getModById()
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
img {
    width: 200px;
    height: 200px;
}

.my_color {
    box-shadow: 0px 0px 5px 3px #141414;
}
</style>