<script setup>
import {computed} from 'vue'

const props = defineProps({
product: {
type: Object,
required: true
}
})

// 1. Esta lógica de demanda SÍ funciona porque ahora
// recibe "alta" (gracias al Arreglo 1)
const demandInfo = computed(() => {
const demand = props.product.local_demand;
if (demand === 'alta') {
return {text: 'Demanda Alta', icon: '🔺', class: 'text-green-600 font-semibold'}
}
if (demand === 'media') {
return {text: 'Demanda Media', icon: '🟡', class: 'text-yellow-600 font-semibold'}
}
if (demand === 'baja') {
return {text: 'Demanda Baja', icon: '🔻', class: 'text-red-600 font-semibold'}
}
return {text: 'Sin datos', icon: '❓', class: 'text-gray-500'}
})

// 2. Esta lógica de fase SÍ funciona
const stageInfo = computed(() => {
const stage = props.product.offer_stage;
if (stage === 'Brote') {
return {text: '🌱 Fase: Brote', class: 'bg-green-100 text-green-800'}
}
if (stage === 'Desarrollo') {
return {text: '🌻 Fase: Desarrollo', class: 'bg-blue-100 text-blue-800'}
}
return null
})
</script>

<template>
<div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col">
<div class="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
<h3 class="text-xl font-bold text-gray-800">{{product.name}}</h3>
<span v-if="stageInfo" :class="stageInfo.class"
class="text-xs font-semibold px-2.5 py-0.5 rounded-full">
{{stageInfo.text}}
</span>
</div>
<div class="p-4 flex-grow">
<div class="mb-4">
<span :class="demandInfo.class" class="text-sm">
{{demandInfo.icon}} {{demandInfo.text}}
</span>
</div>
<div class="flex justify-around text-center">
<div>
<p class="text-sm text-gray-500">Costo Compra</p>
<p class="text-2xl font-bold text-red-600">${{product.cost.toFixed(2)}}</p>
</div>
<div>
<p class="text-sm text-gray-500">Precio Venta</p>
<p class="text-2xl font-bold text-green-600">${{product.price.toFixed(2)}}</p>
</div>
</div>
</div>
<div class="p-4 bg-gray-50 grid grid-cols-2 gap-3">
<button
@click="$emit('comprar', product)"
class="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-150">
Comprar 1
</button>
<button
@click="$emit('vender', product)"
class="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-150">
Vender 1
</button>
</div>
</div>
</template>
