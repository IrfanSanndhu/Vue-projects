<script setup>
import { computed, ref } from 'vue'
import { useActivityStore } from '../stores/activityStore'
import ActivityCard from './ActivityCard.vue'
import ConfirmationModal from './ConfirmationModal.vue'

const activityStore = useActivityStore()

// Get all activities from store
const activities = computed(() => activityStore.getAllActivities)

// Check if there are any activities
const hasActivities = computed(() => activities.value.length > 0)

// Modal states
const showClearCompletedModal = ref(false)
const showClearAllModal = ref(false)

// Show clear completed modal
const showClearCompletedConfirmation = () => {
  showClearCompletedModal.value = true
}

// Show clear all modal
const showClearAllConfirmation = () => {
  showClearAllModal.value = true
}

// Clear all completed activities
const clearCompleted = () => {
  activityStore.clearCompleted()
}

// Clear all activities
const clearAll = () => {
  activityStore.clearAll()
}

// Handle modal close
const handleModalClose = () => {
  showClearCompletedModal.value = false
  showClearAllModal.value = false
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <!-- Header with actions -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-medium text-gray-800">Your Activities</h2>
      
      <!-- Action Buttons -->
      <div v-if="hasActivities" class="flex space-x-2">
        <button
          @click="showClearCompletedConfirmation"
          class="px-3 py-2 text-sm bg-secondary text-gray-800 rounded-lg hover:bg-yellow-400 focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200"
        >
          Clear Completed
        </button>
        <button
          @click="showClearAllConfirmation"
          class="px-3 py-2 text-sm bg-accent text-white rounded-lg hover:bg-pink-600 focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-200"
        >
          Clear All
        </button>
      </div>
    </div>
    
    <!-- Activities List -->
    <div v-if="hasActivities" class="space-y-3">
      <ActivityCard
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
      />
    </div>
    
    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-600 mb-2">No activities yet</h3>
      <p class="text-gray-500">Add your first activity above to get started!</p>
    </div>
  </div>

  <!-- Clear Completed Modal -->
  <ConfirmationModal
    :is-open="showClearCompletedModal"
    title="Clear Completed Activities"
    message="Are you sure you want to clear all completed activities? This action cannot be undone."
    confirm-text="Clear Completed"
    cancel-text="Cancel"
    type="warning"
    @confirm="clearCompleted"
    @cancel="handleModalClose"
    @close="handleModalClose"
  />

  <!-- Clear All Modal -->
  <ConfirmationModal
    :is-open="showClearAllModal"
    title="Clear All Activities"
    message="Are you sure you want to clear all activities? This action cannot be undone and will remove all your activities."
    confirm-text="Clear All"
    cancel-text="Cancel"
    type="danger"
    @confirm="clearAll"
    @cancel="handleModalClose"
    @close="handleModalClose"
  />
</template>
