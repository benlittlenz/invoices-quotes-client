import axios from 'axios'

export default {
    namespaced: true,

    state: {
        customers: []
    },

    getters: {
        customers(state) {
            return state.customers
        },
    },

    mutations: {
        PUSH_CUSTOMERS(state, value) {
            state.customers = value
        }
    },

    actions: {
        async getCustomers({ commit }, query = {}) {
            let res = await axios.get('/api/customers', {
                params: {
                    ...query
                }
            });
            console.log(res)
            commit('PUSH_CUSTOMERS', res.data.data)
            return res;
        }
    }
}