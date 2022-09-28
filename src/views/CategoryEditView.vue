<template>
    <div>
        <NavBar/>
        <div class="p-5">
            <div class="my_color d-flex flex-column align-items-center mt-4 mb-4 p-4 text-center">
                <form>
                    <div class="mb-3 text-center">
                        <label for="category_name" class="form-label">Category name</label>
                        <input type="text" class="form-control" id="category_name"
                               v-model="category_name">
                    </div>
                    <div class="mb-3 text-center">
                        <label for="parent_id" class="form-label">Parent category</label>
                        <select class="form-select" id="parent_id" v-model="category_parent">
                            <option
                                v-for="category in allCategories"
                                :key="category.category_id"
                                :value="`${category.category_id}`"
                            >{{ category.category_name }}
                            </option>
                        </select>
                    </div>
                    <button type="button" class="btn btn-primary w-100 mb-3" @click="patchCategory">
                        Patch category
                    </button>
                    <button type="button" class="btn btn-outline-danger w-100"
                            @click="deleteCategory">Delete category
                    </button>
                </form>

                <div class="m-3">
                    <div v-if="category_photo != null">
                        <img :src="`${photoUrl + category_photo + token}`">
                        <button type="button" class="btn btn-outline-danger w-50 mt-3"
                                @click="deletePhoto">Delete photo
                        </button>
                    </div>
                    <div v-else>
                        <form>
                            <div class="mb-3 text-center">
                                <label for="category_name" class="form-label">Add photo</label>
                                <input type="file" class="form-control" id="photo">
                            </div>
                            <button type="button" class="btn btn-outline-success w-50"
                                    @click="uploadPhoto">Save photo
                            </button>
                        </form>
                    </div>

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
    name: "CategoryEditView",
    components: {NavBar},
    data() {
        return {
            category_id: this.$route.params.id,
            category_name: "",
            category_photo: null,
            category_parent: 0,
            token: "?token=chtotebezsesnugno",
            photoUrl: "http://minecraftpoketedition.top:8888/api_v1/photo/category/getphoto/" + this.$route.params.id + "/",

            allCategories: []
        }
    },
    created() {
        this.getCategoryById()
        this.getAllCategories()
    },
    methods: {

        deleteCategory() {
            this.$swal(
                {
                    title: 'Delete!',
                    text: "Are you sure you want to delete the category?",
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

                    const url = "http://minecraftpoketedition.top:8888/api_v1/category"
                    const token = localStorage.token
                    const data = {
                        "id": this.category_id,
                        "name": this.category_name,
                        "parent": this.category_parent
                    }

                    axios.delete(url, {
                        headers: {
                            "Authorization": token
                        },
                        data}).then(res => {

                        toast.success(res.data.message, {})
                        this.$router.push({path: '/category'})

                    }).catch(err => {
                        toast.error(err.response.data.message, {})
                    })
                }
            })
        },

        uploadPhoto() {

            const token = localStorage.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/photo/category/upload"
            const photo = document.querySelector("#photo")
            const formData = new FormData()
            const json = JSON.stringify({
                "id": this.category_id,
                "name": this.category_name,
                "parent": this.category_parent
            })

            const blob = new Blob([json], {
                type: 'application/json'
            })

            formData.append("category", blob)
            formData.append("file", photo.files[0])

            axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": token
                }
            }).then(res => {

                if (res.data !== null) {

                    toast.success("Photo uploaded!", {})

                    this.getCategoryById()
                    this.getAllCategories()
                }
            }).catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message, {})
                }
            })

        },

        deletePhoto() {

            const token = localStorage.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/photo/category/removephoto/" + this.category_id + "/" + this.category_photo

            axios.delete(url, {
                headers: {
                    "Authorization": token
                }
            }).then(res => {

                if (res.data !== null) {

                    toast.success("Photo deleted!", {})

                    this.getCategoryById()
                    this.getAllCategories()
                }
            }).catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message, {})
                }
            })

        },

        getCategoryById() {
            const token = this.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/category/" + this.category_id + token

            axios.get(url).then(res => {

                this.category_name = res.data.category_name
                this.category_parent = res.data.parent
                if (res.data.category_photos.length > 0) {
                    this.category_photo = res.data.category_photos[0].link
                } else {
                    this.category_photo = null
                }

                toast.success("Category downloaded!", {})
            }).catch(err => {

                if (err.response) {
                    toast.error("Download failed!", {})
                }
            })
        },

        patchCategory() {
            const token = localStorage.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/category"
            const data = {
                "id": this.category_id,
                "name": this.category_name,
                "parent": this.category_parent
            }

            axios.patch(url, data, {
                headers: {
                    "Authorization": token
                }
            }).then(res => {

                if (res.data !== null) {
                    this.categories = res.data
                    toast.success("Category patched!", {})

                    this.getCategoryById()
                    this.getAllCategories()
                }
            }).catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message, {})
                }
            })

        },

        getAllCategories() {
            const token = this.token
            const url = "http://minecraftpoketedition.top:8888/api_v1/category" + token

            axios.get(url).then(res => {

                this.allCategories = res.data
                this.allCategories.push({"category_id": 0, "category_name": ""})
                toast.success("All categories downloaded!", {})
            }).catch(err => {

                if (err.response) {
                    toast.error("Download failed!", {})
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
</style>