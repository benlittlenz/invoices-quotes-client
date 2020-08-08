import axios from 'axios'

export default {
    namespaced: true,

    state: {
        invoices: []
    },

    getters: {
        invoices(state) {
            return state.invoices
        },
    },

    mutations: {
        PUSH_INVOICES(state, value) {
            state.invoices = value
        }
    },

    actions: {
        async getInvoices({ commit }, query = {}) {
            let res = await axios.get('/api/invoices', {
                params: {
                    ...query
                }
            });
            commit('PUSH_INVOICES', res.data.data)
            return res;
        }
    }
}