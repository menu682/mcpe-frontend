<template>
    <router-link :to="/version/ + card.version_id" class="d-flex justify-content-center m-3 text-decoration-none text-bg-dark">
        <div class="d-flex justify-content-center m-3">
            <div class="card d-flex flex-row bg-dark w-100" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">{{ card.version_name }}</h5>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "VersionCard",
    props: ["card"]
}
</script>

<style scoped>

</style>