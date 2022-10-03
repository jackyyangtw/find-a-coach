<template>
    <base-card>
        <header>
            <h2>Request Received</h2>
        </header>
        <h3 v-if="!hasRequest">You haven't received any request yet !</h3>
        <ul v-else>
            <request-item v-for="req in receivedRequest" :key="req.id" :email="req.email" :message="req.message"></request-item>
        </ul>
    </base-card>
</template>

<script>
import RequestItem from '../../components/coaches/RequestItem.vue';
export default {
    components: {
        RequestItem
    },
    computed: {
        hasRequest() {
            return this.$store.getters['requests/hasRequest']
        },
        receivedRequest() {
            return this.$store.getters['requests/requests']
        }
    }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>