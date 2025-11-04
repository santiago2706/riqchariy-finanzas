<script setup>
import PublicHeader from '@/components/PublicHeader.vue' // El header "atrapante"
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="public-layout-container">
    <PublicHeader />

    <main>
      <RouterView /> </main>
  </div>
</template>
