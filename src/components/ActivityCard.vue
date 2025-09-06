<script setup>
import { ref, watch, nextTick } from 'vue'
import { useActivityStore } from '../stores/activityStore'
import ConfirmationModal from './ConfirmationModal.vue'

const props = defineProps({
  activity: {
    type: Object,
    required: true
  }
})

const activityStore = useActivityStore()
const isEditing = ref(false)
const editText = ref('')
const showDeleteModal = ref(false)

// Toggle activity completion
const toggleCompletion = () => {
  try {
    activityStore.toggleActivity(props.activity.id)
  } catch (error) {
    console.error('Error toggling activity:', error)
  }
}

// Show delete confirmation modal
const showDeleteConfirmation = () => {
  showDeleteModal.value = true
}

// Delete activity (called from modal)
const deleteActivity = () => {
  try {
    activityStore.deleteActivity(props.activity.id)
  } catch (error) {
    console.error('Error deleting activity:', error)
  }
}

// Handle modal close
const handleModalClose = () => {
  showDeleteModal.value = false
}

// Get priority color and icon
const getPriorityInfo = (priority) => {
  switch (priority) {
    case 'high':
      return { color: 'text-red-600', bg: 'bg-red-100', icon: '🔴', label: 'High' }
    case 'medium':
      return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: '🟡', label: 'Medium' }
    case 'low':
      return { color: 'text-green-600', bg: 'bg-green-100', icon: '🟢', label: 'Low' }
    default:
      return { color: 'text-gray-600', bg: 'bg-gray-100', icon: '⚪', label: 'Medium' }
  }
}

// Check if task is overdue
const isOverdue = (dueDate) => {
  if (!dueDate) return false
  const today = new Date().toISOString().split('T')[0]
  return dueDate < today && !props.activity.completed
}

// Format due date
const formatDueDate = (dueDate) => {
  if (!dueDate) return null
  const date = new Date(dueDate)
  const today = new Date()
  const diffTime = date - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays === -1) return 'Yesterday'
  if (diffDays > 0) return `In ${diffDays} days`
  return `${Math.abs(diffDays)} days ago`
}

// Start editing
const startEditing = () => {
  isEditing.value = true
  editText.value = props.activity.text
}

// Save edit
const saveEdit = () => {
  if (editText.value.trim() && editText.value.trim() !== props.activity.text) {
    try {
      activityStore.updateActivity(props.activity.id, editText.value.trim())
    } catch (error) {
      console.error('Error updating activity:', error)
    }
  }
  isEditing.value = false
}

// Cancel edit
const cancelEdit = () => {
  isEditing.value = false
  editText.value = ''
}

// Handle Enter key in edit mode
const handleEditKeyPress = (event) => {
  if (event.key === 'Enter') {
    saveEdit()
  } else if (event.key === 'Escape') {
    cancelEdit()
  }
}

// Focus edit input when editing starts
const editInput = ref(null)

// Watch for editing state to focus input
watch(isEditing, async (newValue) => {
  if (newValue) {
    await nextTick()
    editInput.value?.focus()
  }
})
</script>

<template>
  <div 
    class="activity-card bg-white border rounded-lg p-4 hover:shadow-md transition-all duration-200"
    :class="[
      { 'opacity-75': activity.completed },
      { 'border-red-300 bg-red-50': isOverdue(activity.dueDate) },
      { 'border-gray-200': !isOverdue(activity.dueDate) }
    ]"
  >
    <div class="flex items-center space-x-3">
      <!-- Checkbox -->
      <button
        @click="toggleCompletion"
        class="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200"
        :class="activity.completed 
          ? 'bg-primary border-primary text-white' 
          : 'border-gray-300 hover:border-primary'"
      >
        <svg v-if="activity.completed" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      
      <!-- Activity Text -->
      <div class="flex-1 min-w-0">
        <div v-if="!isEditing" class="flex items-center">
          <p 
            class="text-gray-800 flex-1"
            :class="{ 'line-through text-gray-500': activity.completed }"
            @dblclick="startEditing"
          >
            {{ activity.text }}
          </p>
        </div>
        
        <!-- Edit Mode -->
        <div v-else class="flex items-center space-x-2">
          <input
            v-model="editText"
            @keypress="handleEditKeyPress"
            @blur="saveEdit"
            type="text"
            class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            ref="editInput"
          />
          <button
            @click="saveEdit"
            class="px-2 py-1 text-sm bg-primary text-white rounded hover:bg-blue-800"
          >
            Save
          </button>
          <button
            @click="cancelEdit"
            class="px-2 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex items-center space-x-2">
        <!-- Edit Button -->
        <button
          v-if="!isEditing"
          @click="startEditing"
          class="p-2 text-gray-400 hover:text-primary transition-colors duration-200"
          title="Edit activity"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        
        <!-- Delete Button -->
        <button
          @click="showDeleteConfirmation"
          class="p-2 text-gray-400 hover:text-accent transition-colors duration-200"
          title="Delete activity"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Activity Metadata -->
    <div class="mt-3 flex items-center justify-between">
      <div class="flex items-center space-x-4 text-xs text-gray-500">
        <!-- Priority Badge -->
        <span 
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
          :class="getPriorityInfo(activity.priority).bg + ' ' + getPriorityInfo(activity.priority).color"
        >
          {{ getPriorityInfo(activity.priority).icon }} {{ getPriorityInfo(activity.priority).label }}
        </span>

        <!-- Due Date -->
        <span v-if="activity.dueDate" class="flex items-center space-x-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span :class="{ 'text-red-600 font-medium': isOverdue(activity.dueDate) }">
            {{ formatDueDate(activity.dueDate) }}
          </span>
        </span>

        <!-- Created Date -->
        <span>Created {{ new Date(activity.createdAt).toLocaleDateString() }}</span>
      </div>

      <!-- Overdue Warning -->
      <div v-if="isOverdue(activity.dueDate)" class="flex items-center text-xs text-red-600 font-medium">
        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        Overdue
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <ConfirmationModal
    :is-open="showDeleteModal"
    title="Delete Activity"
    :message="`Are you sure you want to delete '${activity.text}'? This action cannot be undone.`"
    confirm-text="Delete"
    cancel-text="Cancel"
    type="danger"
    @confirm="deleteActivity"
    @cancel="handleModalClose"
    @close="handleModalClose"
  />
</template>
