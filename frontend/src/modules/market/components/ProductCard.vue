<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Lógica de demanda
const demandInfo = computed(() => {
  const demand = props.product.local_demand;
  if (demand === 'alta') {
    return { text: 'Alta', icon: '🔥', class: 'demand-high' }
  }
  if (demand === 'media') {
    return { text: 'Media', icon: '📊', class: 'demand-medium' }
  }
  if (demand === 'baja') {
    return { text: 'Baja', icon: '📉', class: 'demand-low' }
  }
  return { text: 'Sin datos', icon: '❓', class: 'demand-unknown' }
})

// Lógica de fase
const stageInfo = computed(() => {
  const stage = props.product.offer_stage;
  if (stage === 'Brote') {
    return { text: '🌱 Brote', class: 'stage-brote' }
  }
  if (stage === 'Desarrollo') {
    return { text: '🌻 Desarrollo', class: 'stage-desarrollo' }
  }
  return null
})

// Emoji del producto basado en el nombre (fallback)
const productEmoji = computed(() => {
  const emojis = {
    'manzana': '🍎',
    'pan': '🍞',
    'leche': '🥛',
    'galletas': '🍪',
    'jugo': '🧃',
    'chocolate': '🍫',
    'arroz': '🍚',
    'huevos': '🥚',
    'queso': '🧀',
    'yogurt': '🥛',
    'default': '📦'
  };
  const name = props.product.name?.toLowerCase() || '';
  return emojis[name] || emojis.default;
})
</script>

<template>
  <div class="product-card">
    <!-- Product Header -->
    <div class="product-header">
      <span class="product-emoji">{{ productEmoji }}</span>
      <div class="product-badges">
        <span v-if="stageInfo" :class="['stage-badge', stageInfo.class]">
          {{ stageInfo.text }}
        </span>
        <span :class="['demand-badge', demandInfo.class]">
          {{ demandInfo.icon }} {{ demandInfo.text }}
        </span>
      </div>
    </div>

    <!-- Product Info -->
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      
      <div class="price-grid">
        <div class="price-item buy-price">
          <span class="price-label">Compra</span>
          <span class="price-value">S/ {{ product.cost.toFixed(2) }}</span>
        </div>
        <div class="price-item sell-price">
          <span class="price-label">Venta</span>
          <span class="price-value">S/ {{ product.price.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="product-actions">
      <button class="btn-buy" @click="$emit('comprar', product)">
        🛒 Comprar
      </button>
      <button class="btn-sell" @click="$emit('vender', product)">
        💰 Vender
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: 25px;
  overflow: hidden;
  border: 3px solid #e9ecef;
  transition: all 0.3s;
  position: relative;
}

.product-card::before {
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

.product-card:hover::before {
  opacity: 1;
}

.product-card:hover {
  transform: translateY(-8px) rotate(1deg);
  border-color: transparent;
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

/* Header */
.product-header {
  padding: 1.5rem;
  text-align: center;
  background: linear-gradient(to bottom, #FFF9F0, white);
  position: relative;
}

.product-emoji {
  font-size: 4rem;
  display: block;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.product-badges {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.8rem;
  flex-wrap: wrap;
}

.stage-badge, .demand-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 700;
}

.stage-brote {
  background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
  color: white;
}

.stage-desarrollo {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.demand-high {
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
  color: white;
}

.demand-medium {
  background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
  color: white;
}

.demand-low {
  background: linear-gradient(135deg, #a8a8a8 0%, #6b6b6b 100%);
  color: white;
}

.demand-unknown {
  background: #e9ecef;
  color: #7f8c8d;
}

/* Info */
.product-info {
  padding: 1.2rem;
}

.product-name {
  font-size: 1.4rem;
  font-weight: 800;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
}

.price-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}

.price-item {
  text-align: center;
  padding: 0.8rem;
  border-radius: 15px;
}

.buy-price {
  background: linear-gradient(to right, #FFE8E8, #FFD0D0);
}

.sell-price {
  background: linear-gradient(to right, #E0F7F5, #C8F7DC);
}

.price-label {
  display: block;
  font-size: 0.75rem;
  color: #7f8c8d;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.price-value {
  font-size: 1.3rem;
  font-weight: 900;
}

.buy-price .price-value {
  color: #FF6B6B;
}

.sell-price .price-value {
  color: #38EF7D;
}

/* Actions */
.product-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.btn-buy, .btn-sell {
  padding: 1rem;
  border: none;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-buy {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom-left-radius: 22px;
}

.btn-buy:hover {
  background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
  transform: scale(1.02);
}

.btn-sell {
  background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
  color: white;
  border-bottom-right-radius: 22px;
}

.btn-sell:hover {
  background: linear-gradient(135deg, #45b8b0 0%, #32d870 100%);
  transform: scale(1.02);
}
</style>
