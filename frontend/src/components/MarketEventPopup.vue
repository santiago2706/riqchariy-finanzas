<script setup>
import {computed, watch} from 'vue'
import {storeToRefs} from 'pinia'
import {useKioscoStore} from '@/stores/useKioscoStore'

const s = useKioscoStore()
const {marketEvent} = storeToRefs(s)

const show = computed(() => !!marketEvent.value)
const message = computed(() => marketEvent.value?.message ?? 'Evento del mercado')

function close() {
  s.clearMarketEvent?.()
  marketEvent.value = null
}

let t
watch(marketEvent, (v) => {
  if(v) {
    clearTimeout(t)
    t = setTimeout(close, 4000)
  }
})
</script>

<template>
  <teleport to="body">
    <Transition name="fade">
      <div v-if="show" class="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[92vw]
                            bg-white text-slate-900 rounded-2xl shadow-lg border border-gray-100 p-4">
        <div class="flex gap-3 items-start">
          <div class="text-2xl">📈</div>
          <div class="flex-1">
            <p class="m-0 font-bold">Evento de Mercado</p>
            <p class="mt-0.5 opacity-80">{{ message }}</p>
          </div>
          <button @click="close"
                  class="px-3 py-1 rounded hover:bg-gray-100">
            Cerrar
          </button>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>
