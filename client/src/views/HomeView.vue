// client/src/views/HomeView.vue
<script setup lang="ts">
import { ref } from 'vue'
import AudioFeatureSlider from '@/components/AudioFeatureSlider.vue'
import { featureConfigs } from '@/utils/normalization'

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

const features = [
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

const showLocation = () => {
  // Create normalized location object
  const normalizedLocation = Object.entries(audioFeatures.value).reduce((acc, [key, value]) => {
    const config = featureConfigs[key]
    const normalizedValue = Number(config.normalize(value).toFixed(4))
    return { ...acc, [key]: normalizedValue }
  }, {});

  console.log('Normalized Location:', normalizedLocation)
  // Also log original values for reference
  console.log('Original Values:', audioFeatures.value)
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Audio Features</h1>
      <button
        @click="showLocation"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        Show Location
      </button>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <AudioFeatureSlider
        v-for="feature in features"
        :key="feature"
        :label="feature"
        :value="audioFeatures[feature]"
        @update:value="(value) => updateFeature(feature, value)"
      />
    </div>
  </div>
</template>