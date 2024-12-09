// client/src/components/ResponseChart.vue
<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  data: number[]
}

const props = defineProps<Props>()

const chartOptions = computed(() => {
  const labels = props.data.map((_, index) => `${index}`)
  const values = [...props.data]

  // Sort and get top 10
  const combined = labels.map((label, i) => ({ label, value: values[i] }))
  combined.sort((a, b) => b.value - a.value)
  const top10 = combined.slice(0, 10)

  const isDark = document.documentElement.classList.contains('dark')
  const textColor = isDark ? '#fff' : '#1f2937' // gray-900 for light mode

  return {
    chart: {
      type: 'bar',
      height: 800,
      toolbar: {
        show: false
      },
      background: 'transparent',
      foreColor: textColor // Set default text color
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        distributed: true,
        columnWidth: '50%',
        dataLabels: {
          position: 'top'
        }
      }
    },
    colors: ['#3B82F6'],
    dataLabels: {
      enabled: true,
      formatter: (val: number) => val.toFixed(3),
      style: {
        colors: [textColor]
      }
    },
    xaxis: {
      categories: top10.map(item => item.label),
      labels: {
        style: {
          colors: new Array(10).fill(textColor)
        },
        rotate: -45,
        rotateAlways: true
      },
      axisBorder: {
        color: isDark ? '#374151' : '#e5e7eb' // gray-700 for dark, gray-200 for light
      },
      axisTicks: {
        color: isDark ? '#374151' : '#e5e7eb'
      }
    },
    yaxis: {
      min: 0,
      max: 1,
      tickAmount: 10,
      labels: {
        style: {
          colors: [textColor]
        },
        formatter: (value: number) => value.toFixed(2)
      }
    },
    grid: {
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      strokeDashArray: 4
    },
    theme: {
      mode: isDark ? 'dark' : 'light'
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light'
    }
  }
})

const series = computed(() => [{
  data: [...props.data]
    .map((value, index) => ({ value, index }))
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