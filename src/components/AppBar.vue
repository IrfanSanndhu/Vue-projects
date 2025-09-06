<script setup>
import { computed } from 'vue'
import { useActivityStore } from '../stores/activityStore'

const activityStore = useActivityStore()

// Computed properties for activity statistics
const totalActivities = computed(() => activityStore.totalCount)
const completedActivities = computed(() => activityStore.completedCount)
const pendingActivities = computed(() => activityStore.pendingCount)
const overdueActivities = computed(() => activityStore.overdueCount)
const highPriorityActivities = computed(() => activityStore.highPriorityCount)
</script>

<template>
  <header class="bg-primary text-white shadow-lg">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- App Title -->
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <h1 class="text-2xl font-medium">Activity Tracker</h1>
        </div>
        
        <!-- Activity Statistics -->
        <div class="hidden lg:flex items-center space-x-4 text-sm">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-accent rounded-full"></div>
            <span>{{ totalActivities }} Total</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-secondary rounded-full"></div>
            <span>{{ pendingActivities }} Pending</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>{{ completedActivities }} Done</span>
          </div>
          <div v-if="highPriorityActivities > 0" class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>{{ highPriorityActivities }} High Priority</span>
          </div>
          <div v-if="overdueActivities > 0" class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span>{{ overdueActivities }} Overdue</span>
          </div>
        </div>
      </div>
      
      <!-- Mobile Statistics -->
      <div class="lg:hidden mt-3 pt-3 border-t border-white border-opacity-20">
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div class="flex justify-between">
            <span>{{ totalActivities }} Total</span>
            <span>{{ pendingActivities }} Pending</span>
          </div>
          <div class="flex justify-between">
            <span>{{ completedActivities }} Done</span>
            <span v-if="overdueActivities > 0" class="text-red-200">{{ overdueActivities }} Overdue</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
