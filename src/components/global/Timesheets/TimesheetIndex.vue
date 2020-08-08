<template>
  <div>
    <div v-if="loading">
      Loading..
    </div>
    <div
      v-else
      class="flex flex-col "
    >
      <div v-if="timesheets.length === 0">
        <p>
          You have no timesheets yet.. <router-link to="/jobs/create">
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
            Create Job
          </button>
        </router-link>
        <div class="align-middle inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200 z-0 overflow-visible">
          <table class="min-w-full table-fixed action-dropdown">
            <thead>
              <tr>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
           
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50" />
              </tr>
            </thead>
            <tbody
              v-for="timesheet in timesheets"
              :key="timesheet.id"
              class="bg-white"
            >
              <tr
                :key="timesheet.id"
              >
                <td 
                  class="px-6 py-4 border-b border-gray-200 w-2/6"
                >
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm leading-5 font-medium text-gray-900 break-all">
                      <router-link :to="`/projects/`">
                        <p class="break-words">
                          
                        </p>
                      </router-link>
                        
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200 w-2/6">
                  <div class="w-full text-sm leading-5 text-gray-900 break-words">
                    <p class="break-words">
                    
                    </p>
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200 w-2/6">
                  <div class="w-full text-sm leading-5 text-gray-900 break-words">
                    <p class="break-words">
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
                    Active
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
        loading: true
      }
    },

    computed: {
      ...mapGetters({
        timesheets: 'timesheets/timesheets'
      })
    },

    methods: {
      ...mapActions({
        getTimesheets: 'timesheets/getTimesheets'
      }),
    },

    mounted () {
      this.getTimesheets()
      this.loading = false;

      
    }
  }
</script>
