<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import { useKioscoStore } from '@/modules/market/store/useKioscoStore'

const router = useRouter()
const auth = useAuthStore()
const kiosco = useKioscoStore()

const isDropdownOpen = ref(false)

const userName = computed(() => auth.user?.name || 'Usuario')
const userLevel = computed(() => auth.user?.level || 'Explorador')
const userCoins = computed(() => kiosco.saldo?.toFixed(0) || '0')

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function closeDropdown() {
  isDropdownOpen.value = false
}

function navigateTo(routeName) {
  closeDropdown()
  router.push({ name: routeName })
}

function handleLogout() {
  closeDropdown()
  auth.logout()
}
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <!-- Logo -->
      <div class="logo">
        <div class="logo-icon">🌱</div>
        <span>Riqch'ariy</span>
      </div>

      <!-- User Info -->
      <div class="user-info">
        <!-- Coins Display -->
        <div class="coins-display">
          <span class="coin-icon">🪙</span>
          <span>{{ userCoins }}</span>
        </div>

        <!-- User Profile with Dropdown -->
        <div 
          class="user-profile" 
          :class="{ active: isDropdownOpen }"
          @click="toggleDropdown"
        >
          <div class="user-avatar">🎓</div>
          <span class="user-name">{{ userName }}</span>

          <!-- Dropdown Menu -->
          <div class="dropdown-menu" @click.stop>
            <div class="dropdown-header">
              <div class="dropdown-header-name">{{ userName }}</div>
              <div class="dropdown-header-role">Estudiante - {{ userLevel }}</div>
            </div>

            <a href="#" class="dropdown-item" @click.prevent="navigateTo('perfil')">
              <span class="dropdown-item-icon">👤</span>
              <span class="dropdown-item-text">Mi Perfil</span>
            </a>

            <a href="#" class="dropdown-item" @click.prevent="navigateTo('configuracion')">
              <span class="dropdown-item-icon">⚙️</span>
              <span class="dropdown-item-text">Configuración</span>
            </a>

            <a href="#" class="dropdown-item" @click="closeDropdown">
              <span class="dropdown-item-icon">🏆</span>
              <span class="dropdown-item-text">Mis Logros</span>
            </a>

            <a href="#" class="dropdown-item" @click="closeDropdown">
              <span class="dropdown-item-icon">📊</span>
              <span class="dropdown-item-text">Estadísticas</span>
            </a>

            <a href="#" class="dropdown-item" @click="closeDropdown">
              <span class="dropdown-item-icon">🎨</span>
              <span class="dropdown-item-text">Personalizar</span>
            </a>

            <a href="#" class="dropdown-item" @click="closeDropdown">
              <span class="dropdown-item-icon">❓</span>
              <span class="dropdown-item-text">Ayuda</span>
            </a>

            <a href="#" class="dropdown-item logout" @click="handleLogout">
              <span class="dropdown-item-icon">🚪</span>
              <span class="dropdown-item-text">Cerrar Sesión</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 50%, #4ECDC4 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  animation: headerGlow 3s ease-in-out infinite;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
}

@keyframes headerGlow {
  0%, 100% { box-shadow: 0 5px 20px rgba(255, 107, 107, 0.3); }
  50% { box-shadow: 0 5px 30px rgba(78, 205, 196, 0.5); }
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.5rem;
  font-weight: 900;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.logo-icon {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #FFA500 0%, #FFD700 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  animation: bounce 2s ease-in-out infinite;
  box-shadow: 0 3px 15px rgba(255, 215, 0, 0.5);
}

@keyframes bounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(10deg); }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.coins-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.3);
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.4);
  font-weight: 700;
  font-size: 1.1rem;
}

.coin-icon {
  font-size: 1.5rem;
  animation: spin 3s linear infinite;
}

@keyframes spin {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255,255,255,0.2);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid rgba(255,255,255,0.3);
  position: relative;
}

.user-profile:hover {
  background: rgba(255,255,255,0.3);
}

.user-profile.active {
  background: rgba(255,255,255,0.4);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 15px);
  right: 0;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0,0,0,0.3);
  min-width: 260px;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 9999;
  pointer-events: none;
}

.user-profile.active .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
  pointer-events: all;
}

.dropdown-header {
  padding: 1.2rem;
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%);
  color: white;
  border-bottom: 2px solid rgba(255,255,255,0.2);
}

.dropdown-header-name {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
}

.dropdown-header-role {
  font-size: 0.85rem;
  opacity: 0.9;
}

.dropdown-item {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  background: white;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: linear-gradient(to right, #FFF9F0, #FFE8CC);
  padding-left: 2rem;
}

.dropdown-item-icon {
  font-size: 1.4rem;
  width: 35px;
  text-align: center;
  flex-shrink: 0;
}

.dropdown-item-text {
  font-weight: 600;
  font-size: 0.95rem;
  flex: 1;
}

.dropdown-item.logout {
  color: #FF6B6B;
  font-weight: 700;
}

.dropdown-item.logout:hover {
  background: linear-gradient(to right, #FFE8E8, #FFD0D0);
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #FFD93D 0%, #FF8E53 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: 2px solid white;
}

.user-name {
  font-weight: 600;
}

@media (max-width: 768px) {
  .app-header {
    padding: 0.75rem 1rem;
  }
  
  .logo span {
    display: none;
  }
  
  .user-name {
    display: none;
  }
  
  .coins-display {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
