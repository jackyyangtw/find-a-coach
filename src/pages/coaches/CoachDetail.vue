<template>
    <div>
        <section>
            <base-card>
                <h2>{{ fullName }}</h2>
                <h3>${{ rate }}/hour</h3>
            </base-card>
        </section>
        <section v-if="!isUser">
            <base-card>
                <header>
                    <h2>Interested? Reach out now !</h2>
                    <base-button v-if="!isInContactPage" link :to="contactLink">Contact</base-button>
                </header>
                <router-view></router-view>
            </base-card>
        </section>
        <section>
            <base-card>
                <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
                <p>{{ description }}</p>
            </base-card>
        </section>
    </div>
</template>

<script>

export default {
    props: ['id'],
    data(){
        return {
            selectedCoach: null
        }
    },
    computed: {
        contactLink() {
            // return this.$route.path + '/contact'
            return `/coaches/${this.id}/contact`
        },
        fullName() {
            return this.selectedCoach.firstName + " " + this.selectedCoach.lastName
        },
        areas() {
            return this.selectedCoach.areas
        },
        rate() {
            return this.selectedCoach.hourlyRate
        },
        description () {
            return this.selectedCoach.description
        },
        isInContactPage(){
            return this.$route.path === `/coaches/${this.id}/contact`
        },
        isUser(){
            const userId = this.$store.getters.userId
            return userId === this.$route.params.id
        }
    },
    created() {
        this.selectedCoach = this.$store.getters['coaches/coaches'].find(coach => coach.id === this.$route.params.id)
    }
}
</script>