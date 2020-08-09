import axios from 'axios'

export default {
    namespaced: true,

    state: {
        items: []
    },

    getters: {
        items(state) {
            return state.items
        },
    },

    mutations: {
        PUSH_ITEMS(state, value) {
            state.items = value
        }
    },

    actions: {
        async getItems({ commit }, query = {}) {
            let res = await axios.get('/api/items', {
                params: {
                    ...query
                }
            });
            console.log(res)
            commit('PUSH_ITEMS', res.data.data)
            return res;
        }
    }
}