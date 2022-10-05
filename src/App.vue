<template>
    <the-header></the-header>
    <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
    components:{TheHeader},
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
    box-sizing: border-box;
}

html {
    font-family: "Roboto", sans-serif;
}

body {
    margin: 0;    
    overflow: hidden;
}

.route-enter-from {
    opacity: 0;
    transform: scale(1.1);
}
.route-leave-to {
    opacity: 0;
    transform: scale(1.1);
}
.route-enter-active,
.route-leave-active {
    transition: 0.4s;
}

.route-enter-to {
    opacity: 1;
    transform: scale(1);
}

.route-leave-from {
    opacity: 1;
    transform: scale(1);
}

</style>