// src/core/store/useThemeStore.js
import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
    // Estado del tema
    const isDarkMode = ref(false)

    // Cargar configuración guardada
    function initialize() {
        try {
            const saved = localStorage.getItem('userSettings')
            if (saved) {
                const settings = JSON.parse(saved)
                isDarkMode.value = settings.darkMode ?? false
            }
        } catch (e) {
            console.error('Error loading theme:', e)
        }
        applyTheme()
    }

    // Aplicar tema al documento
    function applyTheme() {
        if (isDarkMode.value) {
            document.documentElement.classList.add('dark-mode')
            document.body.classList.add('dark-mode')
        } else {
            document.documentElement.classList.remove('dark-mode')
            document.body.classList.remove('dark-mode')
        }
    }

    // Toggle modo oscuro
    function toggleDarkMode() {
        isDarkMode.value = !isDarkMode.value
        saveSettings()
        applyTheme()
    }

    // Establecer modo oscuro
    function setDarkMode(value) {
        isDarkMode.value = value
        saveSettings()
        applyTheme()
    }

    // Guardar configuración
    function saveSettings() {
        try {
            const saved = localStorage.getItem('userSettings')
            const settings = saved ? JSON.parse(saved) : {}
            settings.darkMode = isDarkMode.value
            localStorage.setItem('userSettings', JSON.stringify(settings))
        } catch (e) {
            console.error('Error saving theme:', e)
        }
    }

    // Observar cambios
    watch(isDarkMode, () => {
        applyTheme()
    })

    return {
        isDarkMode,
        initialize,
        toggleDarkMode,
        setDarkMode,
        applyTheme
    }
})
