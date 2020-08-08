import axios from 'axios'

export default {
    namespaced: true,

    state: {
        projects: []
    },

    getters: {
        projects(state) {
            return state.projects
        },
    },

    mutations: {
        PUSH_PROJECTS(state, value) {
            state.projects = value
        }
    },

    actions: {
        async getProjects({ commit }, query = {}) {
            let res = await axios.get('/api/projects', {
                params: {
                    ...query
                }
            });
            commit('PUSH_PROJECTS', res.data.data)
            return res;
        }
    }
}