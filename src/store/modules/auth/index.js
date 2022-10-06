import actions from './actions';
import mutations from './mutations';
import getters from './getters';
export default {
    // namespaced: true,
    state(){
        return {
            userId: null,
            token: null,
            isSignupSuccess: false,
            didAutoLogout: false
        }
    },
    actions,
    mutations,
    getters
}