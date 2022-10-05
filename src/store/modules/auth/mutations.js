export default {
    setUser(state,payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration;
    },
    setSignupSuccess(state) {
        state.isSignupSuccess = true
    },
    closeSuccessDialog(state){
        state.isSignupSuccess = false
    }
}