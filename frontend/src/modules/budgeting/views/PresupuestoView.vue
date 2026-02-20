<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import InputModal from '@/core/components/InputModal.vue';
import { useToast } from '@/core/composables/useToast';

const router = useRouter();

// --- ESTADO INICIAL DEL SIMULADOR ---
// Lista detallada de costos
const fixedCosts = ref([
    { id: 1, name: 'Permiso Municipal (Local)', amount: 100.00 },
]);
const variableCosts = ref([
    { id: 3, name: 'Compra Inicial de Insumos', amount: 50.00 },
]);

// Variables principales del juego
const targetRevenue = ref(500.00);
const initialBudget = ref(250.00);
const EMERGENCY_FUND = 150.00; // Fondo de emergencia teórico
const metaAhorro = ref(100);

// --- ESTADO DEL MODAL ---
const showFixedModal = ref(false);
const showVariableModal = ref(false);

// --- GETTERS (Cálculos Automáticos) ---
const totalFixed = computed(() => fixedCosts.value.reduce((sum, cost) => sum + cost.amount, 0));
const totalVariable = computed(() => variableCosts.value.reduce((sum, cost) => sum + cost.amount, 0));
const totalSpent = computed(() => totalFixed.value + totalVariable.value);
const remainingBudget = computed(() => initialBudget.value - totalSpent.value);
const potentialProfit = computed(() => targetRevenue.value - totalSpent.value); // Ganancia potencial

const estimatedROI = computed(() => {
    if (totalSpent.value <= 0) return 0;
    return (potentialProfit.value / totalSpent.value) * 100;
});

const opportunityCost = computed(() => {
    const overspent = totalSpent.value - initialBudget.value;
    if (overspent > 0) {
        return Math.min(overspent, EMERGENCY_FUND);
    }
    return 0;
});

// Mensaje educativo dinámico
const educationalMessage = computed(() => {
    if (remainingBudget.value < 0) return "¡Cuidado! Estás gastando más de lo que tienes. Revisa tus costos fijos.";
    if (potentialProfit.value > 200) return "¡Excelente planificación! Tu ganancia proyectada es muy buena.";
    return "Recuerda: Los Costos Fijos se pagan sí o sí. ¡Los Variables dependen de cuánto vendas!";
});

// --- FUNCIONES DE INTERACCIÓN ---
const handleCostSubmit = (type, costData) => {
    const toast = useToast();
    if (costData.name && !isNaN(costData.amount) && costData.amount > 0) {
        const amount = parseFloat(costData.amount.toFixed(2));
        const newCost = { id: Date.now(), name: costData.name, amount: amount };

        if (type === 'fixed') {
            fixedCosts.value.push(newCost);
            showFixedModal.value = false;
            toast.success(`Costo fijo "${costData.name}" añadido ✅`);
        } else {
            variableCosts.value.push(newCost);
            showVariableModal.value = false;
            toast.success(`Costo variable "${costData.name}" añadido ✅`);
        }
    }
};

const removeCost = (type, id) => {
    const toast = useToast();
    if (confirm('¿Estás seguro de eliminar este costo?')) {
        if (type === 'fixed') {
            fixedCosts.value = fixedCosts.value.filter(cost => cost.id !== id);
        } else {
            variableCosts.value = variableCosts.value.filter(cost => cost.id !== id);
        }
        toast.info('Costo eliminado 🗑️');
    }
};

const setMetaAhorro = () => {
    const toast = useToast();
    const newMeta = parseFloat(prompt('Ingresa tu nueva Meta de Ahorro (ej. 150.00):'));
    if (!isNaN(newMeta) && newMeta >= 0) {
        metaAhorro.value = parseFloat(newMeta.toFixed(2));
        toast.success(`Meta de ahorro actualizada a S/${newMeta.toFixed(2)} 🎯`);
    } else {
        toast.error('Monto ingresado no válido.');
    }
};

const goToDashboard = () => {
    router.push({ name: 'dashboard' });
};
</script>

