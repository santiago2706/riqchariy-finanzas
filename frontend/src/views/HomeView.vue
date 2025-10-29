<script setup>
// 1. Importamos AMBOS cerebros aquí, arriba del todo
import { useAuthStore } from '../stores/useAuthStore.js';
import { useKioscoStore } from '../stores/useKioscoStore.js';

// 2. El HomeView (padre) SOLO necesita el authStore
const authStore = useAuthStore();

// 3. DEFINIMOS KioscoModule AQUÍ MISMO (temporalmente)
const KioscoModule = {
  setup() {
    // El Kiosco usa AMBAS importaciones.
    const kiosco = useKioscoStore();
    const auth = useAuthStore();

    // Cargamos los productos usando la región del usuario
    // Añadimos una comprobación por si 'auth.user' aún no está listo
    if (auth.user && auth.user.region) {
      kiosco.loadProducts(auth.user.region);
    } else {
      console.warn("HomeView: No se pudo cargar la región del usuario aún.");
      // Opcional: cargar productos de una región por defecto o mostrar error
    }

    return { kiosco, auth };
  },
  template: `
    <div class="p-6 bg-white rounded-lg shadow-lg">
      <h3 class="text-2xl font-bold text-green-600">Módulo: Mi Kiosco Interactivo</h3>
      <p class="mb-4">¡Bienvenido a tu tienda!</p>
      <div v-if="auth.user" class="text-lg font-medium">Tu Saldo: <span class="text-green-700">S/ {{ kiosco.saldo.toFixed(2) }}</span></div>

      <div v-if="kiosco.isLoading" class="mt-4">Cargando productos...</div>
      <div v-else-if="auth.user" class="mt-4 space-y-2">
        <h4 class="font-bold">Productos para {{ auth.user.region }}:</h4>
        <div v-for="product in kiosco.products" :key="product.id" class="flex items-center justify-between p-2 border rounded">
          <span>
            {{ product.name }} - Costo: S/ {{ product.cost.toFixed(2) }}
          </span>
          <button @click="kiosco.buyProduct(product, 1)" class="px-2 py-1 ml-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-700">Comprar 1</button>
        </div>
      </div>
    </div>
  `
};

// 4. DEFINIMOS ProyectoModule AQUÍ MISMO (temporalmente)
const ProyectoModule = {
  template: `
    <div class="p-6 bg-white rounded-lg shadow-lg">
      <h3 class="text-2xl font-bold text-yellow-600">Módulo: Mi Gran Evento</h3>
      <p class="mb-4">¡Hora de planificar tu presupuesto!</p>
      <p class="text-gray-600">(Aquí iría el simulador de presupuesto que definimos...)</p>
    </div>
  `
};
</script>

<template>
  <div v-if="authStore.user" class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-md">
      <div class="container px-6 py-4 mx-auto">
        <div class="flex items-center justify-between">
          <div class="text-2xl font-bold text-blue-600">Riqch'ariy Finanzas</div>
          <div class="flex items-center">
            <span class="mr-4 text-gray-700">Hola, {{ authStore.user.name }}</span>
            <button
              @click="authStore.logout()"
              class="px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="container p-6 mx-auto">
      <h1 class="mb-6 text-4xl font-bold">Tu Panel Principal</h1>

      <div v-if="authStore.user.level === 'semilla'" class="space-y-4">
        <h2 class="text-3xl font-semibold text-gray-800">🌱 Nivel Semilla</h2>
        <KioscoModule />
      </div>

      <div v-else-if="authStore.user.level === 'brote'" class="space-y-4">
        <h2 class="text-3xl font-semibold text-gray-800">🌿 Nivel Brote</h2>
        <ProyectoModule />
      </div>

      <div v-else-if="authStore.user.level === 'arbol'" class="space-y-4">
        <h2 class="text-3xl font-semibold text-gray-800">🌳 Nivel Árbol</h2>
        <p>Próximamente: ¡Módulos de Inversión!</p>
      </div>

    </main>
  </div>
  <div v-else class="flex items-center justify-center min-h-screen">
    <p class="text-2xl">Cargando datos del usuario...</p>
  </div>
</template>
