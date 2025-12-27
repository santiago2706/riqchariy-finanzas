<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useKioscoStore } from '../store/useKioscoStore';
import { useMarketStore } from '../store/useMarketStore';
import ProductCard from '../components/ProductCard.vue';

const router = useRouter();
const kiosco = useKioscoStore();
const market = useMarketStore();

// --- FUNCIONES DE LA TIENDA ---
function comprarProducto(product) {
  kiosco.buyProduct(product, 1);
}

function venderProducto(item) {
  kiosco.sellProduct(item, 1);
}

function venderProductoDesdeEstante(product) {
  const itemInInventory = kiosco.inventory.find(item => item.product.id === product.id);
  if (itemInInventory) {
    kiosco.sellProduct(itemInInventory, 1);
  } else {
    console.log("¡No tienes este producto en tu inventario para vender!");
  }
}

async function handleAdvanceDay() {
  await market.advanceDay();
}

function goToDashboard() {
  router.push({ name: 'dashboard' });
}

// --- CARGA INICIAL ---
onMounted(() => {
  market.fetchInitialProducts();
});
</script>

<template>
  <div class="tiendita-container">
    <!-- Floating Emojis -->
    <div class="floating-emoji" style="left: 10%; animation-delay: 0s;">🎈</div>
    <div class="floating-emoji" style="left: 30%; animation-delay: 2s;">⭐</div>
    <div class="floating-emoji" style="left: 50%; animation-delay: 4s;">🛒</div>
    <div class="floating-emoji" style="left: 70%; animation-delay: 6s;">🌟</div>
    <div class="floating-emoji" style="left: 90%; animation-delay: 8s;">✨</div>

    <!-- Header Section -->
    <div class="page-header">
      <button class="back-button" @click="goToDashboard">
        ← Volver al Dashboard
      </button>
      
      <div class="header-content">
        <div class="title-section">
          <span class="title-icon">🏪</span>
          <div>
            <h1>La Tiendita Virtual</h1>
            <p class="region-text">Región: <span class="region-badge">{{ kiosco.currentRegion }}</span></p>
          </div>
        </div>
        
        <div class="stats-row">
          <div class="stat-box">
            <span class="stat-emoji">🪙</span>
            <div class="stat-info">
              <span class="stat-label">Tu Saldo</span>
              <span class="stat-value">S/ {{ kiosco.saldo.toFixed(2) }}</span>
            </div>
          </div>
          <div class="stat-box">
            <span class="stat-emoji">📦</span>
            <div class="stat-info">
              <span class="stat-label">Inventario</span>
              <span class="stat-value">{{ kiosco.inventory.length }} items</span>
            </div>
          </div>
          <div class="stat-box day-box">
            <span class="stat-emoji">📅</span>
            <div class="stat-info">
              <span class="stat-label">Día Actual</span>
              <span class="stat-value">{{ market.day }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Game Controls -->
    <div class="controls-section">
      <div class="controls-content">
        <div class="shopkeeper-message">
          <span class="shopkeeper">🧙‍♂️</span>
          <div class="speech-bubble">
            <p v-if="market.marketEvent">{{ market.marketEvent }}</p>
            <p v-else>¡Bienvenido a mi tienda! Compra productos a buen precio y véndelos para ganar. ¡Avanza los días para ver cómo cambian los precios!</p>
          </div>
        </div>
        <button 
          class="advance-day-btn"
          @click="handleAdvanceDay"
          :disabled="market.isUpdating"
        >
          <span class="btn-icon">⏩</span>
          {{ market.isUpdating ? 'Avanzando...' : 'Avanzar al Siguiente Día' }}
        </button>
      </div>
    </div>

    <!-- Products Section -->
    <div class="products-section">
      <div class="section-header">
        <h2>🛍️ Productos Disponibles</h2>
        <p>Compra productos a bajo costo y véndelos cuando el precio suba</p>
      </div>

      <div v-if="kiosco.isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <span>Cargando productos...</span>
      </div>

      <div v-else-if="market.products && market.products.length > 0" class="products-grid">
        <ProductCard
          v-for="prod in market.products" 
          :key="prod.id"
          :product="prod"
          @comprar="comprarProducto"
          @vender="venderProductoDesdeEstante"
        />
      </div>
      
      <div v-else class="empty-state">
        <span class="empty-icon">📭</span>
        <p>No hay productos en el mercado.</p>
      </div>
    </div>

    <!-- Inventory Section -->
    <div class="inventory-section">
      <div class="section-header">
        <h2>📦 Tu Inventario</h2>
        <p>Aquí están los productos que has comprado</p>
      </div>

      <div v-if="kiosco.inventory && kiosco.inventory.length > 0" class="inventory-grid">
        <div 
          v-for="item in kiosco.inventory" 
          :key="item.product.id"
          class="inventory-item"
        >
          <div class="item-info">
            <span class="item-emoji">📦</span>
            <div class="item-details">
              <strong class="item-name">{{ item.product.name }}</strong>
              <p class="item-cost">Costo: S/ {{ item.product.cost ? item.product.cost.toFixed(2) : 'N/A' }}</p>
            </div>
          </div>
          
          <div class="item-quantity">
            <span class="quantity-badge">x{{ item.quantity }}</span>
          </div>
          
          <button class="sell-btn" @click="venderProducto(item)">
            💰 Vender 1
          </button>
        </div>
      </div>

      <div v-else class="empty-inventory">
        <span class="empty-icon">🛒</span>
        <p>¡Inventario vacío! Compra productos para empezar a vender.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tiendita-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Floating Emojis */
.floating-emoji {
  position: fixed;
  font-size: 2rem;
  animation: floatUp 12s linear infinite;
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;
}

@keyframes floatUp {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% { opacity: 0.4; }
  90% { opacity: 0.4; }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* Header */
.page-header {
  background: white;
  border-radius: 30px;
  padding: 2rem 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1;
}

.back-button {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.back-button:hover {
  transform: translateX(-5px);
  box-shadow: 0 5px 20px rgba(78, 205, 196, 0.4);
}

.header-content {
  padding-top: 2rem;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.title-icon {
  font-size: 4rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

.title-section h1 {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
}

.region-text {
  color: #7f8c8d;
  font-size: 1rem;
}

.region-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 15px;
  font-weight: 600;
}

.stats-row {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.stat-box {
  background: linear-gradient(to right, #FFF9F0, #FFE8CC);
  padding: 1rem 1.5rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  animation: pulse 3s ease-in-out infinite;
}

.stat-box.day-box {
  background: linear-gradient(to right, #e8f4ff, #e0f7f5);
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.stat-emoji {
  font-size: 2rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.75rem;
  color: #7f8c8d;
  font-weight: 600;
}

.stat-value {
  font-size: 1.3rem;
  font-weight: 900;
  color: #2c3e50;
}

/* Controls Section */
.controls-section {
  background: white;
  border-radius: 25px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1;
}

.controls-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.shopkeeper-message {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
}

.shopkeeper {
  font-size: 4rem;
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  75% { transform: rotate(-15deg); }
}

.speech-bubble {
  background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
  color: white;
  padding: 1.2rem 1.5rem;
  border-radius: 20px;
  position: relative;
  font-weight: 600;
  box-shadow: 0 5px 20px rgba(78, 205, 196, 0.3);
  max-width: 500px;
}

.speech-bubble::before {
  content: '';
  position: absolute;
  left: -15px;
  top: 20px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 15px solid #4ECDC4;
}

.advance-day-btn {
  background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 5px 20px rgba(255, 165, 0, 0.4);
  white-space: nowrap;
}

.advance-day-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 165, 0, 0.5);
}

.advance-day-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1.3rem;
}

/* Products Section */
.products-section, .inventory-section {
  background: white;
  border-radius: 30px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 2rem;
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #7f8c8d;
  font-size: 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem;
  color: #7f8c8d;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 4px solid #e9ecef;
  border-top-color: #4ECDC4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state, .empty-inventory {
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
  opacity: 0.5;
}

/* Inventory Grid */
.inventory-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.inventory-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem;
  background: linear-gradient(to right, #FFF9F0, #FFE8CC);
  border-radius: 20px;
  transition: all 0.3s;
}

.inventory-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.item-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-emoji {
  font-size: 2.5rem;
}

.item-details {
  text-align: left;
}

.item-name {
  font-size: 1.1rem;
  color: #2c3e50;
  display: block;
}

.item-cost {
  font-size: 0.85rem;
  color: #7f8c8d;
  margin: 0;
}

.quantity-badge {
  background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 900;
  font-size: 1.1rem;
}

.sell-btn {
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.sell-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 20px rgba(255, 107, 107, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .tiendita-container {
    padding: 1rem;
  }
  
  .page-header {
    padding: 1.5rem;
    padding-top: 4rem;
  }
  
  .title-section {
    flex-direction: column;
    text-align: center;
  }
  
  .title-section h1 {
    font-size: 1.8rem;
  }
  
  .controls-content {
    flex-direction: column;
    text-align: center;
  }
  
  .shopkeeper-message {
    flex-direction: column;
    align-items: center;
  }
  
  .speech-bubble::before {
    display: none;
  }
  
  .inventory-item {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>