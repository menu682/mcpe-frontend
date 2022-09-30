<template>
    <router-link :to="/category/ + card.category_id" class="d-flex justify-content-center m-3 text-decoration-none text-bg-dark">
        <div class="d-flex justify-content-center m-3">
            <div class="card d-flex flex-row bg-dark w-100" style="width: 18rem;">
                <img v-if="card.category_photos.length > 0"
                     :src="`${photoUrl + card.category_photos[0].photo_link + token}`">
                <div class="card-body">
                    <h5 class="card-title">{{ card.category_name }}</h5>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "CategoryCard",
    props: ["card"],
    data() {
        return {
            photoUrl: "https://minecraftpoketedition.top:8443/api_v1/photo/category/getphoto/" + this.card.category_id + "/",
            token: "?token=chtotebezsesnugno"
        }
    }
}
</script>

<style scoped>

img {
    width: 100px;
    height: 100px;
}
</style>