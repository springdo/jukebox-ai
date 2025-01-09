// client/src/components/SearchBar.vue
<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'search', trackId: string): void
}>()

const trackId = ref('')

const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (trackId.value.trim()) {
    emit('search', trackId.value.trim())
  }
}
</script>

<template>
  <div class="w-full">
    <form @submit="handleSubmit" class="flex gap-2">
      <input
        v-model="trackId"
        type="text"
        placeholder="Enter Spotify Track ID"
        class="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        Search
      </button>
    </form>
  </div>
</template>