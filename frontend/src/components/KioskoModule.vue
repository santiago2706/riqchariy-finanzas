<template>
  <div>
    <h1>¡Este es el Kiosco!</h1>
    <p>Tu saldo: <strong>${{ kiosco?.saldo?.toFixed(2) }}</strong></p>

    <div style="background-color: #ffc; border: 1px solid #e6db55; padding: 10px; margin-top: 15px; margin-bottom: 15px;">
      <strong>⚙️ Verificación del Motor de Mercado:</strong>
      <p>Día actual: {{ market?.day }}</p>
      <button
        @click="market?.advanceDay()"
        style="background-color: #007bff; color: white; padding: 5px 10px; border: none; border-radius: 5px; cursor: pointer;">
        Forzar Avance de Día
      </button>
    </div>

    <div style="margin: 20px 0;">
      <button
        @click="transaction?.endDayAndSave()"
        :disabled="transaction?.isLoading"
        style="background-color: #dc3545; color: white; padding: 10px 15px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; width: 100%;"
      >
        {{ transaction?.isLoading ? 'Guardando...' : 'Terminar Día y Guardar Progreso' }}
      </button>
    </div>
    <hr>
    <div v-if="kiosco?.isLoading">
      <p>Cargando productos...</p>
    </div>

    <div v-else-if="market?.products?.length > 0">
      <h2>Nuestros Productos (Región: {{ auth?.user?.region }}):</h2>
      <ul>
        <li v-for="product in market.products" :key="product.id">
          <span>{{ product.name }} - <strong>${{ product.price?.toFixed(2) }}</strong></span>
          <button @click="kiosco?.buyProduct(product, 1)">Comprar 1</button>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>No se encontraron productos para esta región.</p>
    </div>

  </div>
</template>

<script setup>
// ¡EL ARREGLO DEL BUCLE! Importamos 'shallowRef'
import { onMounted, shallowRef } from 'vue';
import { useKioscoStore } from '../stores/useKioscoStore';
import { useMarketStore } from '../services/useMarketStore'; // El de tu compañero
import { useAuthStore } from '../stores/useAuthStore';
// --- 1. IMPORTA TU NUEVO STORE ---
import { useTransactionStore } from '../stores/useTransactionStore';

// 2. Define contenedores vacíos.
const kiosco = shallowRef(null);
const auth = shallowRef(null);
const market = shallowRef(null);
// --- 3. AÑADE EL CONTENEDOR DE TRANSACCIÓN ---
const transaction = shallowRef(null);

// 4. Llena los contenedores solo cuando el componente esté listo.
// Esto rompe el bucle de importación circular.
onMounted(() => {
  kiosco.value = useKioscoStore();
  auth.value = useAuthStore();
  market.value = useMarketStore();
  transaction.value = useTransactionStore(); // <-- ¡Llena tu store!

  if (auth.value.user && auth.value.user.region) {
    kiosco.value.loadProducts(auth.value.user.region);
  } else {
    console.error("KioscoView: No se pudo encontrar la región del usuario.");
  }
});
</script>
