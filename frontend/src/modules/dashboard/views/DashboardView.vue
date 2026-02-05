<template>
  <div class="dashboard-container">
    <!-- Welcome Section -->
    <div class="welcome-section">
      <h1>¡Hola, {{ userName }}! 👋</h1>
      <p>¡Sigues avanzando increíble! Hoy tienes {{ todayActivities }} actividades nuevas disponibles.</p>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-label">Nivel Actual</div>
        <div class="stat-value">{{ userLevel }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⭐</div>
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
      <!-- Current Level Card -->
      <div class="level-card">
        <div class="level-header">
          <div class="level-badge">{{ levelEmoji }}</div>
          <div class="level-info">
            <h2>{{ levelTitle }}</h2>
            <p>{{ levelStage }} • {{ levelAgeRange }}</p>
          </div>
        </div>

        <div class="progress-section">
          <div class="progress-header">
            <span class="progress-label">Progreso del Nivel</span>
            <span class="progress-percentage">{{ progressPercent }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
        </div>

        <div class="next-level-info">
          <h3>🎉 ¡Siguiente Nivel: {{ nextLevel }}!</h3>
          <p>Completa {{ lessonsRemaining }} lecciones más para desbloquear simuladores avanzados y nuevos juegos</p>
        </div>
      </div>

      <!-- Today's Activities -->
      <div class="activities-card">
        <h3>📅 Actividades de Hoy</h3>

        <div 
          class="activity-item" 
          v-for="activity in activities" 
          :key="activity.id"
          @click="navigateToGame(activity.route)"
        >
          <div class="activity-icon">{{ activity.icon }}</div>
          <div class="activity-info">
            <div class="activity-title">{{ activity.title }}</div>
            <div class="activity-reward">+{{ activity.reward }} monedas</div>
          </div>
          <div class="activity-arrow">→</div>
        </div>
      </div>
    </div>

    <!-- Módulos de Aprendizaje Section -->
    <div class="games-section">
      <div class="section-header">
        <h2>🎓 Módulos de Aprendizaje</h2>
      </div>

      <div class="games-grid">
        <div class="game-card" v-for="game in games" :key="game.id" @click="navigateToGame(game.route)">
          <div class="game-icon" :style="{ background: game.gradient }">{{ game.icon }}</div>
          <div class="game-title">{{ game.title }}</div>
          <div class="game-description">{{ game.description }}</div>
          <div class="game-reward">
            <span>🪙</span>
            <span>+{{ game.reward }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Achievements Section -->
    <div class="achievements-section">
      <div class="achievements-header">
        <div class="section-header">
          <h2>🏆 Mis Logros</h2>
        </div>
      </div>

      <div class="achievements-grid">
        <div 
          class="achievement-badge" 
          :class="{ locked: !achievement.unlocked }"
          v-for="achievement in achievements" 
          :key="achievement.id"
        >
          <div class="achievement-icon">{{ achievement.icon }}</div>
          <div class="achievement-name">{{ achievement.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import { useKioscoStore } from '@/modules/market/store/useKioscoStore'

const router = useRouter()
const auth = useAuthStore()
const kiosco = useKioscoStore()

// User data
const userName = computed(() => auth.user?.name?.split(' ')[0] || 'Estudiante')
const userLevel = computed(() => auth.user?.level || 'Semilla')

// Stats (mock data - replace with real data later)
const streakDays = computed(() => kiosco.currentDay || 1)
const achievementsCount = computed(() => 4)
const lessonsCompleted = computed(() => 12)
const todayActivities = computed(() => 3)

// Level info - Enfocado en Etapa Brote
const levelEmoji = computed(() => '🌻')
const levelTitle = computed(() => 'El Emprendedor')
const levelStage = computed(() => 'Etapa Brote')
const levelAgeRange = computed(() => '10-13 años')

const progressPercent = computed(() => Math.round((lessonsCompleted.value / 40) * 100))

const nextLevel = computed(() => 'El Estratega')

const lessonsRemaining = computed(() => 40 - lessonsCompleted.value)

// Activities - Adaptadas para Brote
const activities = [
  { id: 1, icon: '📚', title: 'Revisar Lecciones', reward: 50, route: 'lecciones' },
  { id: 2, icon: '🏪', title: 'Practicar en Tiendita', reward: 30, route: 'kiosco' },
  { id: 3, icon: '💰', title: 'Planificar Presupuesto', reward: 100, route: 'presupuesto-brote' }
]

// Módulos principales de Etapa Brote
const games = [
  { 
    id: 1, 
    icon: '📚', 
    title: 'Catálogo de Lecciones', 
    description: 'Aprende la teoría sobre finanzas, ganancia, pérdida y más',
    reward: 50,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    route: 'lecciones'
  },
  { 
    id: 2, 
    icon: '🏪', 
    title: 'La Tiendita Virtual', 
    description: 'Simula tu propio kiosco: compra, vende y gestiona tu inventario',
    reward: 75,
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%)',
    route: 'kiosco'
  },
  { 
    id: 3, 
    icon: '💰', 
    title: 'Módulo Presupuesto', 
    description: 'Planifica tu evento con costos fijos, variables y metas de ahorro',
    reward: 100,
    gradient: 'linear-gradient(135deg, #FFD93D 0%, #FFA500 100%)',
    route: 'presupuesto-brote'
  }
]

// Achievements
const achievements = [
  { id: 1, icon: '🌟', name: 'Primera Lección', unlocked: true },
  { id: 2, icon: '🔥', name: 'Racha de 7 días', unlocked: true },
  { id: 3, icon: '💰', name: '1000 Monedas', unlocked: true },
  { id: 4, icon: '📚', name: '10 Lecciones', unlocked: true },
  { id: 5, icon: '🎯', name: 'Nivel 5', unlocked: false },
  { id: 6, icon: '⚡', name: '30 días seguidos', unlocked: false }
]

function navigateToGame(routeName) {
  router.push({ name: routeName })
}
</script>

<style scoped>
.dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Welcome Section */
.welcome-section {
  background: white;
  border-radius: 30px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}

.welcome-section::before {
  content: '⭐✨🎯🚀';
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  opacity: 0.2;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(-50%); }
  50% { transform: translateY(-60%); }
}

.welcome-section h1 {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  font-weight: 900;
}

.welcome-section p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
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

@keyframes borderGlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.stat-icon {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

.stat-card:nth-child(1) .stat-icon {
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
  box-shadow: 0 5px 20px rgba(255, 107, 107, 0.3);
}

.stat-card:nth-child(2) .stat-icon {
  background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
  box-shadow: 0 5px 20px rgba(78, 205, 196, 0.3);
  animation-delay: 0.5s;
}

.stat-card:nth-child(3) .stat-icon {
  background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
  box-shadow: 0 5px 20px rgba(255, 165, 0, 0.3);
  animation-delay: 1s;
}

.stat-card:nth-child(4) .stat-icon {
  background: linear-gradient(135deg, #A8E6CF 0%, #38EF7D 100%);
  box-shadow: 0 5px 20px rgba(168, 230, 207, 0.3);
  animation-delay: 1.5s;
}

.stat-label {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  font-weight: 600;
}

.stat-value {
  font-size: 2rem;
  font-weight: 900;
  color: #2c3e50;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

/* Current Level Card */
.level-card {
  background: white;
  border-radius: 30px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.level-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.level-badge {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  box-shadow: 0 5px 20px rgba(255, 107, 107, 0.4);
  animation: numberPulse 2s ease-in-out infinite;
}

@keyframes numberPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.level-info h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.3rem;
  font-weight: 800;
}

.level-info p {
  color: #7f8c8d;
  font-size: 1rem;
}

.progress-section {
  margin-bottom: 2rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.progress-label {
  font-weight: 600;
  color: #2c3e50;
}

.progress-percentage {
  font-weight: 900;
  font-size: 1.3rem;
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.progress-bar {
  height: 12px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.1);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%);
  border-radius: 10px;
  transition: width 1s ease-out;
  animation: progressShine 2s ease-in-out infinite;
}

@keyframes progressShine {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.next-level-info {
  background: linear-gradient(to right, #FFE8E8, #E0F7F5);
  padding: 1.5rem;
  border-radius: 15px;
  margin-top: 1.5rem;
}

.next-level-info h3 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.next-level-info p {
  color: #7f8c8d;
  font-size: 0.95rem;
}

/* Activities Card */
.activities-card {
  background: white;
  border-radius: 30px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.activities-card h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(to right, #FFF9F0, #FFE8CC);
  border-radius: 15px;
  margin-bottom: 1rem;
  transition: all 0.3s;
  cursor: pointer;
}

.activity-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.activity-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.activity-info {
  flex: 1;
}

.activity-title {
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.2rem;
}

.activity-reward {
  color: #7f8c8d;
  font-size: 0.85rem;
}

.activity-arrow {
  font-size: 1.5rem;
  color: #FFD93D;
}

/* Games Section */
.games-section {
  background: white;
  border-radius: 30px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 2rem;
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.game-card {
  background: linear-gradient(to bottom right, white, #FFF9F0);
  border-radius: 20px;
  padding: 2rem;
  border: 3px solid #FFE8CC;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.game-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4, #FFE66D, #FF6B6B);
  background-size: 400%;
  border-radius: 20px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s;
  animation: borderGlow 3s ease infinite;
}

.game-card:hover::before {
  opacity: 1;
}

.game-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
  border-color: transparent;
}

.game-icon {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 20px rgba(78, 205, 196, 0.3);
  animation: float 3s ease-in-out infinite;
}

.game-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.game-description {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.game-reward {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
}

/* Achievements Section */
.achievements-section {
  background: white;
  border-radius: 30px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.achievements-header {
  margin-bottom: 2rem;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 2rem;
}

.achievement-badge {
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
  padding-top: 1rem;
}

.achievement-badge:hover {
  transform: translateY(-5px);
}

.achievement-icon {
  width: 90px;
  height: 90px;
  background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  margin: 0 auto 1rem;
  box-shadow: 0 8px 25px rgba(255, 165, 0, 0.4);
  animation: float 3s ease-in-out infinite;
}

.achievement-badge:nth-child(2) .achievement-icon {
  background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
  box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
  animation-delay: 0.3s;
}

.achievement-badge:nth-child(3) .achievement-icon {
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  animation-delay: 0.6s;
}

.achievement-badge:nth-child(4) .achievement-icon {
  background: linear-gradient(135deg, #A8E6CF 0%, #38EF7D 100%);
  box-shadow: 0 8px 25px rgba(168, 230, 207, 0.4);
  animation-delay: 0.9s;
}

.achievement-badge.locked .achievement-icon {
  background: #e9ecef;
  opacity: 0.5;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.achievement-name {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.achievement-badge.locked .achievement-name {
  color: #bbb;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .games-grid {
    grid-template-columns: 1fr;
  }

  .achievements-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
  
  .welcome-section h1 {
    font-size: 1.8rem;
  }
  
  .welcome-section::before {
    display: none;
  }
}
</style>

<!-- Non-scoped dark mode styles to override scoped CSS -->
<style>
html.dark-mode .dashboard-container .welcome-section,
html.dark-mode .dashboard-container .stat-card,
html.dark-mode .dashboard-container .level-card,
html.dark-mode .dashboard-container .activities-card,
html.dark-mode .dashboard-container .games-section,
html.dark-mode .dashboard-container .achievements-section {
  background: #1e293b !important;
}

html.dark-mode .dashboard-container .game-card {
  background: linear-gradient(to bottom right, #1e293b, #334155) !important;
  border-color: #475569 !important;
}

html.dark-mode .dashboard-container .next-level-info {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(8, 145, 178, 0.2)) !important;
}

html.dark-mode .dashboard-container .activity-item {
  background: linear-gradient(to right, #334155, #475569) !important;
}

html.dark-mode .dashboard-container .achievement-badge {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
}

html.dark-mode .dashboard-container .achievement-badge.locked .achievement-icon {
  background: #334155 !important;
}

html.dark-mode .dashboard-container .stat-label,
html.dark-mode .dashboard-container .level-info p,
html.dark-mode .dashboard-container .game-description,
html.dark-mode .dashboard-container .activity-reward,
html.dark-mode .dashboard-container .next-level-info p {
  color: #94a3b8 !important;
}

html.dark-mode .dashboard-container .stat-value,
html.dark-mode .dashboard-container .level-info h2,
html.dark-mode .dashboard-container .activities-card h3,
html.dark-mode .dashboard-container .game-title,
html.dark-mode .dashboard-container .activity-title,
html.dark-mode .dashboard-container .achievement-name,
html.dark-mode .dashboard-container .progress-label,
html.dark-mode .dashboard-container .next-level-info h3 {
  color: #f1f5f9 !important;
  -webkit-text-fill-color: #f1f5f9 !important;
}

html.dark-mode .dashboard-container .achievement-badge.locked .achievement-name {
  color: #64748b !important;
}

html.dark-mode .dashboard-container .progress-bar {
  background: #334155 !important;
}
</style>

