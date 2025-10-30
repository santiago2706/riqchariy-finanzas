// Archivo: frontend/src/stores/useMarketStore.js

import { ref } from 'vue';
import { defineStore } from 'pinia';
// La importación estática está BIEN.
import { useKioscoStore } from './useKioscoStore';

const DAY_INTERVAL_MS = 10000;

export const useMarketStore = defineStore('market', () => {

    const currentDay = ref(0);
    const marketEvent = ref(null);
    let timer = null;

    // ⛔️ NO DEBE ESTAR AQUÍ
    // const kiosco = useKioscoStore();

    function runMarketSimulation() {
        // ✅ DEBE ESTAR AQUÍ DENTRO
        // Esto rompe el bucle porque solo se llama DESPUÉS
        // de que todos los archivos han sido cargados.
        const kiosco = useKioscoStore();

        console.log(`[MOTOR]: Avanzando al Día ${currentDay.value + 1}...`);
        currentDay.value++;
        marketEvent.value = null;

        kiosco.applyPriceFluctuation(currentDay.value);

        const events = ["Se rumorea escasez de bebidas.", "La demanda de caramelos cae.", null, null];
        marketEvent.value = events[Math.floor(Math.random() * events.length)];
    }

    function startGameLoop() {
        if (timer) clearInterval(timer);
        console.log("[MOTOR]: Encendiendo el motor del juego...");
        timer = setInterval(runMarketSimulation, DAY_INTERVAL_MS);
        runMarketSimulation();
    }

    return {
        currentDay,
        marketEvent,
        startGameLoop
    };
});
