// client/src/components/ResponseChart.vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

interface Props {
  data: number[];
  countryCodes: string[];
}

const props = defineProps<Props>()

const chartOptions = computed(() => {
  // Combine probabilities with country codes and sort
  const combined = props.countryCodes
    .map((code, index) => ({
      code,
      value: props.data[index]
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10) // Take top 10

  return {
    chart: {
      type: 'bar',
      height: 800,
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        distributed: true,
        columnWidth: '50%',
      }
    },
    colors: ['#3B82F6'],
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(3)
      }
    },
    xaxis: {
      categories: combined.map(item => item.code),
      labels: {
        style: {
          colors: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        },
        rotate: -45,
        rotateAlways: true
      }
    },
    yaxis: {
      min: 0,
      max: 1,
      tickAmount: 10,
      labels: {
        style: {
          colors: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        },
        formatter: (value: number) => value.toFixed(2)
      }
    },
    grid: {
      borderColor: document.documentElement.classList.contains('dark') 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.1)'
    },
    theme: {
      mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    }
  }
})

const series = computed(() => [{
  data: props.data
    .map((value, index) => ({ value, code: props.countryCodes[index] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)
    .map(item => item.value)
}])
</script>

<template>
  <div class="w-full">
    <apexchart
      type="bar"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>