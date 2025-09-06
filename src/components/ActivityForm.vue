<script setup>
import { ref } from 'vue'
import { useActivityStore } from '../stores/activityStore'

const activityStore = useActivityStore()
const newActivityText = ref('')
const newActivityPriority = ref('medium')
const newActivityDueDate = ref('')
const isLoading = ref(false)

// Add new activity
const addActivity = async () => {
  if (!newActivityText.value.trim()) {
    return
  }

  isLoading.value = true
  
  try {
    activityStore.addActivity(
      newActivityText.value, 
      newActivityPriority.value, 
      newActivityDueDate.value || null
    )
    newActivityText.value = ''
    newActivityPriority.value = 'medium'
    newActivityDueDate.value = ''
  } catch (error) {
    console.error('Error adding activity:', error)
    // You could add a toast notification here
  } finally {
    isLoading.value = false
  }
}

// Handle form submission
const handleSubmit = (event) => {
  event.preventDefault()
  addActivity()
}

// Handle Enter key press
const handleKeyPress = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    addActivity()
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-medium text-gray-800 mb-4">Add New Activity</h2>
    
    <form @submit="handleSubmit" class="space-y-4">
      <!-- Activity Input Field -->
      <div>
        <label for="activity-input" class="block text-sm font-medium text-gray-700 mb-2">Activity Description</label>
        <input
          id="activity-input"
          v-model="newActivityText"
          @keypress="handleKeyPress"
          type="text"
          placeholder="What do you need to do?"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-500"
          :disabled="isLoading"
        />
      </div>

      <!-- Priority and Due Date Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Priority Selection -->
        <div>
          <label for="priority-select" class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <select
            id="priority-select"
            v-model="newActivityPriority"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-700"
            :disabled="isLoading"
          >
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
        </div>

        <!-- Due Date -->
        <div>
          <label for="due-date-input" class="block text-sm font-medium text-gray-700 mb-2">Due Date (Optional)</label>
          <input
            id="due-date-input"
            v-model="newActivityDueDate"
            type="date"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-700"
            :disabled="isLoading"
            :min="new Date().toISOString().split('T')[0]"
          />
        </div>
      </div>
      
      <!-- Add Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="!newActivityText.trim() || isLoading"
          class="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-800 focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
        >
          <svg v-if="isLoading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>{{ isLoading ? 'Adding...' : 'Add Activity' }}</span>
        </button>
      </div>
      
      <!-- Helper Text -->
      <p class="text-sm text-gray-500">
        Press Enter to quickly add an activity
      </p>
    </form>
  </div>
</template>
