// client/src/components/AudioFeatureSlider.vue
<script setup lang="ts">
import { computed } from 'vue'
import { featureConfigs } from '@/utils/normalization'

interface Props {
  label: string;
  value: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:value', value: number): void;
}>()

const formattedLabel = computed(() => {
  return props.label.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

const config = computed(() => featureConfigs[props.label])
const normalizedValue = computed(() => config.value.normalize(props.value))
const displayValue = computed(() => config.value.format(props.value))
const isExplicit = computed(() => props.label === 'is_explicit')

const handleInput = (event: Event) => {
  if (!(event.target instanceof HTMLInputElement)) return
  const normalized = parseFloat(event.target.value)
  const denormalized = config.value.denormalize(normalized)
  emit('update:value', denormalized)
}

const handleExplicitToggle = () => {
  emit('update:value', props.value === 1 ? 0 : 1)
}
</script>

<template>
  <div class="mb-6">
    <div class="flex justify-between mb-1">
      <label :for="label" class="text-sm font-medium text-gray-900 dark:text-white">
        {{ formattedLabel }}
      </label>
      <span class="text-sm font-medium text-gray-900 dark:text-white">
        {{ displayValue }}
      </span>
    </div>
    
    <!-- Toggle switch for is_explicit -->
    <div v-if="isExplicit" class="flex items-center">
      <button
        type="button"
        @click="handleExplicitToggle"
        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out"
        :class="value === 1 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'"
      >
        <span
          class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out mt-1"
          :class="value === 1 ? 'translate-x-6' : 'translate-x-1'"
        />
      </button>
    </div>
    
    <!-- Range slider for other features -->
    <input 
      v-else
      :id="label"
      type="range"
      :value="normalizedValue"
      min="0"
      max="1"
      step="0.0001"
      :disabled="disabled"
      @input="handleInput"
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
    >
  </div>
</template>