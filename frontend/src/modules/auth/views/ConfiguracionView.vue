<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import { useThemeStore } from '@/core/store/useThemeStore'

const router = useRouter()
const auth = useAuthStore()
const themeStore = useThemeStore()

// Settings state
const notificationsEnabled = ref(true)
const soundEnabled = ref(true)
const language = ref('es')
const difficulty = ref('normal')

// Dark mode vinculado al store global
const darkMode = computed({
  get: () => themeStore.isDarkMode,
  set: (value) => themeStore.setDarkMode(value)
})

// User info
const userName = computed(() => auth.user?.name || 'Usuario')
const userEmail = computed(() => auth.user?.email || auth.user?.gmail || 'Sin email')

// Actions
const goBack = () => router.push({ name: 'dashboard' })

const saveSettings = () => {
  // Guardar configuración en localStorage
  const settings = {
    notifications: notificationsEnabled.value,
    sound: soundEnabled.value,
    darkMode: themeStore.isDarkMode,
    language: language.value,
    difficulty: difficulty.value
  }
  localStorage.setItem('userSettings', JSON.stringify(settings))
  alert('✅ Configuración guardada correctamente')
}

// Load saved settings on mount
const loadSettings = () => {
  try {
    const saved = localStorage.getItem('userSettings')
    if (saved) {
      const settings = JSON.parse(saved)
      notificationsEnabled.value = settings.notifications ?? true
      soundEnabled.value = settings.sound ?? true
      language.value = settings.language ?? 'es'
      difficulty.value = settings.difficulty ?? 'normal'
    }
  } catch (e) {
    console.error('Error loading settings:', e)
  }
}

loadSettings()
</script>

<template>
  <div class="config-container">
    <!-- Back Button -->
    <button class="back-btn" @click="goBack">
      ← Volver al Dashboard
    </button>

    <!-- Header -->
    <div class="config-header">
      <div class="header-content">
        <h1>⚙️ Configuración</h1>
        <p>Personaliza tu experiencia de aprendizaje</p>
      </div>
      <div class="user-badge">
        <span class="user-icon">👤</span>
        <span class="user-name">{{ userName }}</span>
      </div>
    </div>

    <!-- Settings Grid -->
    <div class="settings-grid">
      <!-- Notifications Section -->
      <div class="settings-card">
        <div class="card-header">
          <span class="card-icon">🔔</span>
          <h2>Notificaciones</h2>
        </div>
        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">Notificaciones Push</span>
              <span class="setting-desc">Recibe alertas de actividades y logros</span>
            </div>
            <label class="toggle">
              <input type="checkbox" v-model="notificationsEnabled">
              <span class="slider"></span>
            </label>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">Sonidos</span>
              <span class="setting-desc">Efectos de sonido en el juego</span>
            </div>
            <label class="toggle">
              <input type="checkbox" v-model="soundEnabled">
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Appearance Section -->
      <div class="settings-card">
        <div class="card-header">
          <span class="card-icon">🎨</span>
          <h2>Apariencia</h2>
        </div>
        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">Modo Oscuro</span>
              <span class="setting-desc">Cambia el tema de la aplicación</span>
            </div>
            <label class="toggle">
              <input type="checkbox" v-model="darkMode">
              <span class="slider"></span>
            </label>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">Idioma</span>
              <span class="setting-desc">Selecciona tu idioma preferido</span>
            </div>
            <select v-model="language" class="select-input">
              <option value="es">🇵🇪 Español</option>
              <option value="en">🇺🇸 English</option>
              <option value="qu">🏔️ Quechua</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Game Section -->
      <div class="settings-card">
        <div class="card-header">
          <span class="card-icon">🎮</span>
          <h2>Juego</h2>
        </div>
        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">Dificultad</span>
              <span class="setting-desc">Ajusta el nivel de desafío</span>
            </div>
            <select v-model="difficulty" class="select-input">
              <option value="easy">🌱 Fácil</option>
              <option value="normal">🌿 Normal</option>
              <option value="hard">🌳 Difícil</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Account Section -->
      <div class="settings-card">
        <div class="card-header">
          <span class="card-icon">👤</span>
          <h2>Cuenta</h2>
        </div>
        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">Correo Electrónico</span>
              <span class="setting-desc">{{ userEmail }}</span>
            </div>
          </div>
          <div class="setting-item clickable" @click="router.push({ name: 'perfil' })">
            <div class="setting-info">
              <span class="setting-label">Ver Perfil</span>
              <span class="setting-desc">Consulta tu información y estadísticas</span>
            </div>
            <span class="arrow">→</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="actions-section">
      <button class="save-btn" @click="saveSettings">
        💾 Guardar Cambios
      </button>
    </div>
  </div>
