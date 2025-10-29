<<<<<<< HEAD
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
=======
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
>>>>>>> 0377930 (feat: Versión inicial con vista de kiosco funcional)

app.mount('#app')
