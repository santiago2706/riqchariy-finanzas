<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import { useToast } from '@/core/composables/useToast'

const router = useRouter()
const auth = useAuthStore()

// User data
const userName = computed(() => auth.user?.name || 'Usuario')
const userEmail = computed(() => auth.user?.email || auth.user?.gmail || 'Sin email')

// Settings state
const notifications = ref({
  lessons: true,
  achievements: true,
  reminders: true,
  updates: false
})

const preferences = ref({
  sound: true,
  animations: true,
  darkMode: false
})

// Dark mode functionality
const applyDarkMode = (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark-mode')
    document.body.classList.add('dark-mode')
  } else {
    document.documentElement.classList.remove('dark-mode')
    document.body.classList.remove('dark-mode')
  }
  localStorage.setItem('darkMode', isDark ? 'true' : 'false')
}

// Watch for dark mode changes - apply immediately
watch(() => preferences.value.darkMode, (newValue) => {
  applyDarkMode(newValue)
  const toast = useToast()
  toast.info(newValue ? 'Modo oscuro activado 🌙' : 'Modo claro activado ☀️')
})

// Load saved preferences on mount
onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode === 'true') {
    preferences.value.darkMode = true
    applyDarkMode(true)
  }
})

// Actions
const goBack = () => router.push({ name: 'dashboard' })
const handleLogout = () => auth.logout()
</script>

<template>
  <div class="settings-container">
    <!-- Back Button -->
    <button class="back-btn" @click="goBack">
      ← Volver al Dashboard
    </button>

    <!-- Settings Header -->
    <div class="settings-header">
      <div class="header-content">
        <div class="header-icon">⚙️</div>
        <div class="header-text">
          <h1>Configuración</h1>
          <p>Personaliza tu experiencia en Riqch'ariy</p>
        </div>
      </div>
    </div>


    <!-- Settings Grid -->
    <div class="settings-grid">
      <!-- Account Settings -->
      <div class="settings-card">
        <h2>👤 Cuenta</h2>
        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">Nombre</span>
              <span class="setting-value">{{ userName }}</span>
            </div>
            <button class="edit-btn" disabled>Editar</button>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">Correo Electrónico</span>
              <span class="setting-value">{{ userEmail }}</span>
            </div>
            <button class="edit-btn" disabled>Editar</button>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">Contraseña</span>
              <span class="setting-value">••••••••</span>
            </div>
            <button class="edit-btn" disabled>Cambiar</button>
          </div>
        </div>
      </div>

      <!-- Notifications Settings -->
      <div class="settings-card">
        <h2>🔔 Notificaciones</h2>
        <div class="settings-list">
          <div class="setting-item toggle">
            <div class="setting-info">
              <span class="setting-label">Nuevas lecciones</span>
              <span class="setting-desc">Recibe alertas cuando haya contenido nuevo</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.lessons">
              <span class="slider"></span>
            </label>
          </div>
          <div class="setting-item toggle">
            <div class="setting-info">
              <span class="setting-label">Logros desbloqueados</span>
              <span class="setting-desc">Celebra tus nuevos logros</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.achievements">
              <span class="slider"></span>
            </label>
          </div>
          <div class="setting-item toggle">
            <div class="setting-info">
              <span class="setting-label">Recordatorios diarios</span>
              <span class="setting-desc">Mantén tu racha activa</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.reminders">
              <span class="slider"></span>
            </label>
          </div>
          <div class="setting-item toggle">
            <div class="setting-info">
              <span class="setting-label">Actualizaciones</span>
              <span class="setting-desc">Novedades y mejoras de la app</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.updates">
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Preferences Settings -->
      <div class="settings-card">
        <h2>🎨 Preferencias</h2>
        <div class="settings-list">
          <div class="setting-item toggle">
            <div class="setting-info">
              <span class="setting-label">Sonidos</span>
              <span class="setting-desc">Efectos de sonido en el juego</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="preferences.sound">
              <span class="slider"></span>
            </label>
          </div>
          <div class="setting-item toggle">
            <div class="setting-info">
              <span class="setting-label">Animaciones</span>
              <span class="setting-desc">Efectos visuales y transiciones</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="preferences.animations">
              <span class="slider"></span>
            </label>
          </div>
          <div class="setting-item toggle">
            <div class="setting-info">
              <span class="setting-label">Modo Oscuro</span>
              <span class="setting-desc">Tema oscuro para la interfaz</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="preferences.darkMode">
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Privacy & Help -->
      <div class="settings-card">
        <h2>🔒 Privacidad y Ayuda</h2>
        <div class="settings-list links">
          <a href="#" class="link-item">
            <span class="link-icon">📄</span>
            <span>Términos y Condiciones</span>
            <span class="arrow">→</span>
          </a>
          <a href="#" class="link-item">
            <span class="link-icon">🔐</span>
            <span>Política de Privacidad</span>
            <span class="arrow">→</span>
          </a>
          <a href="#" class="link-item">
            <span class="link-icon">❓</span>
            <span>Centro de Ayuda</span>
            <span class="arrow">→</span>
          </a>
          <a href="#" class="link-item">
            <span class="link-icon">📧</span>
            <span>Contactar Soporte</span>
            <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="actions-section">
      <button class="logout-btn" @click="handleLogout">
        🚪 Cerrar Sesión
      </button>
    </div>

    <!-- App Info -->
    <div class="app-info">
      <p>Riqch'ariy v1.0.0</p>
      <p>Hecho con ❤️ para la educación financiera</p>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
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

/* Settings Header */
.settings-header {
  background: white;
  border-radius: 30px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}

.settings-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #FF6B6B, #4ECDC4, #FFE66D);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-icon {
  font-size: 4rem;
  animation: spin 4s ease-in-out infinite;
}

@keyframes spin {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  75% { transform: rotate(-15deg); }
}

.header-text h1 {
  font-size: 2.2rem;
  color: #2c3e50;
  font-weight: 800;
  margin-bottom: 0.3rem;
}

.header-text p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

/* Save Message */
.save-message {
  background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Settings Grid */
.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Settings Card */
.settings-card {
  background: white;
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.settings-card h2 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
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
  transition: all 0.2s;
}

.setting-item:hover {
  background: #f0f0f0;
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

.setting-value {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.setting-desc {
  color: #95a5a6;
  font-size: 0.85rem;
}

.edit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s;
}

.edit-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.edit-btn:not(:disabled):hover {
  transform: scale(1.05);
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 30px;
  flex-shrink: 0;
}

.toggle-switch input {
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
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

input:checked + .slider {
  background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Links */
.settings-list.links {
  gap: 0;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.2s;
}

.link-item:hover {
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  padding-left: 1.5rem;
}

.link-icon {
  font-size: 1.3rem;
}

.link-item span:nth-child(2) {
  flex: 1;
  font-weight: 600;
}

.arrow {
  color: #7f8c8d;
  transition: transform 0.2s;
}

.link-item:hover .arrow {
  transform: translateX(5px);
}

/* Actions */
.actions-section {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.save-btn {
  background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
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

.logout-btn {
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 15px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
}

/* App Info */
.app-info {
  text-align: center;
  color: #95a5a6;
  font-size: 0.9rem;
}

.app-info p:first-child {
  font-weight: 600;
  margin-bottom: 0.3rem;
}

/* Responsive */
@media (max-width: 768px) {
  .settings-container {
    padding: 1rem;
  }
  
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .actions-section {
    flex-direction: column;
  }
  
  .save-btn, .logout-btn {
    width: 100%;
  }
}
</style>
