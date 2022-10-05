import actions from './actions';
import mutations from './mutations';
import getters from './getters';
export default {
    namespaced: true,
    state(){
        return {
            userId: null,
            tokenExpiration: null,
            token: null,
            isSignupSuccess: false
        }
    },
    actions,
    mutations,
    getters
}