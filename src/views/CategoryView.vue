<template>
    <div>
        <NavBar/>
        <div class="p-5">
            <div class="my_color d-flex flex-column align-items-center mt-4 mb-4 p-4 text-center">
                <h3>Add category form</h3>
                <form>
                    <div class="mb-3 text-center">
                        <label for="category_name" class="form-label">Category name</label>
                        <input type="text" class="form-control" id="category_name" v-model="add_category_name">
                    </div>
                    <div class="mb-3 text-center">
                        <label for="parent_id" class="form-label">Parent category</label>
                        <select class="form-select" id="parent_id" v-model="add_category_parent">
                            <option v-for="category in categories"
                                    :key="category.category_id"
                                    :value="`${category.category_id}`"
                                    >{{category.category_name}}</option>
                        </select>
                    </div>
                    <button type="button" class="btn btn-primary w-100" @click="addCategory">Add category</button>
                </form>
            </div>
            <div class="my_color d-flex flex-wrap align-items-center mt-5">
                <CategoryCard class="my_color" v-for="category in categories" :key="category.category_id" :card="category" />
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import CategoryCard from "@/components/CategoryCard";

import axios from "axios"
import { useToast } from "vue-toastification";
const toast = useToast()

export default {
    name: "CategoryView",
    components: {CategoryCard, NavBar},

    data() {
        return {
            categories: [],
            add_category_name: "",
            add_category_parent: 0,
            token: "chtotebezsesnugno"
        }
    },
    created() {
        this.getAllCategories()
    },
    methods: {
        getAllCategories(){
            const token = this.token
            const url = "https://minecraftpoketedition.top:8443/api_v1/category?token=" + token

            axios.get(url).then(res => {

                this.categories = res.data
                toast.success("All categories downloaded!", {})
            }).catch(err => {

                if (err.response) {
                    toast.error("Download failed!", {})
                }
            })
        },


        addCategory(){

            const token = localStorage.token
            const url = "https://minecraftpoketedition.top:8443/api_v1/category"
            const data = {
                "name": this.add_category_name,
                "parent": this.add_category_parent
            }

            axios.post(url, data, {
                headers: {
                    "Authorization": token
                }
            }).then(res => {
                if(res.data.length !== 0){

                    this.categories.push(res.data)
                    toast.success("Category added!",{})
                    //this.getAllCategories()
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