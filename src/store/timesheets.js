import axios from 'axios'

export default {
    namespaced: true,

    state: {
        timesheets: []
    },

    getters: {
        timesheets(state) {
            return state.timesheets
        },
    },

    mutations: {
        PUSH_TIMESHEETS(state, value) {
            state.timesheets = value
        }
    },

    actions: {
        async getTimesheets({ commit }) {
            let res = await axios.get('/api/timesheets');
            console.log(res)
            commit('PUSH_TIMESHEETS', res.data.data)
            return res;
        }
    }
}