import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import jobs from './jobs'
import timesheets from './timesheets'
import quotes from './quotes'
import invoices from './invoices'
import items from './items'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    jobs,
    timesheets,
    quotes,
    invoices,
    items
  }
})
