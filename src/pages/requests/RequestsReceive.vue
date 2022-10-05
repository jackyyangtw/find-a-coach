<template>
    <base-card>
        <header>
            <h2>Request Received</h2>
        </header>
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <h3 v-if="!hasRequest && !isLoading">You haven't received any request yet !</h3>
        <ul v-else-if="hasRequest && !isLoading">
            <request-item v-for="req in receivedRequest" :key="req.id" :email="req.email" :message="req.message"></request-item>
        </ul>
    </base-card>
</template>

<script>
import RequestItem from '../../components/coaches/RequestItem.vue';
export default {
    data() {
        return {
            isLoading: false
        }
    },
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
    },
    methods: {
        async loadRequests() {
            this.isLoading = true;
            await this.$store.dispatch('requests/loadRequests')
            this.isLoading = false;
        }
    },
    created() {
        this.loadRequests();
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