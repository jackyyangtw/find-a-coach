<template>
    <section>
        <coach-filter @change-filter="filterChangeHandler"></coach-filter>
    </section>
    <base-card>
        <section>
            <div class="controls">
                <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
                <base-button v-if="!isCoach" link to="/register">Register as a Coach</base-button>
            </div>
            <ul v-if="hasCoaches">
                <coach-item v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id" :first-name="coach.firstName" :last-name="coach.lastName" :hourlyRate="coach.hourlyRate" :areas="coach.areas">
                    {{ coach.firstName }}
                </coach-item>
            </ul>
            <h3 v-else>No Coaches Found!</h3>
        </section>
    </base-card>
</template>

<script>
import coachItem from '../../components/coaches/coachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
export default {
    components: {coachItem,CoachFilter },
    data() {
        return {
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            },
        }
    },
    computed: {
        filteredCoaches(){
            const coaches = this.$store.getters['coaches/coaches']
            return coaches.filter(coach => {
                if(this.activeFilters.frontend && coach.areas.includes('frontend')) return true;
                else if(this.activeFilters.backend && coach.areas.includes('backend')) return true;
                else if(this.activeFilters.career && coach.areas.includes('career')) return true;
                else return false;
            })
        },
        hasCoaches(){
            return this.$store.getters['coaches/hasCoaches']
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach']
        }
    },
    methods: {
        filterChangeHandler(activedFilter) {
            this.activeFilters = activedFilter;
        },
        loadCoaches() {
            this.$store.dispatch('coaches/loadCoaches')
        }
    },
    created() {
        this.loadCoaches()
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>