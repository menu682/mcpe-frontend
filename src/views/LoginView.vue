<template>
    <div class="d-flex justify-content-center align-items-center">
        <form class="d-flex flex-column">
            <div class="mb-3 d-flex flex-column justify-content-center align-items-center">
                <label for="login" class="form-label">Login</label>
                <input type="text" class="form-control" id="login">
            </div>
            <div class="mb-3 d-flex flex-column justify-content-center align-items-center">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password">
            </div>
            <button type="submit" class="btn btn-primary d-flex justify-content-center">GO</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "LoginView",
    data(){

    }
}
</script>

<style scoped>

</style>