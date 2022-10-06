export default {
    userId(state){
        return state.userId
    },
    userName(_,getters,_2,rootGetters) {
        const coaches = rootGetters['coaches/coaches'];
        const selectedCoach = coaches.find(coach => coach.id === getters.userId);
        return selectedCoach ? `${selectedCoach.firstName} ${selectedCoach.lastName}` : undefined || localStorage.getItem('userName')
    },
    isSignupSuccess(state) {
        return state.isSignupSuccess
    },
    token(state) {
        return state.token
    },
    isAuthenticated(state) {
        return !!state.token
    },
    didAutoLogout(state) {
        return state.didAutoLogout
    }
}