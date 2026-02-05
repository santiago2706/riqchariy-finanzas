<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import { useKioscoStore } from '@/modules/market/store/useKioscoStore'

const router = useRouter()
const auth = useAuthStore()
const kiosco = useKioscoStore()

// User data
const userName = computed(() => auth.user?.name || 'Usuario')
const userEmail = computed(() => auth.user?.email || auth.user?.gmail || 'Sin email')
const userLevel = computed(() => auth.user?.level || 'Sin nivel')
const userRole = computed(() => auth.user?.role || 'Estudiante')
const userRegion = computed(() => auth.user?.region || 'Perú')
const userCoins = computed(() => kiosco.saldo || 0)

// Stats
const streakDays = computed(() => 1)
const achievementsCount = computed(() => 4)
const lessonsCompleted = computed(() => 12)

// Level info
const levelEmoji = computed(() => {
  const level = userLevel.value?.toLowerCase()
  if (level === 'brote') return '🌱'
  if (level === 'semilla') return '🌻'
  if (level === 'cosecha') return '🌾'
  return '🌿'
})

const levelAge = computed(() => {
  const level = userLevel.value?.toLowerCase()
  if (level === 'brote') return '10-13 años'
  if (level === 'semilla') return '7-9 años'
  return ''
})

// Actions
const goBack = () => router.push({ name: 'dashboard' })
const handleLogout = () => auth.logout()
</script>

<template>
  <div class="profile-container">
    <!-- Back Button -->
    <button class="back-btn" @click="goBack">
      ← Volver al Dashboard
    </button>

    <!-- Profile Header -->
    <div class="profile-header">
      <div class="avatar-section">
        <div class="avatar">
          <span class="avatar-emoji">👤</span>
        </div>
        <div class="user-info">
          <h1>{{ userName }}</h1>
          <p class="user-email">{{ userEmail }}</p>
          <div class="badges">
            <span class="badge role">{{ userRole }}</span>
            <span class="badge level">{{ levelEmoji }} {{ userLevel }}</span>
          </div>
        </div>
      </div>
      <div class="coins-display">
        <span class="coin-icon">🪙</span>
        <span class="coin-amount">{{ userCoins }}</span>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">🪙</div>
        <div class="stat-label">Monedas Totales</div>
        <div class="stat-value">{{ userCoins }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🔥</div>
        <div class="stat-label">Racha Activa</div>
        <div class="stat-value">{{ streakDays }} días</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🏆</div>
        <div class="stat-label">Logros</div>
        <div class="stat-value">{{ achievementsCount }}/15</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-label">Lecciones</div>
        <div class="stat-value">{{ lessonsCompleted }}/40</div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="content-grid">
      <!-- Account Info Card -->
      <div class="info-card">
        <h2>📋 Información de Cuenta</h2>
        <div class="info-list">
          <div class="info-item">
            <span class="info-label">Correo Electrónico</span>
            <span class="info-value">{{ userEmail }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Región</span>
            <span class="info-value">🦙 {{ userRegion }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Nivel Actual</span>
            <span class="info-value">{{ levelEmoji }} {{ userLevel }} <span class="age-range" v-if="levelAge">({{ levelAge }})</span></span>
          </div>
          <div class="info-item">
            <span class="info-label">Rol</span>
            <span class="info-value">{{ userRole }}</span>
          </div>
        </div>
      </div>

      <!-- Progress Card -->
      <div class="progress-card">
        <h2>📈 Tu Progreso</h2>
        <div class="progress-section">
          <div class="progress-header">
            <span>Nivel {{ userLevel }}</span>
            <span>30%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 30%"></div>
          </div>
          <p class="progress-hint">Completa 28 lecciones más para alcanzar el siguiente nivel</p>
        </div>
        
        <div class="achievements-preview">
          <h3>🏅 Logros Recientes</h3>
          <div class="achievement-list">
            <div class="achievement-item">🌟 Primera Lección</div>
            <div class="achievement-item">🔥 Racha de 7 días</div>
            <div class="achievement-item">💰 1000 Monedas</div>
            <div class="achievement-item">📚 10 Lecciones</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="actions-section">
      <button class="logout-btn" @click="handleLogout">
        🚪 Cerrar Sesión
      </button>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
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

/* Profile Header */
.profile-header {
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

.profile-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #FF6B6B, #4ECDC4, #FFE66D);
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  animation: float 3s ease-in-out infinite;
}

.avatar-emoji {
  font-size: 3rem;
}

.user-info h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.3rem;
  font-weight: 800;
}

.user-email {
  color: #7f8c8d;
  margin-bottom: 0.8rem;
}

.badges {
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.badge.role {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.badge.level {
  background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
  color: white;
}

.coins-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
  padding: 1rem 1.5rem;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(255, 165, 0, 0.3);
}

.coin-icon {
  font-size: 1.8rem;
}

.coin-amount {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 25px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  text-align: center;
  transition: all 0.3s;
  position: relative;
  overflow: visible;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4, #FFE66D, #FF6B6B);
  background-size: 400%;
  border-radius: 25px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s;
  animation: borderGlow 3s ease infinite;
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2c3e50;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Info Card */
.info-card {
  background: white;
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.info-card h2 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.info-label {
  color: #7f8c8d;
  font-weight: 600;
}

.info-value {
  color: #2c3e50;
  font-weight: 700;
}

.age-range {
  color: #7f8c8d;
  font-weight: normal;
}

/* Progress Card */
.progress-card {
  background: white;
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.progress-card h2 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.progress-section {
  margin-bottom: 2rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.progress-bar {
  height: 12px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4ECDC4 0%, #38EF7D 100%);
  border-radius: 10px;
  transition: width 0.5s;
}

.progress-hint {
  color: #7f8c8d;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.achievements-preview h3 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.achievement-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}

.achievement-item {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 0.8rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c3e50;
}

/* Actions */
.actions-section {
  display: flex;
  justify-content: center;
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

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes borderGlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Responsive */
@media (max-width: 768px) {
  .profile-container {
    padding: 1rem;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .avatar-section {
    flex-direction: column;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .achievement-list {
    grid-template-columns: 1fr;
  }
}
</style>
