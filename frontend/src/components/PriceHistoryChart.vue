<script setup>
// Importa el componente de gráfico de líneas de vue-chartjs
import { Line } from 'vue-chartjs'
// Importa y registra los elementos necesarios de Chart.js
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { computed } from 'vue'

// 1. Registra los elementos (¡es obligatorio para que funcione Chart.js!)
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

// 2. Define las propiedades (props) que recibirá el componente
const props = defineProps({
  prices: {
    type: Array,
    required: true,
    default: () => []
  },
  label: { // Usado para el título del gráfico
    type: String,
    required: true
  }
})

// 3. Configura las opciones básicas del gráfico (incluyendo la animación)
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  // ⚡️ ACTIVA LA ANIMACIÓN para los cambios de datos
  animation: {
    duration: 500 
  },
  scales: {
    x: {
      display: true, // Oculta las etiquetas del eje X (no necesarias para el historial)
    },
    y: {
        // Asegura que el eje Y se ajuste automáticamente a los precios
        beginAtZero: false, 
    }
  },
  plugins: {
    legend: {
      display: false 
    },
    title: {
      display: true,
      text: `Historial de Precios de ${props.label}`,
      font: {
          size: 14
      }
    }
  }
}

// 4. Prepara los datos reactivos del gráfico a partir de las props
const chartData = computed(() => {
  return {
    // Las etiquetas X solo necesitan ser índices: Punto 1, Punto 2, etc.
    labels: props.prices.map((_, index) => `Punto ${index + 1}`), 
    datasets: [
      {
        label: props.label,
        data: props.prices,
        borderColor: '#4CAF50', 
        backgroundColor: 'rgba(76, 175, 80, 0.2)', // Relleno suave
        tension: 0.4, // Suaviza la línea
        pointRadius: 4, // Puntos visibles
        fill: true // Rellena el área bajo la línea
      }
    ]
  }
})
</script>

<template>
  <div class="chart-container" style="height: 200px; width: 100%; margin-top: 10px;">
    <Line
      :data="chartData"
      :options="chartOptions"
      
      :key="props.prices.length"
    />
  </div>
</template>s