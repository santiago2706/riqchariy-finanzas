<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import InputModal from '@/components/InputModal.vue';

const router = useRouter();

// --- ESTADO INICIAL DEL SIMULADOR ---
const fixedCosts = ref([
    { id: 1, name: 'Permiso Municipal (Local)', amount: 100.00 },
]);
const variableCosts = ref([
    { id: 3, name: 'Compra Inicial de Insumos', amount: 50.00 },
]);

// Variables principales del juego
const targetRevenue = ref(500.00);
const initialBudget = ref(250.00);
const EMERGENCY_FUND = 150.00;
const metaAhorro = ref(100);

// --- ESTADO DEL MODAL ---
const showFixedModal = ref(false);
const showVariableModal = ref(false);

// --- GETTERS (Cálculos Automáticos) ---
const totalFixed = computed(() => fixedCosts.value.reduce((sum, cost) => sum + cost.amount, 0));
const totalVariable = computed(() => variableCosts.value.reduce((sum, cost) => sum + cost.amount, 0));
const totalSpent = computed(() => totalFixed.value + totalVariable.value);
const remainingBudget = computed(() => initialBudget.value - totalSpent.value);
const potentialProfit = computed(() => targetRevenue.value - totalSpent.value);

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

// --- FUNCIONES DE INTERACCIÓN ---
const handleCostSubmit = (type, costData) => {
    if (costData.name && !isNaN(costData.amount) && costData.amount > 0) {
        const amount = parseFloat(costData.amount.toFixed(2));
        const newCost = { id: Date.now(), name: costData.name, amount: amount };

        if (type === 'fixed') {
            fixedCosts.value.push(newCost);
            showFixedModal.value = false;
        } else {
            variableCosts.value.push(newCost);
            showVariableModal.value = false;
        }
    }
};

const removeCost = (type, id) => {
    if (confirm('¿Estás seguro de eliminar este costo?')) {
        if (type === 'fixed') {
            fixedCosts.value = fixedCosts.value.filter(cost => cost.id !== id);
        } else {
            variableCosts.value = variableCosts.value.filter(cost => cost.id !== id);
        }
    }
};

