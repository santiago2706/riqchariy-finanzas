<script setup>
import AppHeader from '@/components/AppHeader.vue'
import MarketEventPopup from '@/components/MarketEventPopup.vue'
import {RouterView} from 'vue-router'
</script>

<template>
  <AppHeader />
  <MarketEventPopup/>
  <RouterView />
</template>

<style scoped>
/* Vacío */
</style>
