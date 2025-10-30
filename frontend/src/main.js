// Archivo: src/main.js

import './assets/main.css' // Mantenemos tu import de estilos (CRÍTICO para Tailwind)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// --- CONFIGURACIÓN DE INICIO (El orden correcto es VITAL) ---
// 1. Inicializar Pinia (Los Cerebros)
const pinia = createPinia()
app.use(pinia)

// 2. Ahora sí, conectar el Router (El Guardia)
// El router necesita que Pinia esté listo para poder usar useAuthStore.
app.use(router)
// -------------------------------------------------------------

app.mount('#app')
