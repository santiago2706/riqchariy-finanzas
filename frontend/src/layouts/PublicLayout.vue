<script setup>
import PublicHeader from '@/components/PublicHeader.vue'
import PublicFooter from '@/components/PublicFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-amber-50 via-emerald-50 to-cyan-50 pt-16">
    <PublicHeader />
    <main>
      <RouterView />
    </main>

    <PublicFooter />
  </div>
</template>
