import './assets/main.css' // (Mantenemos tus estilos)

import { createApp } from 'vue'
import { createPinia } from 'pinia' // Importamos el creador de Pinia

import App from './App.vue'
import router from './router' // Importamos nuestro router

const app = createApp(App)

// --- ESTE ES EL ARREGLO ---
// 1. CREAMOS Y CONECTAMOS PINIA (Los Cerebros)
const pinia = createPinia()
app.use(pinia)


// 2. AHORA SÍ CONECTAMOS EL ROUTER (El Guardia)
// Ahora, cuando el router intente usar el 'useAuthStore',
// ¡Pinia ya estará encendido y listo!
app.use(router)
// -------------------------

app.mount('#app')
