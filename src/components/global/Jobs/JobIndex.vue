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
    <div class="flex">
        <button
            class="mr-2 text-gray-800 bg-gray-400 px-2 rounded-lg focus:outline-none"
            :class="{ 'bg-green-600 text-white': filters['status'] === 'New'}"
            @click.prevent='activateFilter("status", "New")'
          >New
          </button>
          <button
            class="mr-2 text-gray-800 bg-gray-400 px-2 rounded-lg focus:outline-none"
            :class="{ 'bg-green-600 text-white': filters['status'] === 'In progress'}"
            @click.prevent='activateFilter("status", "In progress")'
          >In Progress
          </button>
          <button
            class="mr-2 text-gray-800 bg-gray-400 px-2 rounded-lg focus:outline-none"   
            :class="{ 'bg-green-600 text-white': filters['status'] === 'Pending'}" 
            @click.prevent='activateFilter("status", "Pending")'
          >Pending
          </button>
          <button
            class="mr-2 text-gray-800 bg-gray-400 px-2 rounded-lg focus:outline-none"
            :class="{ 'bg-green-600 text-white': filters['status'] === 'Completed'}" 
            @click.prevent='activateFilter("status", "Completed")'
          >Completed
          </button>
          <button
            v-if="filters['status']"
            class="mr-2 text-white bg-red-600 px-2 rounded-lg focus:outline-none"
            @click.prevent="clearFilter('status')"
          >Clear Filter
          </button>
    </div>
      <div class="mt-4 mb-4">
        <button
            class="mr-2 text-gray-800 bg-gray-400 px-2 rounded-lg focus:outline-none"
            :class="{ 'bg-green-600 text-white': filters['active'] === 'active'}" 
            @click.prevent='activateFilter("active", "active")'
          >Active
          </button>
          <button
            class="mr-2 text-gray-800 bg-gray-400 px-2 rounded-lg focus:outline-none"
            :class="{ 'bg-green-600 text-white': filters['active'] === 'inactive'}" 
            @click.prevent='activateFilter("active", "inactive")'
          >Inactive
          </button>

          <button
            v-if="filters['active']"
            class="mr-2 text-white bg-red-600 px-2 rounded-lg focus:outline-none"
            @click.prevent="clearFilter('active')"
          >Clear Filter
          </button>
      </div>
      

      
    </div>

        <div class="align-middle inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200 z-0 overflow-visible">
            <ul
              v-for="project in projects"
              :key="project.id"
              class="bg-white"
            >
                <span class="mr-2">{{project.job_desc}}</span>
                <span class="mr-2">{{project.job_ref}}</span>
                <span class="mr-2">{{project.job_active}}</span>
                <span class="mr-2">{{project.job_status}}</span>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
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
          this.getProjects(query)
        },
        deep: true
      }
    },

    computed: {
      ...mapGetters({
        projects: 'jobs/projects'
      })
    },

    methods: {
      ...mapActions({
        getProjects: 'jobs/getProjects'
      }),

      activateFilter(type, value) {
        this.filters = Object.assign({}, this.filters, { [type]: value});

        this.$router.replace({
          query: {
            ...this.filters
          }
        });
      },
      clearFilter(type) {
          const omitType = (key, { [key]: _, ...obj}) => obj
          this.filters = omitType(type, this.filters)

          this.$router.replace({
          query: {
            ...this.filters
          }
        });
      }
    },

    mounted () {
      this.getProjects()
      this.loading = false;
    }
  }
</script>
