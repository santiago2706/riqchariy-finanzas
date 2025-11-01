// Archivo: frontend/src/stores/useTransactionStore.js

import { ref } from 'vue';
import { defineStore } from 'pinia';
// Las importaciones estáticas están BIEN
import { useKioscoStore } from './useKioscoStore';
import { useMarketStore } from '../services/useMarketStore'; // El de tu compañero
import { saveGameToApi } from '../services/transactionApi.js';

export const useTransactionStore = defineStore('transaction', () => {

    const isLoading = ref(false);

    // ⛔️ ¡NO LOS LLAMES AQUÍ! (Corregido)
    // const kiosco = useKioscoStore();
    // const market = useMarketStore();

    /**
     * Esta es tu función de "Terminar Día".
     */
    async function endDayAndSave() {
        if (isLoading.value) return;
        isLoading.value = true;

        console.log("[Líder]: Iniciando secuencia de fin de día...");

        // ✅ ¡LLÁMALOS AQUÍ DENTRO! (Corregido)
        const kiosco = useKioscoStore();
        const market = useMarketStore();

        // (Tu lógica de 'stopGameLoop' y 'saveGameToApi'...)
        try {
            await saveGameToApi(kiosco.saldo, kiosco.inventory);
        } catch (error) {
            console.error("Error al guardar el juego:", error);
        } finally {
            isLoading.value = false;
        }
    }

    // Este es el único return
    return {
        isLoading,
        endDayAndSave
    };
});
