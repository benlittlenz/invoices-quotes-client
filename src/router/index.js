import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/auth/SignIn.vue'
import Account from '../views/account/Index.vue'
import Jobs from '../components/global/Jobs/JobIndex'
import JobDetails from '../components/global/Jobs/JobDetails'
import JobModal from '../components/global/Jobs/JobModal'
import TimesheetIndex from '../components/global/Timesheets/TimesheetIndex'
import QuoteIndex from '../components/global/Quotes/QuoteIndex'
import InvoiceIndex from '../components/global/Invoices/InvoiceIndex'
import InvoiceCreate from '../components/global/Invoices/Create'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/auth/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '/projects',
    name: 'jobs',
    component: Jobs
  },
  {
    path: '/projects/:id',
    name: 'jobDetails',
    component: JobDetails
  },

  {
    path: '/jobmodal',
    name: '',
    component: JobModal
  },
  {
    path: '/timesheets',
    name: 'timesheets',
    component: TimesheetIndex
  },
  {
    path: '/quotes',
    name: 'quotes',
    component: QuoteIndex
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: InvoiceIndex
  },
  {
    path: '/invoices/create',
    name: 'invoices create',
    component: InvoiceCreate
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
