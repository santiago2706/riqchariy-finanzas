<script setup>
import PublicHeader from '@/components/PublicHeader.vue'
import PublicFooter from '@/components/PublicFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-amber-50 via-emerald-50 to-cyan-50">
    <!-- quita el contenedor interno aquí -->
    <PublicHeader />

    <div class="mx-auto max-w-4xl px-4 sm:px-6 mt-6"></div>

    <main class="px-4 sm:px-6 pb-16">
      <div class="mx-auto max-w-6xl">
        <RouterView />
      </div>
    </main>
    <PublicFooter />
  </div>
</template>
