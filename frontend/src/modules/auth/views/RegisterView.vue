<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../store/useAuthStore.js'

const router = useRouter()
const authStore = useAuthStore()

// Animation state
const isLoaded = ref(false)
const hoveredCard = ref(null)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

// Form state
const step = ref(1)
const selectedRole = ref('')
const nombre = ref('')
const apellido = ref('')
const edad = ref(12)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const humanCheck = ref(false)
const isLoading = ref(false)
const generalError = ref(null)
const validationErrors = ref({})
const region = ref('Lima (Costa)')
const colegioName = ref('')
const hijoEmail = ref('')

const isEstudiante = computed(() => selectedRole.value === 'Estudiante')
const isPadre = computed(() => selectedRole.value === 'Padre')
const isColegio = computed(() => selectedRole.value === 'Colegio')

const getError = (field) => validationErrors.value[field]

const selectRole = (role) => {
  selectedRole.value = role
  setTimeout(() => {
    step.value = 2
  }, 300)
}

const goBack = () => {
  step.value = 1
  generalError.value = null
}

const handleRegister = async () => {
  generalError.value = null
  validationErrors.value = {}

  if (!nombre.value || !email.value || !password.value || !confirmPassword.value) {
    generalError.value = 'Completa todos los campos requeridos.'
    return
  }
  if (password.value !== confirmPassword.value) {
    generalError.value = 'Las contraseñas no coinciden.'
    return
  }
  if (!humanCheck.value) {
    generalError.value = 'Confirma que no eres un robot.'
    return
  }

  isLoading.value = true

  try {
    const roleMap = { 'Estudiante': 'Estudiante', 'Padre': 'Profesor', 'Colegio': 'Colegio' }
    const result = await authStore.register({
      nombre: nombre.value,
      apellido: apellido.value,
      edad: isEstudiante.value ? edad.value : 0,
      gmail: email.value,
      password: password.value,
      role: roleMap[selectedRole.value],
      region: region.value,
    })

    if (result.success) {
      router.push('/login')
    } else {
      generalError.value = result.message || 'Error en el registro.'
    }
  } catch (error) {
    generalError.value = 'Error de conexión.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="register-universe">
    <!-- Animated Background -->
    <div class="bg-animation">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="particles">
        <span v-for="n in 20" :key="n" class="particle" :style="`--i: ${n}`"></span>
      </div>
      <div class="grid-overlay"></div>
    </div>

    <!-- Main Container -->
    <div class="register-wrapper" :class="{ loaded: isLoaded }">
      <!-- Left Panel - Branding -->
      <div class="brand-panel">
        <div class="brand-content">
          <div class="floating-icons">
            <div class="icon-float" style="--delay: 0s; --x: 20%; --y: 20%;">💰</div>
            <div class="icon-float" style="--delay: 0.5s; --x: 80%; --y: 15%;">🎮</div>
            <div class="icon-float" style="--delay: 1s; --x: 15%; --y: 70%;">📊</div>
            <div class="icon-float" style="--delay: 1.5s; --x: 75%; --y: 75%;">🏆</div>
            <div class="icon-float" style="--delay: 2s; --x: 50%; --y: 40%;">⭐</div>
          </div>
          
          <div class="brand-logo">
            <div class="logo-3d">
              <span class="logo-emoji">🌱</span>
              <div class="logo-ring ring-1"></div>
              <div class="logo-ring ring-2"></div>
              <div class="logo-ring ring-3"></div>
            </div>
          </div>
          
          <h1 class="brand-title">
            <span class="title-line">Riqch'ariy</span>
            <span class="title-sub">Finanzas</span>
          </h1>
          
          <p class="brand-tagline">Aprende, juega y domina tus finanzas</p>
          
          <div class="feature-chips">
            <div class="chip"><span>🎯</span> Gamificado</div>
            <div class="chip"><span>📈</span> Progreso Real</div>
            <div class="chip"><span>🏅</span> Logros</div>
          </div>
        </div>
        
        <div class="brand-wave"></div>
      </div>

      <!-- Right Panel - Form -->
      <div class="form-panel">
        <!-- Step 1: Role Selection -->
        <Transition name="morph" mode="out-in">
          <div v-if="step === 1" key="roles" class="step-container">
            <div class="step-header">
              <span class="step-badge">Paso 1 de 2</span>
              <h2>¿Cómo te describes?</h2>
              <p>Personaliza tu experiencia de aprendizaje</p>
            </div>

            <div class="role-showcase">
              <!-- Estudiante Card -->
              <div 
                class="role-card-3d" 
                @click="selectRole('Estudiante')"
                @mouseenter="hoveredCard = 'student'"
                @mouseleave="hoveredCard = null"
                :class="{ hovered: hoveredCard === 'student' }"
              >
                <div class="card-shine"></div>
                <div class="card-inner">
                  <div class="card-avatar student">
                    <span>🎒</span>
                    <div class="avatar-pulse"></div>
                  </div>
                  <div class="card-info">
                    <h3>Estudiante</h3>
                    <p>7 - 17 años</p>
                  </div>
                  <div class="card-action">
                    <div class="action-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="card-bg-pattern student-pattern"></div>
              </div>

              <!-- Padre Card -->
              <div 
                class="role-card-3d" 
                @click="selectRole('Padre')"
                @mouseenter="hoveredCard = 'parent'"
                @mouseleave="hoveredCard = null"
                :class="{ hovered: hoveredCard === 'parent' }"
              >
                <div class="card-shine"></div>
                <div class="card-inner">
                  <div class="card-avatar parent">
                    <span>👨‍👩‍👧</span>
                    <div class="avatar-pulse"></div>
                  </div>
                  <div class="card-info">
                    <h3>Padre / Madre</h3>
                    <p>Supervisar progreso</p>
                  </div>
                  <div class="card-action">
                    <div class="action-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="card-bg-pattern parent-pattern"></div>
              </div>

              <!-- Institución Card -->
              <div 
                class="role-card-3d" 
                @click="selectRole('Colegio')"
                @mouseenter="hoveredCard = 'institution'"
                @mouseleave="hoveredCard = null"
                :class="{ hovered: hoveredCard === 'institution' }"
              >
                <div class="card-shine"></div>
                <div class="card-inner">
                  <div class="card-avatar institution">
                    <span>🏫</span>
                    <div class="avatar-pulse"></div>
                  </div>
                  <div class="card-info">
                    <h3>Institución</h3>
                    <p>Colegios y academias</p>
                  </div>
                  <div class="card-action">
                    <div class="action-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="card-bg-pattern institution-pattern"></div>
              </div>
            </div>

            <div class="step-footer">
              <p>¿Ya tienes cuenta? <RouterLink to="/login">Inicia sesión</RouterLink></p>
            </div>
          </div>
        </Transition>

        <!-- Step 2: Form -->
        <Transition name="morph" mode="out-in">
          <div v-if="step === 2" key="form" class="step-container form-view">
            <button class="back-btn-fancy" @click="goBack">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>Volver</span>
            </button>

            <div class="step-header compact">
              <div class="selected-role-display" :class="selectedRole.toLowerCase()">
                <span v-if="isEstudiante">🎒</span>
                <span v-else-if="isPadre">👨‍👩‍👧</span>
                <span v-else>🏫</span>
              </div>
              <span class="step-badge">Paso 2 de 2</span>
              <h2>Completa tu perfil</h2>
            </div>

            <div v-if="generalError" class="error-banner">
              <span>⚠️</span> {{ generalError }}
            </div>

            <form @submit.prevent="handleRegister" class="dynamic-form">
              <div class="form-grid">
                <div class="field-wrapper">
                  <input v-model="nombre" type="text" required placeholder=" " />
                  <label>👤 Nombre</label>
                  <div class="field-line"></div>
                </div>
                <div class="field-wrapper">
                  <input v-model="apellido" type="text" required placeholder=" " />
                  <label>👤 Apellido</label>
                  <div class="field-line"></div>
                </div>
              </div>

              <div v-if="isEstudiante" class="field-wrapper">
                <input v-model.number="edad" type="number" min="7" max="17" required placeholder=" " />
                <label>🎂 Edad (7-17)</label>
                <div class="field-line"></div>
              </div>

              <div v-if="isEstudiante || isPadre" class="field-wrapper select-wrapper">
                <select v-model="region" required>
                  <option value="Lima (Costa)">🏖️ Lima (Costa)</option>
                  <option value="Cusco (Sierra)">⛰️ Cusco (Sierra)</option>
                  <option value="Iquitos (Selva)">🌳 Iquitos (Selva)</option>
                </select>
                <label>🗺️ Región</label>
                <div class="field-line"></div>
              </div>

              <div v-if="isColegio" class="field-wrapper">
                <input v-model="colegioName" type="text" required placeholder=" " />
                <label>🏫 Nombre del Colegio</label>
                <div class="field-line"></div>
              </div>

              <div class="field-wrapper">
                <input v-model="email" type="email" required placeholder=" " />
                <label>📧 Correo</label>
                <div class="field-line"></div>
              </div>

              <div class="form-grid">
                <div class="field-wrapper">
                  <input v-model="password" type="password" required placeholder=" " />
                  <label>🔒 Contraseña</label>
                  <div class="field-line"></div>
                </div>
                <div class="field-wrapper">
                  <input v-model="confirmPassword" type="password" required placeholder=" " />
                  <label>🔒 Confirmar</label>
                  <div class="field-line"></div>
                </div>
              </div>

              <label class="robot-check">
                <input type="checkbox" v-model="humanCheck" />
                <div class="check-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span>No soy un robot 🤖</span>
              </label>

              <button type="submit" class="submit-btn-mega" :disabled="isLoading">
                <div class="btn-bg"></div>
                <span v-if="isLoading" class="btn-loader"></span>
                <span v-else class="btn-content">
                  <span class="btn-text">Comenzar Aventura</span>
                  <span class="btn-icon">🚀</span>
                </span>
              </button>
            </form>

            <div class="step-footer">
              <p>¿Ya tienes cuenta? <RouterLink to="/login">Inicia sesión</RouterLink></p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Universe Background */
.register-universe {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a1a;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

.bg-animation {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: orbFloat 20s infinite ease-in-out;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  top: -200px;
  left: -200px;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #4ECDC4, #38EF7D);
  bottom: -200px;
  right: -200px;
  animation-delay: -7s;
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #FF6B6B, #feca57);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(50px, -30px) scale(1.1); }
  50% { transform: translate(-30px, 50px) scale(0.9); }
  75% { transform: translate(30px, 30px) scale(1.05); }
}

.particles {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  opacity: 0.3;
  left: calc(var(--i) * 5%);
  top: calc(var(--i) * 4%);
  animation: particleFloat 10s infinite ease-in-out;
  animation-delay: calc(var(--i) * 0.3s);
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
  50% { transform: translateY(-100px) scale(1.5); opacity: 0.8; }
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Main Wrapper */
.register-wrapper {
  display: flex;
  width: 100%;
  max-width: 1100px;
  min-height: 650px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.register-wrapper.loaded {
  opacity: 1;
  transform: translateY(0);
}

/* Brand Panel */
.brand-panel {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.brand-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.floating-icons {
  position: absolute;
  inset: 0;
}

.icon-float {
  position: absolute;
  font-size: 2rem;
  left: var(--x);
  top: var(--y);
  animation: iconBounce 3s infinite ease-in-out;
  animation-delay: var(--delay);
  opacity: 0.6;
}

@keyframes iconBounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

.brand-logo {
  margin-bottom: 2rem;
}

.logo-3d {
  position: relative;
  display: inline-block;
}

.logo-emoji {
  font-size: 5rem;
  display: block;
  animation: logoFloat 3s infinite ease-in-out;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.3));
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

.logo-ring {
  position: absolute;
  border: 2px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  animation: ringPulse 2s infinite ease-out;
}

.ring-1 { inset: -15px; animation-delay: 0s; }
.ring-2 { inset: -30px; animation-delay: 0.3s; }
.ring-3 { inset: -45px; animation-delay: 0.6s; }

@keyframes ringPulse {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.3); opacity: 0; }
}

.brand-title {
  color: white;
  margin-bottom: 1rem;
}

.title-line {
  display: block;
  font-size: 2.5rem;
  font-weight: 900;
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.title-sub {
  display: block;
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.9;
}

.brand-tagline {
  color: rgba(255,255,255,0.85);
  font-size: 1rem;
  margin-bottom: 2rem;
}

.feature-chips {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.chip {
  background: rgba(255,255,255,0.15);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  backdrop-filter: blur(10px);
}

.brand-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath fill='rgba(255,255,255,0.1)' d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.5'%3E%3C/path%3E%3Cpath fill='rgba(255,255,255,0.1)' d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom;
  background-size: cover;
}

/* Form Panel */
.form-panel {
  flex: 1.2;
  padding: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.98);
}

.step-container {
  width: 100%;
  max-width: 400px;
}

/* Transitions */
.morph-enter-active,
.morph-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.morph-enter-from {
  opacity: 0;
  transform: translateX(40px) scale(0.95);
}

.morph-leave-to {
  opacity: 0;
  transform: translateX(-40px) scale(0.95);
}

/* Step Header */
.step-header {
  text-align: center;
  margin-bottom: 2rem;
}

.step-header.compact {
  margin-bottom: 1.5rem;
}

.step-badge {
  display: inline-block;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.step-header h2 {
  font-size: 1.6rem;
  color: #1a1a2e;
  margin-bottom: 0.3rem;
  font-weight: 800;
}

.step-header p {
  color: #666;
  font-size: 0.95rem;
}

/* Role Cards 3D */
.role-showcase {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.role-card-3d {
  position: relative;
  padding: 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  background: white;
  border: 2px solid #f0f0f0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.role-card-3d:hover {
  transform: translateX(8px) translateY(-4px);
  box-shadow: -10px 10px 30px rgba(0,0,0,0.1);
  border-color: transparent;
}

.role-card-3d.hovered {
  border-color: #667eea;
}

.card-shine {
  position: absolute;
  top: -100%;
  left: -100%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%);
  transition: 0.6s;
}

.role-card-3d:hover .card-shine {
  top: 100%;
  left: 100%;
}

.card-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.card-avatar {
  width: 55px;
  height: 55px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  position: relative;
  flex-shrink: 0;
}

.card-avatar.student { background: linear-gradient(135deg, #4ECDC4, #38EF7D); }
.card-avatar.parent { background: linear-gradient(135deg, #ffecd2, #fcb69f); }
.card-avatar.institution { background: linear-gradient(135deg, #667eea, #764ba2); }

.avatar-pulse {
  position: absolute;
  inset: -5px;
  border-radius: 20px;
  border: 2px solid currentColor;
  opacity: 0;
  animation: pulseRing 2s infinite;
}

.card-avatar.student .avatar-pulse { border-color: #4ECDC4; }
.card-avatar.parent .avatar-pulse { border-color: #fcb69f; }
.card-avatar.institution .avatar-pulse { border-color: #667eea; }

@keyframes pulseRing {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.3); opacity: 0; }
}

.card-info h3 {
  font-size: 1.1rem;
  color: #1a1a2e;
  margin: 0;
  font-weight: 700;
}

.card-info p {
  font-size: 0.85rem;
  color: #888;
  margin: 0.2rem 0 0;
}

.card-action {
  margin-left: auto;
}

.action-arrow {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.action-arrow svg {
  width: 18px;
  height: 18px;
  color: #999;
  transition: all 0.3s;
}

.role-card-3d:hover .action-arrow {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.role-card-3d:hover .action-arrow svg {
  color: white;
  transform: translateX(3px);
}

.card-bg-pattern {
  position: absolute;
  right: -20px;
  top: -20px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  opacity: 0.1;
  transition: all 0.4s;
}

.student-pattern { background: #4ECDC4; }
.parent-pattern { background: #fcb69f; }
.institution-pattern { background: #667eea; }

.role-card-3d:hover .card-bg-pattern {
  transform: scale(1.5);
  opacity: 0.15;
}

/* Form View */
.back-btn-fancy {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #667eea;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  transition: all 0.3s;
}

.back-btn-fancy svg {
  width: 18px;
  height: 18px;
  transition: transform 0.3s;
}

.back-btn-fancy:hover svg {
  transform: translateX(-5px);
}

.selected-role-display {
  width: 50px;
  height: 50px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin: 0 auto 0.5rem;
}

.selected-role-display.estudiante { background: linear-gradient(135deg, #4ECDC4, #38EF7D); }
.selected-role-display.padre { background: linear-gradient(135deg, #ffecd2, #fcb69f); }
.selected-role-display.colegio { background: linear-gradient(135deg, #667eea, #764ba2); }

.error-banner {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Dynamic Form */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field-wrapper {
  position: relative;
  margin-bottom: 1.2rem;
}

.field-wrapper input,
.field-wrapper select {
  width: 100%;
  padding: 1rem 0.5rem 0.5rem;
  border: none;
  border-bottom: 2px solid #e0e0e0;
  font-size: 1rem;
  background: transparent;
  transition: all 0.3s;
  outline: none;
}

.field-wrapper label {
  position: absolute;
  left: 0.5rem;
  top: 0.8rem;
  color: #999;
  font-size: 0.95rem;
  transition: all 0.3s;
  pointer-events: none;
}

.field-wrapper input:focus + label,
.field-wrapper input:not(:placeholder-shown) + label,
.field-wrapper select:focus + label,
.select-wrapper label {
  top: -0.2rem;
  font-size: 0.75rem;
  color: #667eea;
}

.field-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s;
}

.field-wrapper input:focus ~ .field-line,
.field-wrapper select:focus ~ .field-line {
  width: 100%;
}

.select-wrapper label {
  top: -0.2rem;
  font-size: 0.75rem;
}

/* Robot Check */
.robot-check {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  margin: 1.5rem 0;
}

.robot-check input { display: none; }

.check-box {
  width: 24px;
  height: 24px;
  border: 2px solid #ddd;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.check-box svg {
  width: 14px;
  height: 14px;
  color: white;
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s;
}

.robot-check input:checked + .check-box {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: #667eea;
}

.robot-check input:checked + .check-box svg {
  opacity: 1;
  transform: scale(1);
}

/* Submit Button Mega */
.submit-btn-mega {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 14px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  color: white;
  background: linear-gradient(135deg, #667eea, #764ba2);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  transition: all 0.4s;
}

.submit-btn-mega:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
}

.submit-btn-mega:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transform: translateX(-100%);
  transition: 0.5s;
}

.submit-btn-mega:hover .btn-bg {
  transform: translateX(100%);
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-icon {
  font-size: 1.3rem;
  animation: rocketShake 0.5s infinite;
}

@keyframes rocketShake {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

.btn-loader {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Footer */
.step-footer {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.step-footer p {
  color: #888;
  font-size: 0.9rem;
}

.step-footer a {
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
}

/* Responsive */
@media (max-width: 900px) {
  .register-wrapper {
    flex-direction: column;
    max-width: 500px;
  }
  
  .brand-panel {
    padding: 2rem;
  }
  
  .logo-emoji {
    font-size: 3rem;
  }
  
  .title-line {
    font-size: 1.8rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
