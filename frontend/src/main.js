import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia' // Importamos createPinia y setActivePinia
import App from './App.vue'
import router from './router'

import './assets/main.css' // 1. Carga el diccionario de estilos

// 1. Crear la instancia de Vue
const app = createApp(App)

// 2. Crear la instancia de Pinia (los cerebros)
const pinia = createPinia()
app.use(pinia)

// 3. Forzar la activación de Pinia
// Esto es CRUCIAL para que los guards del router puedan llamar a useAuthStore() inmediatamente.
setActivePinia(pinia)

// 4. Conectar el Router (el guardia)
app.use(router)

// 5. Montar la aplicación
app.mount('#app')
