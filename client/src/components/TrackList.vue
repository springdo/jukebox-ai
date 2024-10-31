// src/components/TrackList.vue
<script setup lang="ts">
import type { Track } from '@/types/music'

defineProps<{
  tracks: Track[]
}>()

const emit = defineEmits<{
  (e: 'play', track: Track): void
}>()
</script>

<template>
  <div class="space-y-2">
    <div 
      v-for="track in tracks" 
      :key="track.id"
      class="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
    >
      <img 
        v-if="track.albumArt" 
        :src="track.albumArt" 
        :alt="track.album"
        class="w-12 h-12 rounded mr-4"
      />
      <div class="flex-grow">
        <h3 class="font-medium">{{ track.title }}</h3>
        <p class="text-gray-400">{{ track.artist }}</p>
      </div>
      <button 
        @click="emit('play', track)"
        class="p-2 rounded-full hover:bg-gray-600"
      >
        ▶️
      </button>
    </div>
  </div>
</template>

