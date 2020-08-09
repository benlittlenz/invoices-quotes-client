<template>
  <div>
    <div v-if="loading">
      Loading..
    </div>
    <div
      v-else
      class="flex flex-col "
    >

    



    <div>
      {{filters}}
      <div>
        <button
            @click.prevent='activateFilter("status", "New")'
          >New
          </button>
          <button
            @click.prevent='activateFilter("status", "In progress")'
          >In Progress
          </button>
          <button
            @click.prevent='activateFilter("status", "Pending")'
          >Pending
          </button>
          <button
            @click.prevent='activateFilter("status", "Completed")'
          >Completed
          </button>
        </div>
      <div>
        <button
            @click.prevent='activateFilter("active", "active")'
          >Active
          </button>
          <button
            @click.prevent='activateFilter("active", "inactive")'
          >Inactive
          </button>
      </div>
      

      
    </div>
      <div v-if="invoices.length === 0">
        <p>
          You have no invoices yet.. <router-link to="/jobs/create">
            Create Job
          </router-link>
        </p>
      </div>
      <div
        v-else
        class="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        <router-link 
          class="flex items-center block"
        to="/jobs/create">
          <button class="button float-left block">
            Create invoices
          </button>
        </router-link>
        <div class="align-middle inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200 z-0 overflow-visible">
          <table class="min-w-full table-fixed action-dropdown">
            <thead>
              <tr>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  DATE
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  CUSTOMER
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  PAID STATUS
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  NUMBER
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  NUMBER
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  AMOUNT DUE
                </th>
           
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50" />
              </tr>
            </thead>
            <tbody
              v-for="invoice in invoices"
              :key="invoice.id"
              class="bg-white"
            >
              <tr
                :key="invoice.id"
              >
                <td 
                  class="px-6 py-4 border-b border-gray-200"
                >
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm leading-5 font-medium text-gray-900 break-all">
                      <router-link :to="`/projects/${invoice.id}`">
                        <p class="break-words">
                          {{invoice.date}}
                        </p>
                      </router-link>
                        
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 border-b border-gray-200">
                  <div class="w-full text-sm leading-5 text-gray-900 break-words">
                    <p class="break-words">
                    {{invoice.customer.data.company}}
                    </p>
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200">
                  <div class="w-full text-sm leading-5 text-gray-900 break-words">
                    <p class="break-words">
                    {{invoice.status}}
                    </p>
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200">
                  <div class="w-full text-sm leading-5 text-gray-900 break-words">
                    <p class="break-words">
                    {{invoice.paid_status}}
                    </p>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {{invoice.num}}
                  </span>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters, mapActions } from 'vuex'

  import VueSelect from './VueSelect'

  export default {

    components: {
      VueSelect
    },
    data () {
      return {
        loading: true,
        filters: {},
        selectedWrestler: 'Hulk Hogan',
        wrestlers: [
          'Stone Cold Steve Austin',
          'Bret Hart',
          'Ric Flair',
          'Macho Man Randy Savage',
          'Jake The Snake Roberts',
          'The Undertaker',
          'Hulk Hogan',
          'Rikishi',
          'John Cena',
          'Shawn Michaels',
          'British Bulldog',
          'Superfly Jimmy Snuka',
          'The Ultimate Warrior',
          'Andre The Giant',
          'Doink The Clown',
        ]
      }
    },

    watch: {
      '$route.query': {
        handler(query) {
          console.log(query)
          this.getInvoices(query)
        },
        deep: true
      }
    },

    computed: {
      ...mapGetters({
        invoices: 'invoices/invoices'
      })
    },

    methods: {
      ...mapActions({
        getInvoices: 'invoices/getInvoices'
      }),

      onValueSelect(value) {
        this.selectedWrestler = value;
      },

      activateFilter(type, value) {
        this.filters = Object.assign({}, this.filters, { [type]: value});

        this.$router.replace({
          query: {
            ...this.filters
          }
        });
      }
    },

    mounted () {
      this.getInvoices()
      this.loading = false;
    }
  }
</script>
