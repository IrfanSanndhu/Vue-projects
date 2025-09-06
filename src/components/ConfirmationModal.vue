<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirm Action'
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?'
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  type: {
    type: String,
    default: 'warning', // warning, danger, info
    validator: (value) => ['warning', 'danger', 'info'].includes(value)
  }
})

const emit = defineEmits(['confirm', 'cancel', 'close'])

const isVisible = ref(false)

// Watch for prop changes to show/hide modal
watch(() => props.isOpen, (newValue) => {
  isVisible.value = newValue
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Handle confirm action
const handleConfirm = () => {
  emit('confirm')
  closeModal()
}

// Handle cancel action
const handleCancel = () => {
  emit('cancel')
  closeModal()
}

// Handle close action
const closeModal = () => {
  isVisible.value = false
  document.body.style.overflow = ''
  emit('close')
}

// Handle escape key
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    handleCancel()
  }
}

// Get icon based on type
const getIcon = () => {
  switch (props.type) {
    case 'danger':
      return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z'
    case 'info':
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    default: // warning
      return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z'
  }
}

// Get color classes based on type
const getColorClasses = () => {
  switch (props.type) {
    case 'danger':
      return {
        icon: 'text-red-600',
        button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
      }
    case 'info':
      return {
        icon: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
      }
    default: // warning
      return {
        icon: 'text-yellow-600',
        button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
      }
  }
}
</script>

<template>
  <!-- Modal backdrop -->
  <div
    v-if="isVisible"
    class="fixed inset-0 z-50 overflow-y-auto"
    @keydown="handleKeydown"
    tabindex="-1"
  >
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="handleCancel"
    ></div>

    <!-- Modal container -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        @click.stop
      >
        <!-- Modal content -->
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <!-- Icon -->
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                class="h-6 w-6"
                :class="getColorClasses().icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="getIcon()"
                />
              </svg>
            </div>

            <!-- Content -->
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ title }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ message }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            class="inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
            :class="getColorClasses().button"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </button>
          <button
            type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
            @click="handleCancel"
          >
            {{ cancelText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
