// client/src/components/CountryList.vue
<script setup lang="ts">
import { computed } from 'vue'
import { countryNames } from '@/utils/countryNames'

interface Props {
  probabilities: number[];
  countryCodes: string[];
  isLoading: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  probabilities: () => [],
  countryCodes: () => []
});

const sortedResults = computed(() => {
  if (!props.countryCodes.length || !props.probabilities.length) return [];
  
  return props.countryCodes
    .map((code, index) => ({
      code,
      name: countryNames[code],  // Access the country name from our mapping
      probability: props.probabilities[index]
    }))
    .sort((a, b) => b.probability - a.probability);
});
</script>

<template>
  <div class="mt-6">
    <div v-if="isLoading" class="text-center py-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Searching for song popularity...</p>
    </div>
    
    <div v-else-if="sortedResults.length" class="space-y-2">
      <!-- Headers -->
      <div class="grid grid-cols-3 gap-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg font-semibold">
        <div class="text-gray-900 dark:text-white">Country Code</div>
        <div class="text-gray-900 dark:text-white">Name</div>
        <div class="text-gray-900 dark:text-white text-right">Probability</div>
      </div>

      <!-- Results -->
      <div 
        v-for="result in sortedResults" 
        :key="result.code"
        class="grid grid-cols-3 gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg items-center hover:bg-gray-50 dark:hover:bg-gray-750"
      >
        <div class="text-gray-900 dark:text-white font-medium">{{ result.code }}</div>
        <div class="text-gray-700 dark:text-gray-300">{{ result.name }}</div>
        <div class="text-gray-600 dark:text-gray-400 text-right">
          {{ (result.probability * 100).toFixed(2) }}%
        </div>
      </div>
    </div>

    <div v-else-if="!isLoading" class="text-center py-4 text-gray-600 dark:text-gray-400">
      Select a track from the drop down menu
    </div>
  </div>
</template>