<script setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
// 1. IMPORTAMOS EL 'CEREBRO'
import { useKioscoStore } from '@/stores/useKioscoStore'

// 2. CONECTAMOS EL 'CEREBRO' (Tu lógica era correcta)
const kioscoStore = useKioscoStore()
const { marketEvent } = storeToRefs(kioscoStore)

// 3. 'COMPUTED' PARA MANEJAR EL EVENTO COMPLETO
const show = computed(() => !!marketEvent.value)
const eventData = computed(() => marketEvent.value || {})

// 4. LÓGICA DE ESTILO DINÁMICO (tailwind)
//    Esto lee el 'pedagogical_focus' para decidir el color [cite: "Hoja ruta, Actualizada.docx"]
const modalConfig = computed(() => {
  // Asumimos que 'type' (o 'pedagogical_focus') nos dice si es bueno o malo
  // Ajusta esta lógica si tus eventos tienen una propiedad 'type: "riesgo"' o 'type: "oportunidad"'
  const isRisk = eventData.value.message?.includes('cae') || eventData.value.message?.includes('pierdes');

  if (isRisk) {
    return {
      icon: '🚨', // Icono de Riesgo
      borderColor: 'border-red-500',
      titleColor: 'text-red-700',
      focusColor: 'bg-red-100 text-red-800'
    }
  } else {
    return {
      icon: '🎉', // Icono de Oportunidad
      borderColor: 'border-green-500',
      titleColor: 'text-green-700',
      focusColor: 'bg-green-100 text-green-800'
    }
  }
})

// 5. FUNCIÓN PARA CERRAR (Tu lógica era correcta)
function close() {
  kioscoStore.clearMarketEvent?.();
}

// 6. Cierre automático (Tu lógica era correcta)
let timeoutId;
watch(marketEvent, (newEvent) => {
  console.log('Evento de Mercado Recibido:', newEvent)
  if (newEvent) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(close, 5000); // Cierra después de 5 segundos
  }
})
</script>

<template>
  <!-- 7. ELIMINAMOS '<teleport>' por ahora para simplificar -->
  <!--    AÑADIMOS CLASES DE TAILWIND PARA UN MODAL REAL -->
  <Transition name="modal-fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <!--
        8. LA TARJETA DEL MODAL (100% Tailwind)
           ¡Quitamos todos los 'style="..."' [cite: "Informe Estratégico..."]
      -->

      <div
        class="bg-white w-full max-w-lg mx-4 p-6 rounded-2xl shadow-xl border-t-8"
        :class="modalConfig.borderColor"
      >
        <!-- Encabezado con icono y título -->
        <div class="flex items-center mb-4">
          <span class="text-4xl mr-4">{{ modalConfig.icon }}</span>
          <div>
            <h2 class="text-2xl font-bold" :class="modalConfig.titleColor">
              ¡Reto del Sol!
            </h2>
            <p class="text-lg font-semibold text-gray-700">
              {{ eventData.message }}
            </p>
          </div>
        </div>

        <!-- 9. SECCIÓN PEDAGÓGICA (¡La parte "inteligente"!) [cite: "CONTEXTO GENERAL.docx"] -->
        <div
          v-if="eventData.pedagogical_focus"
          class="p-3 rounded-lg mt-4"
          :class="modalConfig.focusColor"
        >
          <h4 class="font-bold">🧠 ¡Lección Aprendida!</h4>
          <p class="text-sm">{{ eventData.pedagogical_focus }}</p>
        </div>

        <!-- Botón de Cierre (Estilizado) -->
        <button
          @click="close"
          class="mt-6 w-full py-2 px-4 rounded-lg font-bold text-white transition-colors"
          :class="modalConfig.borderColor === 'border-red-500' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
        >
          Entendido
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Transiciones de Vue para el modal */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
