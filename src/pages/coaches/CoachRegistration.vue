<template>
    <base-card>
        <coach-form @send-data="sendDataHandler"></coach-form>   
    </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/Coachform.vue';
export default {
    components: {
        CoachForm
    },
    methods: {
        sendDataHandler(formData) {
            this.$store.dispatch('coaches/registerCoach',formData);
            this.$router.push('/coaches')
        }
    }
}
</script>