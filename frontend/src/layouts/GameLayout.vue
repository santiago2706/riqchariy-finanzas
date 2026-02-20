<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/core/components/AppHeader.vue'
import AppSidebar from '@/core/components/AppSidebar.vue'
import MarketEventPopup from '@/modules/market/components/MarketEventPopup.vue'
import ChatbotWindow from '@/core/components/ChatbotWindow.vue'
import ToastContainer from '@/core/components/ToastContainer.vue'
import { RouterView } from 'vue-router'

const route = useRoute()

// Vistas que usan el layout sin sidebar (diseño limpio)
const hideSidebar = computed(() => 
  route.name === 'dashboard' || route.name === 'lecciones' || route.name === 'kiosco' || route.name === 'presupuesto-brote' || route.name === 'perfil' || route.name === 'configuracion'
)

// Initialize dark mode on layout load
onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode === 'true') {
    document.documentElement.classList.add('dark-mode')
    document.body.classList.add('dark-mode')
  }
})
</script>

<template>
  <div id="game-layout-container" :class="{ 'clean-mode': hideSidebar }">
    <AppHeader />
    
    <!-- Sidebar solo visible cuando NO es dashboard ni lecciones -->
    <AppSidebar v-if="!hideSidebar" />

    <main :class="hideSidebar ? 'main-clean' : 'main-with-sidebar'">
      <div class="content-wrapper">
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </main>

    <MarketEventPopup />
    <ChatbotWindow />
    <ToastContainer />
  </div>
</template>

<style scoped>
#game-layout-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF9F0 0%, #FFE8CC 50%, #E0F7F5 100%);
}

#game-layout-container.clean-mode {
  background: linear-gradient(135deg, #FFF9F0 0%, #FFE8CC 50%, #E0F7F5 100%);
}

.main-with-sidebar {
  padding-left: 256px; /* 64 * 4 = 256px (w-64) */
  padding-top: 64px; /* Height of header */
}

.main-clean {
  padding-top: 64px; /* Only header height, no sidebar */
}

.content-wrapper {
  padding: 1.5rem;
  min-height: calc(100vh - 64px);
}

@media (max-width: 768px) {
  .main-with-sidebar {
    padding-left: 0;
  }
}
</style>
