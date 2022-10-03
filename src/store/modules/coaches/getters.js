export default {
    coaches(state){
        return state.coaches;
    },
    hasCoaches(state){
        return state.coaches && state.coaches.length > 0
    },
    isCoach(_,getters,_2,rootgetters) {
        const coaches = getters.coaches;
        const userId = rootgetters.userId;
        return coaches.some(coach => coach.id === userId)
    }
}