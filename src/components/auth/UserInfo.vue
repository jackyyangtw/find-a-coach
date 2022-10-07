<template>
    <base-card v-if="isCaoch">
        <h2>Welcom back, <span class="user-name">{{ userName }}</span></h2>
        <div class="flex">
            <p>See if there has any request</p>
        </div>
        <p>Or contact with other coaches below : )</p>
        <div class="text-right">
            <base-button link to="/requests">Requests</base-button>
        </div>
    </base-card>
    <base-card v-else>
        <h2>Hello, User,</h2>
        <h3>You haven't Register as a coah.</h3>
        <div class="text-right">
            <base-button link to="/register">Register as a coach now</base-button>  
        </div>
    </base-card>
</template>

<script>
export default {
    computed: {
        userName(){
            return this.$store.getters.userName
        },
        isCaoch(){
            return this.$store.getters['coaches/isCoach']
        }
    },

}
</script>

<style scoped>
h2 {
    font-size: 32px;
}
h3 {
    font-size: 24px;
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
.user-name {
    background-size: cover;
    background: linear-gradient(90deg, #8D006E 0%, #3D008D 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    line-height: 2;
    font-style: italic;
    display: inline-block;
    padding: 0 0.1em;
}
</style>