</template>

<style scoped>
.config-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Back Button */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 15px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Header */
.config-header {
  background: white;
  border-radius: 30px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.config-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #667eea, #764ba2, #4ECDC4);
}

.header-content h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.3rem;
  font-weight: 800;
}

.header-content p {
  color: #7f8c8d;
  font-size: 1rem;
}

.user-badge {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  color: white;
  font-weight: 600;
}

.user-icon {
  font-size: 1.5rem;
}

/* Settings Grid */
.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Settings Card */
.settings-card {
  background: white;
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  transition: all 0.3s;
  position: relative;
  overflow: visible;
}

.settings-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #667eea, #764ba2, #4ECDC4, #667eea);
  background-size: 400%;
  border-radius: 25px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s;
  animation: borderGlow 3s ease infinite;
}

.settings-card:hover::before {
  opacity: 1;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
}

.card-icon {
  font-size: 2rem;
}

.card-header h2 {
  font-size: 1.3rem;
  color: #2c3e50;
  font-weight: 800;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 15px;
  transition: all 0.3s;
}

.setting-item.clickable {
  cursor: pointer;
}

.setting-item.clickable:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

.setting-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.setting-label {
  font-weight: 700;
  color: #2c3e50;
}

.setting-desc {
  font-size: 0.85rem;
  color: #7f8c8d;
}

.arrow {
  font-size: 1.2rem;
  color: #667eea;
  font-weight: bold;
}

/* Toggle Switch */
.toggle {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 30px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Select Input */
.select-input {
  padding: 0.6rem 1rem;
  border-radius: 10px;
  border: 2px solid #e9ecef;
  background: white;
  font-size: 0.95rem;
  font-weight: 600;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s;
}

.select-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

/* Actions */
.actions-section {
  display: flex;
  justify-content: center;
}

.save-btn {
  background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 15px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(78, 205, 196, 0.3);
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
}

/* Animations */
@keyframes borderGlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Responsive */
@media (max-width: 768px) {
  .config-container {
    padding: 1rem;
  }
  
  .config-header {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

/* ==================== DARK MODE ==================== */
.dark-mode {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  min-height: 100vh;
  margin: -2rem;
  padding: 2rem;
}

.dark-mode .config-header {
  background: linear-gradient(135deg, #1e1e3f 0%, #252550 100%);
  box-shadow: 0 10px 40px rgba(0,0,0,0.4);
}

.dark-mode .config-header::before {
  background: linear-gradient(90deg, #667eea, #764ba2, #4ECDC4);
}

.dark-mode .header-content h1 {
  color: #ffffff;
}

.dark-mode .header-content p {
  color: #a0aec0;
}

.dark-mode .settings-card {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%);
  box-shadow: 0 10px 40px rgba(0,0,0,0.4);
}

.dark-mode .card-header {
  border-bottom-color: rgba(255,255,255,0.1);
}

.dark-mode .card-header h2 {
  color: #ffffff;
}

.dark-mode .setting-item {
  background: rgba(255,255,255,0.05);
}

.dark-mode .setting-item.clickable:hover {
  background: rgba(255,255,255,0.1);
}

.dark-mode .setting-label {
  color: #ffffff;
}

.dark-mode .setting-desc {
  color: #a0aec0;
}

.dark-mode .select-input {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.2);
  color: #ffffff;
}

.dark-mode .select-input option {
  background: #1e1e3f;
  color: #ffffff;
}

.dark-mode .arrow {
  color: #4ECDC4;
}

.dark-mode .save-btn {
  background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
}

.dark-mode .back-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
