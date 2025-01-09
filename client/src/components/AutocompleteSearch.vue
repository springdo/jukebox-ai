// client/src/components/AutocompleteSearch.vue
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { loadSongs, searchSongs, validateSong, type Song } from '@/services/songService'

const emit = defineEmits<{
  (e: 'search', trackId: string): void
}>()

const query = ref('')
const songs = ref<Song[]>([])
const filteredSongs = ref<Song[]>([])
const showDropdown = ref(false)
const isLoading = ref(true)
const selectedIndex = ref(-1)
const error = ref<string | null>(null)

// Load songs on mount
onMounted(async () => {
  try {
    const data = await loadSongs()
    // Validate the data before using it
    songs.value = data.filter(validateSong)
    if (songs.value.length < data.length) {
      console.warn('Some song data was invalid and filtered out')
    }
  } catch (err) {
    error.value = 'Failed to load songs'
    console.error('Failed to load songs:', err)
  } finally {
    isLoading.value = false
  }
})

// Watch for query changes
watch(query, (newQuery) => {
  if (newQuery) {
    filteredSongs.value = searchSongs(songs.value, newQuery)
    showDropdown.value = true
    selectedIndex.value = -1
  } else {
    filteredSongs.value = []
    showDropdown.value = false
  }
})

const handleSubmit = (song?: Song) => {
  if (song) {
    emit('search', song.spotify_id)
    query.value = ''
    showDropdown.value = false
  } else if (selectedIndex.value >= 0) {
    const selectedSong = filteredSongs.value[selectedIndex.value]
    emit('search', selectedSong.spotify_id)
    query.value = ''
    showDropdown.value = false
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown') {
    selectedIndex.value = Math.min(selectedIndex.value + 1, filteredSongs.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    handleSubmit()
  } else if (e.key === 'Escape') {
    showDropdown.value = false
  }
}
</script>

<template>
  <div class="relative w-full">
    <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ error }}
    </div>

    <form @submit.prevent="handleSubmit" class="flex gap-2">
      <div class="relative flex-1">
        <input
          v-model="query"
          type="text"
          placeholder="Search by song name or artist..."
          @keydown="handleKeydown"
          @blur="() => setTimeout(() => showDropdown = false, 200)"
          @focus="showDropdown = true"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        <!-- Loading indicator -->
        <div v-if="isLoading" class="absolute right-3 top-2.5">
          <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>

        <!-- Dropdown -->
        <div
          v-if="showDropdown && filteredSongs.length > 0"
          class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-96 overflow-y-auto"
        >
          <div
            v-for="(song, index) in filteredSongs"
            :key="song.spotify_id"
            @mousedown="handleSubmit(song)"
            @mouseover="selectedIndex = index"
            class="p-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
            :class="{ 'bg-gray-100 dark:bg-gray-600': selectedIndex === index }"
          >
            <div class="font-medium text-gray-900 dark:text-white">{{ song.name }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-300">{{ song.artists }}</div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        Search
      </button>
    </form>
  </div>
</template>