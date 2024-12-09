// client/src/main.ts
import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'flowbite'

const app = createApp(App)
app.use(router)
app.use(VueApexCharts)
app.mount('#app')