<template>
    <div>
        <router-view class="height bg-dark text-light"/>
    </div>
</template>

<style lang="scss">
.height{
    min-height: 100vh;
}

@import '~sweetalert2/src/variables';

$swal2-background: #212529;
$swal2-color: rgba(0, 200, 0, 0.75);
$swal2-border: solid 1px rgba(0, 200, 0, 0.75);
$swal2-box-shadow: rgba(0, 200, 0, 0.75);


@import '~sweetalert2/src/sweetalert2';

</style>
