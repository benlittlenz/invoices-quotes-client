import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import jobs from './jobs'
import timesheets from './timesheets'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    jobs,
    timesheets
  }
})
