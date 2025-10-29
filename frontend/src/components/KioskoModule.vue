<template>
  <div>
    <h1>¡Este es el Kiosco!</h1>
    <p>Tu saldo: <strong>${{ kiosco.saldo?.toFixed(2) }}</strong></p>

    <div style="background-color: #ffc; border: 1px solid #e6db55; padding: 10px; margin-top: 15px; margin-bottom: 15px;">
      <strong>⚙️ Verificación del Motor de Mercado:</strong>
      <p>Día actual: {{ market.day }}</p>
      <button 
        @click="market.advanceDay()" 
        style="background-color: #007bff; color: white; padding: 5px 10px; border: none; border-radius: 5px; cursor: pointer;">
        Forzar Avance de Día (Probar Cambio de Precios)
      </button>
    </div>

    <hr>

    <div v-if="kiosco.isLoading">
      <p>Cargando productos...</p>
    </div>

    <div v-else-if="market.products.length > 0">
      <h2>Nuestros Productos (Región: {{ auth.user.region }}):</h2>
      <ul>
        <li v-for="product in market.products" :key="product.id">
          <span>{{ product.name }} - <strong>${{ product.price?.toFixed(2) }}</strong></span>
          <button @click="kiosco.buyProduct(product, 1)">Comprar 1</button>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>No se encontraron productos para esta región.</p>
    </div>

  </div>
</template>

<script setup>
import { useKioscoStore } from '../stores/useKioscoStore';
import { onMounted } from 'vue'; // Se ejecuta 1 vez cuando la página carga
import { useMarketStore } from '../services/useMarketStore'; // 1. AGREGADO: El Economista
import { useAuthStore } from '../stores/useAuthStore';     // 2. AGREGADO: Para la región

const kiosco = useKioscoStore();
const auth = useAuthStore();    
const market = useMarketStore();

// ¡LA CLAVE! Le decimos al store que cargue los productos
// en cuanto la página esté lista.
onMounted(() => {
  // --- ¡AQUÍ ESTÁ EL CAMBIO! ---
  //Pedimos la region real al usuario. Actualmente el usuario es demo
  if (auth.user && auth.user.region) {
    kiosco.loadProducts(auth.user.region);
  } else {
    console.error("KioscoView: No se pudo encontrar la región del usuario.");
  }
});
</script>

<style scoped>
/* Estilos para que se vea ordenado */
h1 {
  color: #42b983; /* Verde Vue */
}
h2 {
  margin-top: 20px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  background-color: #f4f4f4;
  padding: 10px 15px;
  margin-bottom: 8px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
span {
  font-size: 1.1em;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}
button:hover {
  background-color: #369b71;
}
</style>