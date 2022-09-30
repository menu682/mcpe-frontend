<template>
    <router-link :to="/mod/ + card.mod_id" class="d-flex justify-content-center m-3 text-decoration-none text-bg-dark">
        <div class="d-flex justify-content-center m-3">
            <div class="card d-flex flex-row bg-dark w-100" style="width: 18rem;">
                <img v-if="card.mod_photos.length > 0"
                     :src="`${photoUrl + card.mod_photos[0].photo_link + token}`">
                <div class="card-body">
                    <h5 class="card-title">{{ card.mod_name }}</h5>
                    <p class="card-text">{{ card.mod_category.category_name }}</p>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "ModCard",
    props: ["card"],
    data() {
        return{
            photoUrl: "https://minecraftpoketedition.top:8443/api_v1/photo/mod/getphoto/" + this.card.mod_id + "/",
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