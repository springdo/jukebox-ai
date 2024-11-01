// client/src/views/HomeView.vue
<script setup lang="ts">
import { ref } from 'vue'
import AudioFeatureSlider from '@/components/AudioFeatureSlider.vue'
import { featureConfigs } from '@/utils/normalization'
import axios from 'axios'

const audioFeatures = ref({
  is_explicit: 0,
  duration_ms: 237000,
  danceability: 0.735,
  energy: 0.578,
  key: 5,
  loudness: -11.84,
  mode: 0,
  speechiness: 0.0461,
  acousticness: 0.514,
  instrumentalness: 0.0902,
  liveness: 0.0817,
  valence: 0.624,
  tempo: 98.002
})

// Keep the order consistent with your backend expectations
const orderedFeatures = [
  'is_explicit',
  'duration_ms',
  'danceability',
  'energy',
  'key',
  'loudness',
  'mode',
  'speechiness',
  'acousticness',
  'instrumentalness',
  'liveness',
  'valence',
  'tempo'
] as const

const updateFeature = (feature: keyof typeof audioFeatures.value, value: number) => {
  audioFeatures.value[feature] = value
}

const inferenceResponse = ref<any>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

const showLocation = async () => {
  // Get normalized values in the correct order
  const normalizedData = orderedFeatures.map(feature => {
    const value = audioFeatures.value[feature]
    const config = featureConfigs[feature]
    return Number(config.normalize(value).toFixed(4))
  })

  console.log('Normalized Location:', normalizedData)

  const requestBody = {
    inputs: [
      {
        name: "dense_input",
        shape: [1, 13],
        datatype: "FP32",
        data: normalizedData
      }
    ]
  }

  try {
    isLoading.value = true
    error.value = null
    
    const response = await axios.post('/api/v2/models/jukebox/infer', requestBody)
    inferenceResponse.value = response.data
    console.log('Inference Response:', response.data)
    
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
    console.error('Inference Error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Audio Features</h1>
      <button
        @click="showLocation"
        :disabled="isLoading"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isLoading">Processing...</span>
        <span v-else>Show Location</span>
      </button>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ error }}
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <AudioFeatureSlider
        v-for="feature in orderedFeatures"
        :key="feature"
        :label="feature"
        :value="audioFeatures[feature]"
        @update:value="(value) => updateFeature(feature, value)"
      />
    </div>

    <!-- Response Preview -->
    <div v-if="inferenceResponse" class="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Inference Result</h2>
      <pre class="text-sm overflow-auto bg-gray-100 dark:bg-gray-900 p-4 rounded">{{ JSON.stringify(inferenceResponse, null, 2) }}</pre>
    </div>
  </div>
</template>