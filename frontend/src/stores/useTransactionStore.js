import {ref} from 'vue';
import {defineStore} from 'pinia';
import {useKioscoStore} from './useKioscoStore';
import {useMarketStore} from './useMarketStore';
import {saveGameToApi} from '../services/transactionApi.js';

export const useTransactionStore = defineStore('transaction', () => {
const isLoading = ref(false);

async function endDayAndSave() {
if (isLoading.value) return;
isLoading.value = true;
console.log("[Líder]: Iniciando secuencia de fin de día...");
const kiosco = useKioscoStore();
const market = useMarketStore();

try {
await saveGameToApi(kiosco.saldo, kiosco.inventory);
} catch (error) {
console.error("Error al guardar el juego:", error);
} finally {
isLoading.value = false;
}
}

return {
isLoading,
endDayAndSave
};
});
