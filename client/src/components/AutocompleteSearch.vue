// client/src/components/AutocompleteSearch.vue
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { loadSongs, searchSongs, type Song } from '@/services/songService'

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
const currentSong = ref<Song | null>(null)

// Load songs on mount
onMounted(async () => {
  try {
    songs.value = await loadSongs()
  } catch (err) {
    error.value = 'Failed to load songs'
    console.error('Failed to load songs:', err)
  } finally {
    isLoading.value = false
  }
})

// Watch for query changes to update filtered songs
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

const handleSubmit = (e: Event | Song) => {
  e.preventDefault?.()
  
  // If it's a Song object (from dropdown selection)
  if (typeof e !== 'string' && 'spotify_id' in e) {
    currentSong.value = e
    emit('search', e.spotify_id)
    query.value = ''
    showDropdown.value = false
    return
  }

  // If it's a keyboard selection from dropdown
  if (selectedIndex.value >= 0 && filteredSongs.value.length > 0) {
    const selectedSong = filteredSongs.value[selectedIndex.value]
    currentSong.value = selectedSong
    emit('search', selectedSong.spotify_id)
    query.value = ''
    showDropdown.value = false
    return
  }

  // If it's a direct search with query text (no dropdown selection)
  if (query.value.trim()) {
    emit('search', query.value.trim())
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
    // Only prevent default if we have filtered results and one is selected
    if (filteredSongs.value.length > 0 && selectedIndex.value >= 0) {
      e.preventDefault()
      handleSubmit(e)
    }
  } else if (e.key === 'Escape') {
    showDropdown.value = false
  }
}

const clearCurrentSong = () => {
  currentSong.value = null
  query.value = ''
}
</script>

<template>
  <div class="relative w-full">
    <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ error }}
    </div>

    <!-- Current Song Display -->
    <div v-if="currentSong" class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <div class="flex justify-between items-center">
        <div>
          <div class="font-medium text-gray-900 dark:text-white">
            {{ currentSong.name }}
          </div>
          <div data-cy="search-results" class="text-sm text-gray-600 dark:text-gray-300">
            {{ currentSong.artists }}
          </div>
        </div>
        <button
          @click="clearCurrentSong"
          class="p-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full"
          title="Clear selection"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="flex gap-2">
      <div class="relative flex-1">
        <input
          v-model="query"
          type="text"
          data-cy="search-input"
          placeholder="Search by song name, artist, or enter Spotify ID..."
          @keydown="handleKeydown"
          @blur="() => setTimeout(() => showDropdown = false, 200)"
          @focus="showDropdown = true"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        <div v-if="isLoading" class="absolute right-3 top-2.5">
          <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>

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