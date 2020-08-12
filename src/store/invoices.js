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
        },

        CREATE_INVOICE(state, value) {
            state.invoices = value
        },
    },

    actions: {
        async getInvoices({ commit }, query = {}) {
            let res = await axios.get('/api/invoices', {
                params: {
                    ...query
                }
            });
            console.log(res)
            commit('PUSH_INVOICES', res.data.data)
            return res;
        },

        async createInvoice({ commit }, { data }) {
            console.log("DATA", data)
            commit('CREATE_INVOICE', { data })

            return await axios.post('/api/invoices', data)
        }
    }
}