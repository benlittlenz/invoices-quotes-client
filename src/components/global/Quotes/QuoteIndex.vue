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
      <div v-if="quotes.length === 0">
        <p>
          You have no quotes yet.. <router-link to="/jobs/create">
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
            Create quotes
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
                  ESTIMATE
                </th>

                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  TOTAL
                </th>
           
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50" />
              </tr>
            </thead>
            <tbody
              v-for="quote in quotes"
              :key="quote.id"
              class="bg-white"
            >
              <tr
                :key="quote.id"
              >
                <td 
                  class="px-6 py-4 border-b border-gray-200 w-2/6"
                >
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm leading-5 font-medium text-gray-900 break-all">
                      <router-link :to="`/projects/${quote.id}`">
                        <p class="break-words">
                          {{quote.estimate_date}}
                        </p>
                      </router-link>
                        
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200 w-2/6">
                  <div class="w-full text-sm leading-5 text-gray-900 break-words">
                    <p class="break-words">
                    {{quote.customer.data.company}}
                    </p>
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200 w-2/6">
                  <div class="w-full text-sm leading-5 text-gray-900 break-words">
                    <p class="break-words">
                    {{quote.status}}
                    </p>
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200 w-2/6">
                  <div class="w-full text-sm leading-5 text-gray-900 break-words">
                    <p class="break-words">
                    </p>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {{quote.notes}}
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

  export default {
    data () {
      return {
        loading: true,
        filters: {}
      }
    },

    watch: {
      '$route.query': {
        handler(query) {
          console.log(query)
          this.getQuotes(query)
        },
        deep: true
      }
    },

    computed: {
      ...mapGetters({
        quotes: 'quotes/quotes'
      })
    },

    methods: {
      ...mapActions({
        getQuotes: 'quotes/getQuotes'
      }),

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
      this.getQuotes()
      this.loading = false;
    }
  }
</script>
