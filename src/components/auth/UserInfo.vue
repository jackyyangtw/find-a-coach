<template>
    <base-card>
        <h2>Welcom back, {{ userName }}</h2>
        <div class="flex">
            <p>See if there has any request</p>
        </div>
        <p>Or contact with other coaches below : )</p>
        <div class="text-right">
            <base-button link to="/requests">Requests</base-button>
        </div>
    </base-card>
</template>

<script>
export default {
    computed: {
        userName(){
            return this.$store.getters.userName
        }
    },

}
</script>

<style scoped>
h2 {
    font-size: 32px;
}
p {
    font-size: 18px;
}
.flex {
    display: flex;
}
.text-right {
    text-align: right;
}
</style>