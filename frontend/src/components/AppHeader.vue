<template>
    <header class="bg-gray-800 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

            <div class="flex items-center space-x-6">
                <router-link to="/dashboard" class="text-xl font-bold text-white tracking-widest hover:text-green-400 transition duration-150">
                    RIQCH'ARI FINANZAS
                </router-link>

                <div class="text-yellow-400 font-mono text-lg px-3 py-1 bg-gray-700 rounded">
                    Día: {{ market.day }}
                </div>

                <div v-if="market.marketEvent" class="bg-red-700 text-white text-sm px-3 py-1 rounded-full animate-pulse">
                    ¡ALERTA! {{ market.marketEvent.message }}
                </div>
                </div>

            <nav class="flex space-x-4 items-center">
                <router-link to="/dashboard" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150">
                    Dashboard
                </router-link>
                <router-link to="/kiosco" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150">
                    Kiosco (Jugar)
                </router-link>
                <button @click="auth.logout()" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150">
                    Salir
                </button>
            </nav>
        </div>
    </header>
</template>

<script setup>
// NECESARIO para que la plantilla (template) pueda usar 'auth' y 'market'
import { useAuthStore } from '../stores/useAuthStore';
import { useMarketStore } from '../services/useMarketStore';

const auth = useAuthStore();
const market = useMarketStore();
</script>
