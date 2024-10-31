// src/App.vue
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <header class="border-b border-gray-800 py-4">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold">Jukebox AI</h1>
      </div>
    </header>
    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>