<script setup>
import { computed } from 'vue';

const props = defineProps({
    // Permite pasar una clase para el borde superior (e.g., 'border-red-500')
    borderClass: {
        type: String,
        default: 'border-t-4 border-indigo-500' // Borde superior por defecto
    },
    // Permite añadir padding extra o clases personalizadas
    customClass: {
        type: String,
        default: ''
    }
});

// Clases base combinadas
const baseClasses = computed(() => {
    // Usamos el diseño base que vemos en tu Dashboard: fondo blanco, padding, sombra.
    return `bg-white p-6 rounded-xl shadow-lg ${props.borderClass} ${props.customClass}`;
});
</script>

<template>
    <div :class="baseClasses">
        <slot />
    </div>
</template>
