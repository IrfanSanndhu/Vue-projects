<script setup>
import { onMounted } from 'vue'
import { useActivityStore } from './stores/activityStore'
import ActivityForm from './components/ActivityForm.vue'
import ActivityList from './components/ActivityList.vue'
import AppBar from './components/AppBar.vue'
import FilterBar from './components/FilterBar.vue'

const activityStore = useActivityStore()

// Load activities from localStorage on app startup
onMounted(() => {
  activityStore.loadFromStorage()
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Material Design Top App Bar -->
    <AppBar />
    
    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Activity Form Section -->
      <section class="mb-8">
        <ActivityForm />
      </section>
      
      <!-- Filter Section -->
      <section class="mb-6">
        <FilterBar />
      </section>
      
      <!-- Activity List Section -->
      <section>
        <ActivityList />
      </section>
    </main>
  </div>
</template>
