<script setup>
import { ref, computed } from 'vue';
import BasePanel from '@/components/BasePanel.vue';
// 🚨 Importamos el nuevo componente Modal
import InputModal from '@/components/InputModal.vue';

// --- ESTADO INICIAL DEL SIMULADOR ---
// Lista detallada de costos
const fixedCosts = ref([
    { id: 1, name: 'Permiso Municipal (Local)', amount: 100.00 },
]);
const variableCosts = ref([
    { id: 3, name: 'Compra Inicial de Insumos', amount: 50.00 },
]);

// Variables principales del juego
const targetRevenue = ref(500.00);
const initialBudget = ref(250.00);
const EMERGENCY_FUND = 150.00; // Fondo de emergencia teórico para calcular CO (valor fijo)
const metaAhorro = ref(100);

// --- ESTADO DEL MODAL (NUEVO) ---
const showFixedModal = ref(false);
const showVariableModal = ref(false);

// --- GETTERS (Cálculos Automáticos) ---
const totalFixed = computed(() => fixedCosts.value.reduce((sum, cost) => sum + cost.amount, 0));
const totalVariable = computed(() => variableCosts.value.reduce((sum, cost) => sum + cost.amount, 0));
const totalSpent = computed(() => totalFixed.value + totalVariable.value);
const remainingBudget = computed(() => initialBudget.value - totalSpent.value);
const potentialProfit = computed(() => targetRevenue.value - totalSpent.value); // Ganancia potencial

const estimatedROI = computed(() => {
    if (totalSpent.value <= 0) return 0;
    return (potentialProfit.value / totalSpent.value) * 100;
});

const opportunityCost = computed(() => {
    const overspent = totalSpent.value - initialBudget.value;
    if (overspent > 0) {
        return Math.min(overspent, EMERGENCY_FUND);
    }
    return 0;
});

// --- FUNCIONES DE INTERACCIÓN (ACTUALIZADO PARA MODAL) ---

/**
 * Función que recibe los datos del modal y añade el costo a la lista correspondiente.
 * Reemplaza la antigua función addCost que usaba prompt().
 */
const handleCostSubmit = (type, costData) => {
    // Validamos que el nombre exista y el monto sea un número positivo
    if (costData.name && !isNaN(costData.amount) && costData.amount > 0) {
        // Redondeamos el monto recibido a 2 decimales
        const amount = parseFloat(costData.amount.toFixed(2));
        const newCost = { id: Date.now(), name: costData.name, amount: amount };

        if (type === 'fixed') {
            fixedCosts.value.push(newCost);
            showFixedModal.value = false; // Cerrar modal fijo
        } else {
            variableCosts.value.push(newCost);
            showVariableModal.value = false; // Cerrar modal variable
        }
    }
    // Si los datos son inválidos, el modal generalmente maneja la alerta internamente o no se cierra.
};

const removeCost = (type, id) => {
    if (confirm('¿Estás seguro de eliminar este costo?')) {
        if (type === 'fixed') {
            fixedCosts.value = fixedCosts.value.filter(cost => cost.id !== id);
        } else {
            variableCosts.value = variableCosts.value.filter(cost => cost.id !== id);
        }
    }
};

const setMetaAhorro = () => {
    // Mantuvimos el prompt simple aquí, pero también podría ser un modal.
    const newMeta = parseFloat(prompt('Ingresa tu nueva Meta de Ahorro (ej. 150.00):'));
    if (!isNaN(newMeta) && newMeta >= 0) {
        metaAhorro.value = parseFloat(newMeta.toFixed(2));
    } else {
        alert('Monto ingresado no válido.');
    }
};

</script>

