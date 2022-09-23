<template>
    <div>
        <notifications position="bottom right" width="400px" classes="notif"/>
        <router-view class="height bg-dark text-light"/>
    </div>
</template>

<style lang="scss">
.height{
    min-height: 100vh;
}

.notif{
// styling
    margin: 0 20px 20px;
    padding: 10px;
    font-size: 1.2em;
    font-weight: bold;
    color: black;

// default (blue)
background: #44a4fc;
    border-left: 5px solid #187fe7;

// types (green, amber, red)
&.success {
     background: #68cd86;
     border-left-color: #42a85f;
 }

&.warn {
     background: #ffb648;
     border-left-color: #f48a06;
 }

&.error {
     background: #e54d42;
     border-left-color: #b82e24;
 }
}
</style>
