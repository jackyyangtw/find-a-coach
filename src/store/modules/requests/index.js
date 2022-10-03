import actions from './actions';
import mutations from './mutation';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    actions,
    mutations,
    getters
}