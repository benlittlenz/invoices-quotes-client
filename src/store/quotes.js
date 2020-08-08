import axios from 'axios'

export default {
    namespaced: true,

    state: {
        quotes: []
    },

    getters: {
        quotes(state) {
            return state.quotes
        },
    },

    mutations: {
        PUSH_QUOTES(state, value) {
            state.quotes = value
        }
    },

    actions: {
        async getQuotes({ commit }, query = {}) {
            let res = await axios.get('/api/quotes', {
                params: {
                    ...query
                }
            });
            commit('PUSH_QUOTES', res.data.data)
            return res;
        }
    }
}