const setMetaAhorro = () => {
    const newMeta = parseFloat(prompt('Ingresa tu nueva Meta de Ahorro (ej. 150.00):'));
    if (!isNaN(newMeta) && newMeta >= 0) {
        metaAhorro.value = parseFloat(newMeta.toFixed(2));
    } else {
        alert('Monto ingresado no válido.');
    }
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

    <div class="presupuesto-container">
        <!-- Back Button -->
        <button class="back-btn" @click="router.push({ name: 'dashboard' })">
            ← Volver al Dashboard
        </button>

        <!-- Welcome Header -->
        <div class="welcome-section">
            <h1>🌻 Módulo Presupuesto: Mi Gran Evento</h1>
            <p>Planifica tu evento como un verdadero emprendedor. Aprende la diferencia entre Costos Fijos y Costos Variables para maximizar tu Ganancia.</p>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">⚠️</div>
                <div class="stat-label">Costo de Oportunidad</div>
                <div class="stat-value">S/ {{ opportunityCost.toFixed(2) }}</div>
                <div class="stat-description">Fondo de emergencia comprometido</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">📈</div>
                <div class="stat-label">Retorno (ROI)</div>
                <div class="stat-value">{{ estimatedROI.toFixed(1) }}%</div>
                <div class="stat-description">Ganancia por cada sol invertido</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">💵</div>
                <div class="stat-label">Presupuesto Inicial</div>
                <div class="stat-value">S/ {{ initialBudget.toFixed(2) }}</div>
                <div class="stat-description">Gasto proyectado: S/ {{ totalSpent.toFixed(2) }}</div>
            </div>
            <div class="stat-card" :class="{ negative: remainingBudget < 0 }">
                <div class="stat-icon">{{ remainingBudget >= 0 ? '✅' : '🔴' }}</div>
                <div class="stat-label">Saldo Restante</div>
                <div class="stat-value" :class="{ 'text-danger': remainingBudget < 0 }">S/ {{ remainingBudget.toFixed(2) }}</div>
                <div class="stat-description">Ganancia potencial: S/ {{ potentialProfit.toFixed(2) }}</div>
            </div>
        </div>

        <!-- Content Grid -->
        <div class="content-grid">
            <!-- Costos Fijos -->
            <div class="cost-card cost-fixed">
                <div class="cost-header">
                    <div class="cost-icon">📋</div>
                    <div class="cost-info">
                        <h2>Costos Fijos</h2>
                        <p>Total: S/ {{ totalFixed.toFixed(2) }}</p>
                    </div>
                    <button class="add-btn cost-fixed" @click="showFixedModal = true">+ Añadir</button>
                </div>
                <div class="cost-list">
                    <div v-for="cost in fixedCosts" :key="cost.id" class="cost-item">
                        <span class="cost-name">{{ cost.name }}</span>
                        <div class="cost-actions">
                            <span class="cost-amount">- S/ {{ cost.amount.toFixed(2) }}</span>
                            <button @click="removeCost('fixed', cost.id)" class="delete-btn">🗑️</button>
                        </div>
                    </div>
                    <p v-if="fixedCosts.length === 0" class="empty-message">No hay costos fijos registrados</p>
                </div>
            </div>

            <!-- Costos Variables -->
            <div class="cost-card cost-variable">
                <div class="cost-header">
                    <div class="cost-icon">📊</div>
                    <div class="cost-info">
                        <h2>Costos Variables</h2>
                        <p>Total: S/ {{ totalVariable.toFixed(2) }}</p>
                    </div>
                    <button class="add-btn cost-variable" @click="showVariableModal = true">+ Añadir</button>
                </div>
                <div class="cost-list">
                    <div v-for="cost in variableCosts" :key="cost.id" class="cost-item">
                        <span class="cost-name">{{ cost.name }}</span>
                        <div class="cost-actions">
                            <span class="cost-amount">- S/ {{ cost.amount.toFixed(2) }}</span>
                            <button @click="removeCost('variable', cost.id)" class="delete-btn">🗑️</button>
                        </div>
                    </div>
                    <p v-if="variableCosts.length === 0" class="empty-message">No hay costos variables registrados</p>
                </div>
            </div>

            <!-- Panel Derecho -->
            <div class="right-panel">
                <!-- Meta de Ahorro -->
                <div class="goal-card">
                    <div class="goal-header">
                        <div class="goal-icon">🎯</div>
                        <h3>Meta de Ahorro</h3>
                        <button class="set-btn" @click="setMetaAhorro">Establecer</button>
                    </div>
                    <div class="goal-value">S/ {{ metaAhorro.toFixed(2) }}</div>
                    <p class="goal-description">Objetivo de ahorro para inversión o imprevistos</p>
                </div>

                <!-- Ganancia Potencial -->
                <div class="profit-card">
                    <div class="profit-icon">💰</div>
                    <div class="profit-label">Ganancia Potencial Total</div>
                    <div class="profit-value">S/ {{ potentialProfit.toFixed(2) }}</div>
                    <div class="profit-description">Ingreso proyectado: S/ {{ targetRevenue.toFixed(2) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.presupuesto-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    padding-top: 1rem;
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
    content: '💰📊🎯✨';
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 3rem;
    opacity: 0.15;
    animation: float 3s ease-in-out infinite;
}

.welcome-section h1 {
    font-size: 2.2rem;
    background: linear-gradient(135deg, #FFD93D 0%, #FFA500 50%, #FF6B6B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
    font-weight: 900;
}

.welcome-section p {
    color: #7f8c8d;
    font-size: 1.1rem;
    max-width: 700px;
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
    background: linear-gradient(45deg, #FFD93D, #FFA500, #FF6B6B, #FFD93D);
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
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.stat-card.negative {
    background: linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%);
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
    background: linear-gradient(135deg, #FFA500 0%, #FF6B6B 100%);
    box-shadow: 0 5px 20px rgba(255, 165, 0, 0.3);
}

.stat-card:nth-child(2) .stat-icon {
    background: linear-gradient(135deg, #A855F7 0%, #7C3AED 100%);
    box-shadow: 0 5px 20px rgba(168, 85, 247, 0.3);
    animation-delay: 0.5s;
}

.stat-card:nth-child(3) .stat-icon {
    background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
    box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3);
    animation-delay: 1s;
}

.stat-card:nth-child(4) .stat-icon {
    background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
    box-shadow: 0 5px 20px rgba(78, 205, 196, 0.3);
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

.stat-value.text-danger {
    color: #EF4444;
}

.stat-description {
    color: #9ca3af;
    font-size: 0.85rem;
    margin-top: 0.5rem;
}

/* Content Grid */
.content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
}

/* Cost Cards */
.cost-card {
    background: white;
    border-radius: 25px;
    padding: 2rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: 450px;
}

.cost-card::before {
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

.cost-card:hover::before {
    opacity: 1;
}

.cost-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f3f4f6;
    flex-wrap: nowrap;
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
    padding-top: 0.5rem;
}

.cost-icon {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    flex-shrink: 0;
}

.cost-card.cost-fixed .cost-icon {
    background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

.cost-card.cost-variable .cost-icon {
    background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
    box-shadow: 0 5px 15px rgba(255, 217, 61, 0.3);
}

.cost-info {
    flex: 1;
}

.cost-info h2 {
    font-size: 1.3rem;
    font-weight: 800;
    color: #2c3e50;
    margin-bottom: 0.2rem;
}

.cost-info p {
    color: #7f8c8d;
    font-size: 0.9rem;
}

.add-btn {
    padding: 0.6rem 1.2rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.9rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    color: white;
    flex-shrink: 0;
    margin-left: auto;
}

.add-btn.cost-fixed {
    background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
}

.add-btn.cost-fixed:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

.add-btn.cost-variable {
    background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
}

.add-btn.cost-variable:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 217, 61, 0.4);
}

.cost-list {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
}

.cost-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: linear-gradient(to right, #fafafa, #f5f5f5);
    border-radius: 12px;
    margin-bottom: 0.8rem;
    transition: all 0.3s;
}

.cost-item:hover {
    background: linear-gradient(to right, #fff5f0, #ffe8dd);
    transform: translateX(5px);
}

.cost-name {
    font-weight: 600;
    color: #2c3e50;
}

.cost-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.cost-amount {
    font-weight: 700;
    color: #EF4444;
}

.delete-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s;
}

.cost-item:hover .delete-btn {
    opacity: 1;
}

.delete-btn:hover {
    transform: scale(1.2);
}

.empty-message {
    color: #9ca3af;
    text-align: center;
    padding: 2rem;
    font-style: italic;
}

/* Right Panel */
.right-panel {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.goal-card {
    background: white;
    border-radius: 25px;
    padding: 2rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;
}

.goal-card::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #4ECDC4, #38EF7D, #A8E6CF, #4ECDC4);
    background-size: 400%;
    border-radius: 25px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s;
    animation: borderGlow 3s ease infinite;
}

.goal-card:hover::before {
    opacity: 1;
}

.goal-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.goal-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 5px 15px rgba(78, 205, 196, 0.3);
    animation: float 3s ease-in-out infinite;
}

.goal-header h3 {
    flex: 1;
    font-size: 1.2rem;
    font-weight: 800;
    color: #2c3e50;
}

.set-btn {
    background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s;
}

.set-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(78, 205, 196, 0.4);
}

.goal-value {
    font-size: 2.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
}

.goal-description {
    color: #7f8c8d;
    font-size: 0.9rem;
}

/* Profit Card */
.profit-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 25px;
    padding: 2rem;
    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
    text-align: center;
    flex: 1;
}

.profit-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: numberPulse 2s ease-in-out infinite;
}

.profit-label {
    color: rgba(255,255,255,0.8);
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.profit-value {
    font-size: 2.5rem;
    font-weight: 900;
    color: white;
    margin-bottom: 0.5rem;
}

.profit-description {
    color: rgba(255,255,255,0.7);
    font-size: 0.85rem;
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

@keyframes numberPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

/* Responsive */
@media (max-width: 1200px) {
    .content-grid {
        grid-template-columns: 1fr 1fr;
    }
    .right-panel {
        grid-column: span 2;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 768px) {
    .presupuesto-container {
        padding: 1rem;
    }
    
    .stats-grid {
        grid-template-columns: 1fr;
    }
    
    .content-grid {
        grid-template-columns: 1fr;
    }
    
    .right-panel {
        grid-column: span 1;
        grid-template-columns: 1fr;
    }
    
    .welcome-section h1 {
        font-size: 1.6rem;
    }
    
    .welcome-section::before {
        display: none;
    }
}
</style>
