<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'submit']);

// Estado local para los campos del formulario
const costName = ref('');
const costAmount = ref(null);
const errorMessage = ref('');

const handleSubmit = () => {
    errorMessage.value = '';

    // 1. Validación
    if (!costName.value || costAmount.value === null || costAmount.value <= 0) {
        errorMessage.value = 'Por favor, ingresa un nombre y un monto válido (> 0).';
        return;
    }

    // 2. Emitir los datos al componente padre
    emit('submit', { name: costName.value, amount: parseFloat(costAmount.value) });

    // 3. Limpiar y cerrar
    costName.value = '';
    costAmount.value = null;
};

const close = () => {
    // Limpieza al cancelar o cerrar
    costName.value = '';
    costAmount.value = null;
    errorMessage.value = '';
    emit('close');
};
</script>

<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">

        <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">

            <h2 class="text-2xl font-bold text-gray-800 mb-4">Añadir Gasto</h2>
            <p class="text-gray-600 mb-6">Ingresa los detalles del costo.</p>

            <form @submit.prevent="handleSubmit" class="space-y-4">

                <div>
                    <label for="cost-name" class="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        id="cost-name"
                        v-model="costName"
                        type="text"
                        required
                        placeholder="Ej: Snacks para vender"
                        class="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label for="cost-amount" class="block text-sm font-medium text-gray-700">Monto (S/)</label>
                    <input
                        id="cost-amount"
                        v-model.number="costAmount"
                        type="number"
                        step="0.01"
                        min="0.01"
                        required
                        placeholder="0.00"
                        class="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <p v-if="errorMessage" class="text-red-600 text-sm font-semibold">{{ errorMessage }}</p>

                <div class="flex justify-end space-x-3 pt-2">
                    <button type="button" @click="close" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                        Cancelar
                    </button>
                    <button type="submit" class="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition">
                        Aceptar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
