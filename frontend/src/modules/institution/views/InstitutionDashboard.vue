<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from '@/core/components/AppHeader.vue'; 

// Mock Data (Simulating API response)
const institution = ref({
  name: "I.E. Gran Unidad Escolar",
  region: "Cusco",
  plan: "Premium"
});

const metrics = ref([
  { label: 'Mejora en Educación Financiera', value: '+15%', trend: 'positive', description: 'vs Promedio Nacional' },
  { label: 'Alumnos Activos', value: '1,240', trend: 'neutral', description: '95% de asistencia' },
  { label: 'Nivel Promedio', value: 'Nivel 4', trend: 'positive', description: 'Crecimiento sostenido' }
]);

const alerts = ref([
  { id: 1, student: 'Juan Pérez', classroom: '3ro B', issue: 'Fallo crítico en "Tasas de Interés" (3 intentos)', action: 'Ver Detalle' },
  { id: 2, student: 'Maria Quispe', classroom: '4to A', issue: 'Inactividad por 5 días', action: 'Contactar' }
]);

const classrooms = ref([
  { id: 101, name: '3ro B - Secundaria', teacher: 'Prof. Carlos', students: 32, performance: 'Alto' },
  { id: 102, name: '4to A - Secundaria', teacher: 'Prof. Ana', students: 28, performance: 'Medio' },
  { id: 103, name: '5to C - Secundaria', teacher: 'Prof. Luis', students: 30, performance: 'Bajo' }
]);

const teachers = ref([
    { id: 1, name: 'Prof. Carlos', subject: 'Economía', assigned_classrooms: 3 },
    { id: 2, name: 'Prof. Ana', subject: 'Matemáticas', assigned_classrooms: 2 }
]);

const activeTab = ref('dashboard');

const setTab = (tab) => {
  activeTab.value = tab;
};

// Simulation of "Context-Aware" logic
const themeColor = ref('var(--primary-color)'); // Default
onMounted(() => {
    // In a real app, this would fetch from the ContextService
    if(institution.value.region === 'Cusco') {
        // Apply specific theme tweaks or assets
    }
});

</script>

<template>
  <div class="institution-layout">
    <AppHeader /> 
    
    <main class="dashboard-container">
      <!-- Header Section -->
      <header class="dashboard-header">
        <div class="header-content">
          <h1>{{ institution.name }}</h1>
          <span class="badge">{{ institution.plan }}</span>
        </div>
        <div class="header-actions">
           <button class="btn-secondary" @click="setTab('dashboard')" :class="{ active: activeTab === 'dashboard' }">Métricas</button>
           <button class="btn-secondary" @click="setTab('management')" :class="{ active: activeTab === 'management' }">Gestión</button>
        </div>
      </header>
      
      <!-- Dashboard View -->
      <div v-if="activeTab === 'dashboard'" class="dashboard-content">
          <!-- Macro Metrics -->
          <section class="metrics-grid">
            <div v-for="(metric, index) in metrics" :key="index" class="metric-card glass-panel">
              <h3>{{ metric.label }}</h3>
              <div class="metric-value">{{ metric.value }}</div>
              <p class="metric-desc" :class="metric.trend">{{ metric.description }}</p>
            </div>
          </section>

          <!-- Trouble Alerts -->
          <section class="alerts-section glass-panel">
            <h2>🚨 Alerta Temprana</h2>
            <div class="alerts-list">
              <div v-for="alert in alerts" :key="alert.id" class="alert-item">
                <div class="alert-info">
                  <strong>{{ alert.student }}</strong> <span class="classroom-tag">{{ alert.classroom }}</span>
                  <p>{{ alert.issue }}</p>
                </div>
                <button class="btn-action">{{ alert.action }}</button>
              </div>
            </div>
          </section>
      </div>

      <!-- Management View -->
      <div v-if="activeTab === 'management'" class="management-content glass-panel">
        <h2>Gestión Institucional</h2>
        
        <div class="management-grid">
            <div class="panel">
                <h3>Aulas</h3>
                <ul>
                    <li v-for="c in classrooms" :key="c.id" class="list-item">
                        <span>{{ c.name }}</span>
                        <span class="status-indicator" :class="c.performance.toLowerCase()">{{ c.performance }}</span>
                    </li>
                </ul>
                <button class="btn-small">+ Nueva Aula</button>
            </div>
            
            <div class="panel">
                <h3>Docentes</h3>
                <ul>
                    <li v-for="t in teachers" :key="t.id" class="list-item">
                        <span>{{ t.name }}</span>
                        <small>{{ t.assigned_classrooms }} aulas</small>
                    </li>
                </ul>
                <button class="btn-small">+ Nuevo Docente</button>
            </div>
        </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
/* Base Layout & Variables */
.institution-layout {
  min-height: 100vh;
  background: radial-gradient(circle at top right, #1a1a2e, #16213e, #0f3460);
  color: #fff;
  font-family: 'Inter', sans-serif;
}

.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Glassmorphism Utilities */
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

/* Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-content h1 {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #e94560, #ffcb27); /* Riqchariy vibrant colors */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.badge {
  background: #e94560;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

/* Buttons */
.header-actions {
    display: flex;
    gap: 1rem;
}

.btn-secondary {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.7);
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-secondary.active, .btn-secondary:hover {
    background: rgba(255,255,255,0.1);
    color: #fff;
    border-color: #fff;
}

.btn-action {
    background: linear-gradient(90deg, #e94560, #d63447);
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
}

.btn-small {
    width: 100%;
    margin-top: 1rem;
    padding: 0.5rem;
    background: rgba(255,255,255,0.1);
    border: 1px dashed rgba(255,255,255,0.3);
    color: #ccc;
    cursor: pointer;
    border-radius: 8px;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.metric-card {
    transition: transform 0.2s;
}
.metric-card:hover {
    transform: translateY(-5px);
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 1rem 0;
}

.metric-desc {
    font-size: 0.9rem;
}
.metric-desc.positive { color: #4ade80; }
.metric-desc.neutral { color: #aaaaaa; }

/* Alerts */
.alerts-section h2 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
}

.alert-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}

.classroom-tag {
    background: rgba(255,255,255,0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.75rem;
    margin-left: 0.5rem;
}

/* Management Content */
.management-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 1.5rem;
}

.list-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}

.status-indicator {
    font-size: 0.8rem;
    padding: 2px 8px;
    border-radius: 12px;
}

.status-indicator.alto { background: rgba(74, 222, 128, 0.2); color: #4ade80; }
.status-indicator.medio { background: rgba(250, 204, 21, 0.2); color: #facc15; }
.status-indicator.bajo { background: rgba(248, 113, 113, 0.2); color: #f87171; }

</style>