<template>
    <InputModal v-if="showFixedModal"
                :title="'Añadir Costo Fijo'"
                :placeholder-name="'Ej: Alquiler de local'"
                @close="showFixedModal = false"
                @submit="data => handleCostSubmit('fixed', data)"
    />

    <InputModal v-if="showVariableModal"
                :title="'Añadir Costo Variable'"
                :placeholder-name="'Ej: Compra de bebidas extra'"
                @close="showVariableModal = false"
                @submit="data => handleCostSubmit('variable', data)"
    />

    <div class="budget-container">
        <!-- Floating Emojis -->
        <div class="floating-emoji" style="left: 10%; animation-delay: 0s;">💰</div>
        <div class="floating-emoji" style="left: 30%; animation-delay: 2s;">📊</div>
        <div class="floating-emoji" style="left: 50%; animation-delay: 4s;">🌻</div>
        <div class="floating-emoji" style="left: 70%; animation-delay: 6s;">📈</div>
        <div class="floating-emoji" style="left: 90%; animation-delay: 8s;">✨</div>

        <!-- Header Section -->
        <div class="page-header">
            <button class="back-button" @click="goToDashboard">
                ← Volver al Dashboard
            </button>
            
            <div class="header-content">
                <div class="title-section">
                    <span class="title-icon">🌻</span>
                    <div>
                        <h1>Mi Gran Evento</h1>
                        <p class="subtitle-text">Módulo de Presupuesto - Nivel Brote</p>
                    </div>
                </div>
                
                <div class="stats-row">
                    <div class="stat-box">
                        <span class="stat-emoji">🏦</span>
                        <div class="stat-info">
                            <span class="stat-label">Presupuesto Inicial</span>
                            <span class="stat-value">S/ {{ initialBudget.toFixed(2) }}</span>
                        </div>
                    </div>
                    <div class="stat-box" :class="{ 'warning-box': remainingBudget < 0 }">
                        <span class="stat-emoji">🧾</span>
                        <div class="stat-info">
                            <span class="stat-label">Saldo Restante</span>
                            <span class="stat-value" :class="remainingBudget >= 0 ? 'text-green' : 'text-red'">
                                S/ {{ remainingBudget.toFixed(2) }}
                            </span>
                        </div>
                    </div>
                    <div class="stat-box profit-box">
                        <span class="stat-emoji">🚀</span>
                        <div class="stat-info">
                            <span class="stat-label">Ganancia Proyectada</span>
                            <span class="stat-value">S/ {{ potentialProfit.toFixed(2) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Advisor Section -->
        <div class="advisor-section">
            <div class="advisor-content">
                <div class="advisor-message">
                    <span class="advisor-icon">👩‍🏫</span>
                    <div class="speech-bubble">
                        <p>{{ educationalMessage }}</p>
                    </div>
                </div>
                
                <div class="roi-card">
                   <div class="roi-info">
                       <span class="roi-label">Retorno (ROI)</span>
                       <span class="roi-value">{{ estimatedROI.toFixed(1) }}%</span>
                   </div>
                   <div class="roi-desc">Ganancia por cada sol invertido</div>
                </div>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="main-grid">
            <!-- Costos Fijos -->
            <div class="panel-section red-theme">
                <div class="section-header-panel">
                    <h3>🏢 Costos Fijos</h3>
                    <div class="amount-badge red">S/ {{ totalFixed.toFixed(2) }}</div>
                </div>
                <p class="section-desc">Gastos que pagas vendas o no.</p>
                
                <div class="costs-list">
                    <div v-for="cost in fixedCosts" :key="cost.id" class="cost-item">
                        <span class="cost-name">{{ cost.name }}</span>
                        <div class="cost-actions">
                            <span class="cost-amount">- S/ {{ cost.amount.toFixed(2) }}</span>
                            <button @click="removeCost('fixed', cost.id)" class="delete-btn">🗑️</button>
                        </div>
                    </div>
                    <div v-if="fixedCosts.length === 0" class="empty-list">No hay gastos fijos.</div>
                </div>
                
                <button @click="showFixedModal = true" class="add-btn red-btn">
                    + Añadir Costo Fijo
                </button>
            </div>

            <!-- Costos Variables -->
            <div class="panel-section yellow-theme">
                <div class="section-header-panel">
                    <h3>🍋 Costos Variables</h3>
                    <div class="amount-badge yellow">S/ {{ totalVariable.toFixed(2) }}</div>
                </div>
                <p class="section-desc">Gastos que dependen de la producción.</p>

                <div class="costs-list">
                    <div v-for="cost in variableCosts" :key="cost.id" class="cost-item">
                        <span class="cost-name">{{ cost.name }}</span>
                        <div class="cost-actions">
                            <span class="cost-amount">- S/ {{ cost.amount.toFixed(2) }}</span>
                            <button @click="removeCost('variable', cost.id)" class="delete-btn">🗑️</button>
                        </div>
                    </div>
                    <div v-if="variableCosts.length === 0" class="empty-list">No hay gastos variables.</div>
                </div>

                <button @click="showVariableModal = true" class="add-btn yellow-btn">
                    + Añadir Costo Variable
                </button>
            </div>

            <!-- Meta Saving & Opp Cost -->
            <div class="panel-section green-theme">
                <div class="section-header-panel">
                    <h3>🎯 Metas y Análisis</h3>
                </div>
                
                <div class="analysis-item">
                    <div class="analysis-header">
                        <span>Meta de Ahorro</span>
                        <button @click="setMetaAhorro" class="edit-btn">✏️</button>
                    </div>
                    <div class="analysis-value text-green">S/ {{ metaAhorro.toFixed(2) }}</div>
                    <p class="analysis-desc">Reserva para el futuro.</p>
                </div>

                <div class="divider"></div>

                <div class="analysis-item">
                    <div class="analysis-header">
                        <span>Costo de Oportunidad</span>
                    </div>
                    <div class="analysis-value text-orange">S/ {{ opportunityCost.toFixed(2) }}</div>
                    <p class="analysis-desc">Valor que podrías haber ganado invirtiendo lo gastado en exceso.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.budget-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Floating Emojis Animation */
.floating-emoji {
  position: fixed;
  font-size: 2rem;
  animation: floatUp 12s linear infinite;
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;
}

@keyframes floatUp {
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 0.4; }
  90% { opacity: 0.4; }
  100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
}

/* Header */
.page-header {
  background: white;
  border-radius: 30px;
  padding: 2rem 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  position: relative;
  z-index: 1;
}

.back-button {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  font-size: 0.9rem;
}
.back-button:hover { transform: translateX(-5px); }

.header-content { padding-top: 2rem; }

.title-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.title-icon {
  font-size: 3.5rem;
  animation: bounce 2s infinite;
}

.title-section h1 {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
  margin: 0;
}

.subtitle-text {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-top: 0.2rem;
}

/* Stats Row */
.stats-row {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.stat-box {
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  padding: 1rem 1.5rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  min-width: 200px;
}
.stat-box.warning-box { background: linear-gradient(to right, #fff5f5, #fed7d7); }
.stat-box.profit-box { background: linear-gradient(to right, #f0fff4, #c6f6d5); }

.stat-emoji { font-size: 2rem; }

.stat-info { display: flex; flex-direction: column; }
.stat-label { font-size: 0.8rem; color: #6c757d; font-weight: 600; }
.stat-value { font-size: 1.4rem; font-weight: 800; color: #2d3748; }
.text-green { color: #2f855a; }
.text-red { color: #c53030; }

/* Advisor Section */
.advisor-section {
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.advisor-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.advisor-message {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 600px;
}

.advisor-icon { font-size: 3.5rem; }

.speech-bubble {
  background: white;
  padding: 1.2rem 1.5rem;
  border-radius: 20px;
  border-bottom-left-radius: 5px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
  font-weight: 600;
  color: #4a5568;
  position: relative;
}

.roi-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(118, 75, 162, 0.3);
  transform: rotate(2deg);
}

.roi-label { display: block; font-size: 0.9rem; opacity: 0.9; }
.roi-value { display: block; font-size: 2rem; font-weight: 900; }
.roi-desc { font-size: 0.75rem; opacity: 0.8; }

/* Main Grid */
.main-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.panel-section {
  background: white;
  border-radius: 25px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
}

.panel-section.red-theme { border-top: 5px solid #fc8181; }
.panel-section.yellow-theme { border-top: 5px solid #f6e05e; }
.panel-section.green-theme { border-top: 5px solid #68d391; }

.section-header-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.section-header-panel h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.amount-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
}
.amount-badge.red { background: #fff5f5; color: #c53030; }
.amount-badge.yellow { background: #fffff0; color: #d69e2e; }

.section-desc {
  font-size: 0.9rem;
  color: #a0aec0;
  margin-bottom: 1.5rem;
}

.costs-list {
  flex-grow: 1;
  margin-bottom: 1.5rem;
}

.cost-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid #edf2f7;
}

.cost-name { font-weight: 500; color: #4a5568; }
.cost-amount { font-weight: 700; color: #e53e3e; margin-right: 0.5rem; }

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.2s;
}
.delete-btn:hover { opacity: 1; }

.empty-list {
  text-align: center;
  font-style: italic;
  color: #cbd5e0;
  padding: 1rem;
}

.add-btn {
  width: 100%;
  padding: 0.8rem;
  border-radius: 15px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  color: white;
}
.add-btn:hover { transform: translateY(-3px); }

.red-btn { background: linear-gradient(135deg, #fc8181 0%, #f56565 100%); box-shadow: 0 4px 12px rgba(245, 101, 101, 0.3); }
.yellow-btn { background: linear-gradient(135deg, #f6e05e 0%, #ecc94b 100%); box-shadow: 0 4px 12px rgba(236, 201, 75, 0.3); color: #744210; }

/* Analysis styles */
.analysis-item { padding: 1rem 0; }
.analysis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #718096;
  font-weight: 600;
}
.analysis-value { font-size: 2rem; font-weight: 800; line-height: 1; margin-bottom: 0.2rem; }
.analysis-desc { font-size: 0.8rem; color: #a0aec0; }
.text-orange { color: #dd6b20; }

.divider { height: 1px; background: #edf2f7; margin: 1rem 0; }

.edit-btn { background: none; border: none; cursor: pointer; font-size: 1.1rem; }

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 768px) {
    .stats-row { flex-direction: column; }
    .stat-box { width: 100%; }
    .header-content { text-align: center; }
    .title-section { flex-direction: column; }
    .advisor-content { flex-direction: column; text-align: center; }
    .advisor-message { flex-direction: column; }
}
</style>
