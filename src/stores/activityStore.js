import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: [],
    filters: {
      priority: 'all', // all, high, medium, low
      status: 'all', // all, pending, completed
      search: ''
    }
  }),

  getters: {
    // Get filtered and sorted activities
    getFilteredActivities: (state) => {
      let filtered = [...state.activities];

      // Apply search filter
      if (state.filters.search) {
        const searchTerm = state.filters.search.toLowerCase();
        filtered = filtered.filter(activity => 
          activity.text.toLowerCase().includes(searchTerm)
        );
      }

      // Apply priority filter
      if (state.filters.priority !== 'all') {
        filtered = filtered.filter(activity => 
          activity.priority === state.filters.priority
        );
      }

      // Apply status filter
      if (state.filters.status !== 'all') {
        if (state.filters.status === 'pending') {
          filtered = filtered.filter(activity => !activity.completed);
        } else if (state.filters.status === 'completed') {
          filtered = filtered.filter(activity => activity.completed);
        }
      }

      // Sort by priority first, then by completion status, then by due date
      return filtered.sort((a, b) => {
        // Priority order: high > medium > low
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const aPriority = priorityOrder[a.priority] || 0;
        const bPriority = priorityOrder[b.priority] || 0;
        
        if (aPriority !== bPriority) {
          return bPriority - aPriority; // Higher priority first
        }

        // If same priority, pending tasks come first
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }

        // If same priority and status, sort by due date
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }

        // If no due date, maintain original order
        return 0;
      });
    },

    // Get all activities (for backward compatibility)
    getAllActivities: (state) => state.getFilteredActivities,
    
    // Get completed activities count
    completedCount: (state) => state.activities.filter(activity => activity.completed).length,
    
    // Get total activities count
    totalCount: (state) => state.activities.length,
    
    // Get pending activities count
    pendingCount: (state) => state.activities.filter(activity => !activity.completed).length,

    // Get overdue activities count
    overdueCount: (state) => {
      const today = new Date().toISOString().split('T')[0];
      return state.activities.filter(activity => 
        !activity.completed && 
        activity.dueDate && 
        activity.dueDate < today
      ).length;
    },

    // Get high priority activities count
    highPriorityCount: (state) => state.activities.filter(activity => 
      activity.priority === 'high' && !activity.completed
    ).length
  },

  actions: {
    // Load activities from localStorage on app startup
    loadFromStorage() {
      try {
        const stored = localStorage.getItem('activities')
        if (stored) {
          this.activities = JSON.parse(stored)
        }
      } catch (error) {
        console.error('Error loading activities from localStorage:', error)
        this.activities = []
      }
    },

    // Save activities to localStorage
    saveToStorage() {
      try {
        localStorage.setItem('activities', JSON.stringify(this.activities))
      } catch (error) {
        console.error('Error saving activities to localStorage:', error)
      }
    },

    // Add a new activity
    addActivity(text, priority = 'medium', dueDate = null) {
      if (!text || text.trim() === '') {
        throw new Error('Activity text cannot be empty')
      }

      const newActivity = {
        id: Date.now() + Math.random(), // Simple unique ID generation
        text: text.trim(),
        priority: priority,
        dueDate: dueDate,
        completed: false,
        createdAt: new Date().toISOString()
      }

      this.activities.unshift(newActivity) // Add to beginning of array
      this.saveToStorage()
      return newActivity
    },

    // Toggle activity completion status
    toggleActivity(id) {
      const activity = this.activities.find(activity => activity.id === id)
      if (activity) {
        activity.completed = !activity.completed
        this.saveToStorage()
        return activity
      }
      throw new Error('Activity not found')
    },

    // Delete an activity
    deleteActivity(id) {
      const index = this.activities.findIndex(activity => activity.id === id)
      if (index !== -1) {
        const deletedActivity = this.activities.splice(index, 1)[0]
        this.saveToStorage()
        return deletedActivity
      }
      throw new Error('Activity not found')
    },

    // Update activity text
    updateActivity(id, newText) {
      if (!newText || newText.trim() === '') {
        throw new Error('Activity text cannot be empty')
      }

      const activity = this.activities.find(activity => activity.id === id)
      if (activity) {
        activity.text = newText.trim()
        this.saveToStorage()
        return activity
      }
      throw new Error('Activity not found')
    },

    // Clear all completed activities
    clearCompleted() {
      this.activities = this.activities.filter(activity => !activity.completed)
      this.saveToStorage()
    },

    // Clear all activities
    clearAll() {
      this.activities = []
      this.saveToStorage()
    },

    // Filter actions
    setPriorityFilter(priority) {
      this.filters.priority = priority
    },

    setStatusFilter(status) {
      this.filters.status = status
    },

    setSearchFilter(search) {
      this.filters.search = search
    },

    clearFilters() {
      this.filters = {
        priority: 'all',
        status: 'all',
        search: ''
      }
    }
  }
})
