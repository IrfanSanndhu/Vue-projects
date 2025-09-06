<script setup>
import { computed } from 'vue'
import { useActivityStore } from '../stores/activityStore'

const activityStore = useActivityStore()

// Computed properties for filter values
const priorityFilter = computed({
  get: () => activityStore.filters.priority,
  set: (value) => activityStore.setPriorityFilter(value)
})

const statusFilter = computed({
  get: () => activityStore.filters.status,
  set: (value) => activityStore.setStatusFilter(value)
})

const searchFilter = computed({
  get: () => activityStore.filters.search,
  set: (value) => activityStore.setSearchFilter(value)
})

// Clear all filters
const clearFilters = () => {
  activityStore.clearFilters()
}

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return activityStore.filters.priority !== 'all' || 
         activityStore.filters.status !== 'all' || 
         activityStore.filters.search !== ''
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-medium text-gray-800">Filter & Search</h3>
      <button
        v-if="hasActiveFilters"
        @click="clearFilters"
        class="text-sm text-primary hover:text-blue-800 font-medium transition-colors duration-200"
      >
        Clear All Filters
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Search Input -->
      <div>
        <label for="search-input" class="block text-sm font-medium text-gray-700 mb-2">Search Activities</label>
        <div class="relative">
          <input
            id="search-input"
            v-model="searchFilter"
            type="text"
            placeholder="Search by activity text..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-500"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Priority Filter -->
      <div>
        <label for="priority-filter" class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
        <select
          id="priority-filter"
          v-model="priorityFilter"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-700"
        >
          <option value="all">All Priorities</option>
          <option value="high">🔴 High Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="low">🟢 Low Priority</option>
        </select>
      </div>

      <!-- Status Filter -->
      <div>
        <label for="status-filter" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select
          id="status-filter"
          v-model="statusFilter"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-700"
        >
          <option value="all">All Status</option>
          <option value="pending">⏳ Pending</option>
          <option value="completed">✅ Completed</option>
        </select>
      </div>
    </div>

    <!-- Active Filters Display -->
    <div v-if="hasActiveFilters" class="mt-4 pt-4 border-t border-gray-200">
      <div class="flex flex-wrap gap-2">
        <span class="text-sm text-gray-600">Active filters:</span>
        
        <span v-if="priorityFilter !== 'all'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Priority: {{ priorityFilter }}
          <button @click="priorityFilter = 'all'" class="ml-1 text-blue-600 hover:text-blue-800">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </span>

        <span v-if="statusFilter !== 'all'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Status: {{ statusFilter }}
          <button @click="statusFilter = 'all'" class="ml-1 text-green-600 hover:text-green-800">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </span>

        <span v-if="searchFilter" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          Search: "{{ searchFilter }}"
          <button @click="searchFilter = ''" class="ml-1 text-purple-600 hover:text-purple-800">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>