<template>
    <InputModal v-if="showFixedModal"
                :title="'Añadir Costo Fijo'"
                :placeholder-name="'Ej: Alquiler de local'"
                @close="showFixedModal = false"
                @submit="data => handleCostSubmit('fixed', data)"
    />

    <InputModal v-if="showVariableModal"
                :title="'Añadir Costo Variable'"
                :placeholder-name="'Ej: Compra de bebidas extra'"
                @close="showVariableModal = false"
                @submit="data => handleCostSubmit('variable', data)"
    />

    <div class="max-w-7xl mx-auto p-4 sm:p-6">

        <h1 class="text-4xl font-extrabold text-blue-600 mb-2">
            🌻 Nivel Brote: Módulo Presupuesto (Mi Gran Evento)
        </h1>
        <p class="text-xl text-gray-600 mb-8">
            Planifica tu evento. Aprende la diferencia entre **Costos Fijos** y **Costos Variables** para maximizar la Ganancia.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

            <BasePanel border-class="border-t-4 border-orange-500">
                <p class="text-sm text-gray-500">Costo de Oportunidad</p>
                <p class="text-3xl font-bold text-orange-700">S/ {{ opportunityCost.toFixed(2) }}</p>
                <p class="text-sm text-gray-500 mt-2">Valor del fondo de emergencia que perdiste.</p>
            </BasePanel>

            <BasePanel border-class="border-t-4 border-purple-500">
                <p class="text-sm text-gray-500">Retorno de Inversión (ROI)</p>
                <p class="text-3xl font-bold text-purple-700">{{ estimatedROI.toFixed(1) }}%</p>
                <p class="text-sm text-gray-500 mt-2">Ganancia por cada sol gastado.</p>
            </BasePanel>

            <BasePanel border-class="border-t-4 border-indigo-500">
                <p class="text-sm text-gray-500">Presupuesto Inicial</p>
                <p class="text-3xl font-bold text-indigo-700">S/ {{ initialBudget.toFixed(2) }}</p>
                <p class="text-sm text-gray-500 mt-2">Gasto Proyectado: **S/ {{ totalSpent.toFixed(2) }}**</p>
            </BasePanel>

            <BasePanel :border-class="remainingBudget >= 0 ? 'border-t-4 border-green-500' : 'border-t-4 border-red-500'">
                <p class="text-sm text-gray-500">Saldo Restante</p>
                <p class="text-3xl font-bold" :class="remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'">
                    S/ {{ remainingBudget.toFixed(2) }}
                </p>
                <p class="text-sm text-gray-500 mt-2">Ganancia Proyectada: **S/ {{ potentialProfit.toFixed(2) }}**</p>
            </BasePanel>
        </div>


        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <BasePanel border-class="border-t-4 border-red-500">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold text-red-700">Costos Fijos (S/ {{ totalFixed.toFixed(2) }})</h2>
                    <button @click="showFixedModal = true" class="bg-red-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-red-600">
                        + Añadir
                    </button>
                </div>
                <div v-for="cost in fixedCosts" :key="cost.id" class="flex justify-between items-center p-2 border-b last:border-b-0 group">
                    <span>{{ cost.name }}</span>
                    <div class="flex items-center space-x-2">
                         <span class="font-semibold text-red-600">- S/ {{ cost.amount.toFixed(2) }}</span>
                         <button @click="removeCost('fixed', cost.id)" class="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition duration-150">
                             🗑️
                        </button>
                    </div>
                </div>
                <p v-if="fixedCosts.length === 0" class="text-gray-500 mt-2">No hay gastos fijos.</p>
            </BasePanel>

            <BasePanel border-class="border-t-4 border-yellow-500">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold text-yellow-700">Costos Variables (S/ {{ totalVariable.toFixed(2) }})</h2>
                    <button @click="showVariableModal = true" class="bg-yellow-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-yellow-600">
                        + Añadir
                    </button>
                </div>
                <div v-for="cost in variableCosts" :key="cost.id" class="flex justify-between items-center p-2 border-b last:border-b-0 group">
                    <span>{{ cost.name }}</span>
                    <div class="flex items-center space-x-2">
                        <span class="font-semibold text-red-600">- S/ {{ cost.amount.toFixed(2) }}</span>
                         <button @click="removeCost('variable', cost.id)" class="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition duration-150">
                             🗑️
                        </button>
                    </div>
                </div>
                <p v-if="variableCosts.length === 0" class="text-gray-500 mt-2">No hay gastos variables definidos.</p>
            </BasePanel>

            <div class="flex flex-col space-y-6">
                 <BasePanel border-class="border-t-4 border-green-500" class="flex-grow">
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="text-xl font-bold text-green-700">Meta de Ahorro</h3>
                        <button @click="setMetaAhorro" class="bg-green-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-green-600">
                            Establecer
                        </button>
                    </div>
                    <p class="text-3xl font-extrabold text-green-600 mb-3">S/ {{ metaAhorro.toFixed(2) }}</p>
                    <p class="text-sm text-gray-500">Objetivo de dinero reservado para inversión o imprevistos a largo plazo.</p>
                </BasePanel>

                <BasePanel border-class="border-t-4 border-blue-500" class="flex-grow">
                    <p class="text-sm text-gray-500">Ganancia Potencial Total</p>
                    <p class="text-3xl font-extrabold text-blue-600">S/ {{ potentialProfit.toFixed(2) }}</p>
                    <p class="text-sm text-gray-500 mt-2">Ingreso Proyectado: **S/ {{ targetRevenue.toFixed(2) }}**</p>
                </BasePanel>
            </div>

        </div>

    </div>
</template>
