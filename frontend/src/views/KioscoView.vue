<template>
  <div>
    <h1>¡Este es el Kiosco!</h1>
    <p>Tu saldo: <strong>${{ kiosco.saldo }}</strong></p>

    <hr>

    <div v-if="kiosco.isLoading">
      <p>Cargando productos...</p>
    </div>

    <div v-else-if="kiosco.products.length > 0">
      <h2>Nuestros Productos (Región: Lima):</h2>
      <ul>
        <li v-for="product in kiosco.products" :key="product.id">
          <span>{{ product.name }} - <strong>${{ product.cost }}</strong></span>
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

const kiosco = useKioscoStore();

// ¡LA CLAVE! Le decimos al store que cargue los productos
// en cuanto la página esté lista.
onMounted(() => {
  // --- ¡AQUÍ ESTÁ EL CAMBIO! ---
  // Pedimos "Lima" porque esa región SÍ existe en tu products.json
  kiosco.loadProducts('Lima');
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
