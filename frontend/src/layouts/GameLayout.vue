<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/core/components/AppHeader.vue'
import AppSidebar from '@/core/components/AppSidebar.vue'
import MarketEventPopup from '@/modules/market/components/MarketEventPopup.vue'
import ChatbotWindow from '@/core/components/ChatbotWindow.vue'
import { RouterView } from 'vue-router'
import { useThemeStore } from '@/core/store/useThemeStore'

const route = useRoute()
const themeStore = useThemeStore()

// Inicializar tema al montar
onMounted(() => {
  themeStore.initialize()
})

// Vistas que usan el layout sin sidebar (diseño limpio)
const hideSidebar = computed(() => 
  route.name === 'dashboard' || route.name === 'lecciones' || route.name === 'kiosco' || route.name === 'presupuesto-brote' || route.name === 'perfil' || route.name === 'configuracion'
)
</script>

<template>
  <div id="game-layout-container" :class="{ 'clean-mode': hideSidebar, 'dark-mode': themeStore.isDarkMode }">
    <AppHeader />
    
    <!-- Sidebar solo visible cuando NO es dashboard ni lecciones -->
    <AppSidebar v-if="!hideSidebar" />

    <main :class="hideSidebar ? 'main-clean' : 'main-with-sidebar'">
      <div class="content-wrapper">
        <RouterView />
      </div>
    </main>

    <MarketEventPopup />
    <ChatbotWindow />
  </div>
</template>

<style scoped>
#game-layout-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF9F0 0%, #FFE8CC 50%, #E0F7F5 100%);
  transition: background 0.3s ease;
}

#game-layout-container.clean-mode {
  background: linear-gradient(135deg, #FFF9F0 0%, #FFE8CC 50%, #E0F7F5 100%);
}

/* DARK MODE GLOBAL */
#game-layout-container.dark-mode {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0d1b2a 100%);
}

#game-layout-container.dark-mode.clean-mode {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0d1b2a 100%);
}

.main-with-sidebar {
  padding-left: 256px; /* 64 * 4 = 256px (w-64) */
  padding-top: 64px; /* Height of header */
}

.main-clean {
  padding-top: 64px; /* Only header height, no sidebar */
}

.content-wrapper {
  padding: 1.5rem;
  min-height: calc(100vh - 64px);
}

@media (max-width: 768px) {
  .main-with-sidebar {
    padding-left: 0;
  }
}
</style>

<!-- Global Dark Mode Styles (unscoped) -->
<style>
/* =====================================================
   DARK MODE GLOBAL - TARJETAS Y CONTENEDORES
   ===================================================== */
.dark-mode .welcome-section,
.dark-mode .stat-card,
.dark-mode .level-card,
.dark-mode .activities-card,
.dark-mode .game-card,
.dark-mode .cost-card,
.dark-mode .goal-card,
.dark-mode .info-card,
.dark-mode .progress-card,
.dark-mode .settings-card,
.dark-mode .config-header,
.dark-mode .profile-header,
.dark-mode .games-section,
.dark-mode .achievements-section,
.dark-mode .dashboard-container > div,
.dark-mode .lesson-sidebar,
.dark-mode .lesson-content,
.dark-mode .lesson-card,
.dark-mode .lesson-item,
.dark-mode .kiosco-header,
.dark-mode .products-section,
.dark-mode .inventory-section,
.dark-mode .product-card,
.dark-mode .inventory-card,
.dark-mode .next-level-card,
.dark-mode .lecciones-container > div,
.dark-mode .kiosco-container > div,
.dark-mode .presupuesto-container > div {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
  box-shadow: 0 10px 40px rgba(0,0,0,0.4) !important;
}

/* Secciones específicas con fondo diferente */
.dark-mode .games-section,
.dark-mode .achievements-section {
  background: linear-gradient(135deg, #16162e 0%, #1e1e3f 100%) !important;
  border-radius: 25px;
  padding: 2rem;
}

/* =====================================================
   DARK MODE - TÍTULOS Y ENCABEZADOS
   ===================================================== */
.dark-mode h1,
.dark-mode h2,
.dark-mode h3,
.dark-mode h4,
.dark-mode .stat-value,
.dark-mode .level-info h2,
.dark-mode .cost-info h2,
.dark-mode .setting-label,
.dark-mode .info-value,
.dark-mode .user-info h1,
.dark-mode .section-header h2,
.dark-mode .lesson-title,
.dark-mode .product-name,
.dark-mode .inventory-item-name,
.dark-mode .game-title,
.dark-mode .achievement-name {
  color: #ffffff !important;
}

/* =====================================================
   DARK MODE - TEXTOS SECUNDARIOS
   ===================================================== */
.dark-mode p,
.dark-mode span,
.dark-mode .stat-label,
.dark-mode .stat-description,
.dark-mode .setting-desc,
.dark-mode .info-label,
.dark-mode .goal-description,
.dark-mode .progress-hint,
.dark-mode .user-email,
.dark-mode .cost-info p,
.dark-mode .level-info p,
.dark-mode .game-description,
.dark-mode .lesson-description,
.dark-mode .product-description,
.dark-mode .activity-reward {
  color: #a0aec0 !important;
}

/* =====================================================
   DARK MODE - ITEMS Y LISTAS
   ===================================================== */
.dark-mode .setting-item,
.dark-mode .info-item,
.dark-mode .cost-item,
.dark-mode .activity-item,
.dark-mode .achievement-item,
.dark-mode .lesson-list-item,
.dark-mode .product-item,
.dark-mode .inventory-item {
  background: rgba(255,255,255,0.05) !important;
  border-color: rgba(255,255,255,0.1) !important;
}

.dark-mode .setting-item:hover,
.dark-mode .activity-item:hover,
.dark-mode .lesson-list-item:hover,
.dark-mode .product-item:hover {
  background: rgba(255,255,255,0.1) !important;
}

/* =====================================================
   DARK MODE - INPUTS Y SELECTS
   ===================================================== */
.dark-mode .select-input,
.dark-mode input[type="text"],
.dark-mode input[type="number"],
.dark-mode textarea,
.dark-mode select {
  background: rgba(255,255,255,0.1) !important;
  border-color: rgba(255,255,255,0.2) !important;
  color: #ffffff !important;
}

.dark-mode .select-input option,
.dark-mode select option {
  background: #1e1e3f !important;
  color: #ffffff !important;
}

/* =====================================================
   DARK MODE - BORDES Y DIVISORES
   ===================================================== */
.dark-mode .card-header,
.dark-mode .cost-header,
.dark-mode .goal-header,
.dark-mode .section-divider {
  border-bottom-color: rgba(255,255,255,0.1) !important;
}

.dark-mode .progress-bar {
  background: rgba(255,255,255,0.1) !important;
}

/* =====================================================
   DARK MODE - ELEMENTOS ESPECÍFICOS
   ===================================================== */
.dark-mode .cost-amount {
  color: #FF6B6B !important;
}

.dark-mode .cost-name,
.dark-mode .activity-title {
  color: #ffffff !important;
}

.dark-mode .empty-message {
  color: #a0aec0 !important;
}

/* =====================================================
   DARK MODE - DASHBOARD ESPECÍFICO
   ===================================================== */
.dark-mode .dashboard-container {
  background: transparent !important;
}

.dark-mode .games-grid .game-card,
.dark-mode .stat-card {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
}

.dark-mode .next-level-card {
  background: linear-gradient(135deg, #2a2a5a 0%, #3a3a6a 100%) !important;
}

.dark-mode .activity-item {
  background: rgba(255,255,255,0.05) !important;
  border-radius: 15px;
}

.dark-mode .activity-item:hover {
  background: rgba(255,255,255,0.1) !important;
}

/* =====================================================
   DARK MODE - LECCIONES ESPECÍFICO
   ===================================================== */
.dark-mode .lecciones-container,
.dark-mode .lecciones-main {
  background: transparent !important;
}

.dark-mode .lesson-sidebar {
  background: linear-gradient(135deg, #16162e 0%, #1e1e3f 100%) !important;
}

.dark-mode .lesson-item {
  background: rgba(255,255,255,0.05) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
}

.dark-mode .lesson-item:hover {
  background: rgba(255,255,255,0.1) !important;
}

.dark-mode .lesson-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border-color: transparent !important;
}

.dark-mode .lesson-content-card,
.dark-mode .ai-response-card {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
}

.dark-mode .lesson-level-badge {
  color: #ffffff !important;
}

/* =====================================================
   DARK MODE - KIOSCO ESPECÍFICO
   ===================================================== */
.dark-mode .kiosco-container,
.dark-mode .tiendita-container {
  background: transparent !important;
}

.dark-mode .kiosco-header,
.dark-mode .tiendita-header {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
}

.dark-mode .kiosco-stat-card,
.dark-mode .balance-card,
.dark-mode .inventory-card,
.dark-mode .day-card {
  background: rgba(255,255,255,0.05) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
}

.dark-mode .products-section,
.dark-mode .inventory-section {
  background: linear-gradient(135deg, #16162e 0%, #1e1e3f 100%) !important;
  border-radius: 25px;
  padding: 2rem;
}

.dark-mode .product-card,
.dark-mode .inventory-item-card {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
}

.dark-mode .product-price,
.dark-mode .kiosco-stat-value {
  color: #4ECDC4 !important;
}

.dark-mode .event-card {
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%) !important;
}

/* =====================================================
   DARK MODE - PRESUPUESTO ESPECÍFICO
   ===================================================== */
.dark-mode .presupuesto-container {
  background: transparent !important;
}

.dark-mode .cost-card,
.dark-mode .goal-card {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
}

.dark-mode .cost-item {
  background: rgba(255,255,255,0.05) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
}

/* =====================================================
   DARK MODE - LOGROS
   ===================================================== */
.dark-mode .achievement-item {
  background: rgba(255,255,255,0.05) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
}

.dark-mode .achievement-item.locked {
  opacity: 0.5;
}

.dark-mode .achievement-name {
  color: #ffffff !important;
}

/* =====================================================
   DARK MODE - MENSAJES Y ALERTAS
   ===================================================== */
.dark-mode .empty-state,
.dark-mode .no-data-message {
  color: #a0aec0 !important;
}

.dark-mode .tip-card,
.dark-mode .info-box {
  background: rgba(78, 205, 196, 0.1) !important;
  border: 1px solid rgba(78, 205, 196, 0.3) !important;
}

/* =====================================================
   DARK MODE - ANIMACIONES DE FONDO
   ===================================================== */
.dark-mode .decorative-star,
.dark-mode .floating-element {
  opacity: 0.3;
}

/* =====================================================
   DARK MODE - KIOSCO PÁGINA COMPLETA
   ===================================================== */
.dark-mode .page-header {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
}

.dark-mode .controls-section {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
}

.dark-mode .speech-bubble {
  background: linear-gradient(135deg, #2a5a5a 0%, #3a6a6a 100%) !important;
  color: #ffffff !important;
}

.dark-mode .speech-bubble::before {
  border-right-color: #2a5a5a !important;
}

.dark-mode .stats-container {
  background: transparent !important;
}

.dark-mode .stat-card-mini,
.dark-mode .stat-box {
  background: rgba(255,255,255,0.05) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
}

.dark-mode .section-header h2 {
  color: #ffffff !important;
}

.dark-mode .section-header p {
  color: #a0aec0 !important;
}

.dark-mode .empty-state,
.dark-mode .empty-inventory {
  background: rgba(255,255,255,0.02) !important;
}

.dark-mode .empty-state p,
.dark-mode .empty-inventory p {
  color: #a0aec0 !important;
}

/* =====================================================
   DARK MODE - DASHBOARD PÁGINA COMPLETA
   ===================================================== */
.dark-mode .stats-row {
  background: transparent !important;
}

.dark-mode .content-grid {
  background: transparent !important;
}

.dark-mode .level-card {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
}

.dark-mode .next-level-card,
.dark-mode .next-level-info {
  background: linear-gradient(135deg, rgba(78, 205, 196, 0.15) 0%, rgba(102, 126, 234, 0.15) 100%) !important;
  color: #ffffff !important;
}

.dark-mode .next-level-card h3,
.dark-mode .next-level-info h3 {
  color: #4ECDC4 !important;
}

.dark-mode .next-level-card p,
.dark-mode .next-level-info p {
  color: #a0aec0 !important;
}

.dark-mode .activities-card {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
}

.dark-mode .activity-arrow {
  color: #4ECDC4 !important;
}

/* =====================================================
   DARK MODE - LECCIONES PÁGINA COMPLETA
   ===================================================== */
.dark-mode .lessons-header,
.dark-mode .lecciones-header {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
}

.dark-mode .lessons-sidebar,
.dark-mode .lesson-list {
  background: linear-gradient(135deg, #16162e 0%, #1e1e3f 100%) !important;
}

.dark-mode .lesson-card,
.dark-mode .lesson-detail-card {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
}

.dark-mode .lesson-name,
.dark-mode .lesson-title-text {
  color: #ffffff !important;
}

.dark-mode .lesson-meta,
.dark-mode .lesson-subtitle {
  color: #a0aec0 !important;
}

/* =====================================================
   DARK MODE - MODALES Y POPUPS
   ===================================================== */
.dark-mode .modal-content,
.dark-mode .popup-content {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
  color: #ffffff !important;
}

/* =====================================================
   DARK MODE - DROPDOWN MENU
   ===================================================== */
.dark-mode .dropdown-menu {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
}

.dark-mode .dropdown-item {
  background: transparent !important;
  color: #ffffff !important;
  border-bottom-color: rgba(255,255,255,0.1) !important;
}

.dark-mode .dropdown-item:hover {
  background: rgba(255,255,255,0.1) !important;
}

.dark-mode .dropdown-item.logout {
  color: #FF6B6B !important;
}

/* =====================================================
   DARK MODE - LECCIONES ESPECÍFICO (LeccionesView)
   ===================================================== */
.dark-mode .topics-card,
.dark-mode .document-card,
.dark-mode .tutor-card {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
  box-shadow: 0 10px 40px rgba(0,0,0,0.4) !important;
}

.dark-mode .topics-card h2,
.dark-mode .document-header h2,
.dark-mode .tutor-header h2 {
  color: #ffffff !important;
}

.dark-mode .topic-item {
  background: rgba(255,255,255,0.05) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
}

.dark-mode .topic-item:hover {
  background: rgba(255,255,255,0.1) !important;
}

.dark-mode .topic-item.topic-active {
  background: linear-gradient(to right, rgba(102, 126, 234, 0.3), rgba(78, 205, 196, 0.3)) !important;
  border-color: #667eea !important;
}

.dark-mode .topic-title {
  color: #ffffff !important;
}

.dark-mode .topic-level {
  background: rgba(255,255,255,0.1) !important;
  color: #a0aec0 !important;
}

.dark-mode .topic-arrow {
  color: #4ECDC4 !important;
}

.dark-mode .document-content {
  background: linear-gradient(to right, rgba(78, 205, 196, 0.1), rgba(78, 205, 196, 0.05)) !important;
}

.dark-mode .document-content p {
  color: #e0e0e0 !important;
}

.dark-mode .tutor-content {
  background: linear-gradient(to right, rgba(255, 217, 61, 0.1), rgba(255, 165, 0, 0.05)) !important;
}

.dark-mode .summary-content p,
.dark-mode .tutor-content p {
  color: #e0e0e0 !important;
}

.dark-mode .header-description {
  color: #a0aec0 !important;
}

/* =====================================================
   DARK MODE - PRESUPUESTO ESPECÍFICO (PresupuestoView)
   ===================================================== */
.dark-mode .stats-grid .stat-card {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
  box-shadow: 0 10px 40px rgba(0,0,0,0.4) !important;
}

.dark-mode .cost-card.cost-fixed,
.dark-mode .cost-card.cost-variable {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
  box-shadow: 0 10px 40px rgba(0,0,0,0.4) !important;
}

.dark-mode .cost-card .cost-header {
  border-bottom-color: rgba(255,255,255,0.1) !important;
}

.dark-mode .cost-info h2 {
  color: #ffffff !important;
}

.dark-mode .cost-info p {
  color: #a0aec0 !important;
}

.dark-mode .cost-item {
  background: rgba(255,255,255,0.05) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
}

.dark-mode .cost-name {
  color: #ffffff !important;
}

.dark-mode .cost-amount {
  color: #FF6B6B !important;
}

.dark-mode .goal-card {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
  box-shadow: 0 10px 40px rgba(0,0,0,0.4) !important;
}

.dark-mode .goal-header h3 {
  color: #ffffff !important;
}

.dark-mode .goal-value {
  color: #4ECDC4 !important;
}

.dark-mode .goal-description {
  color: #a0aec0 !important;
}

.dark-mode .profit-card {
  /* Mantener gradiente vibrante para la ganancia */
  background: linear-gradient(135deg, #38EF7D 0%, #4ECDC4 100%) !important;
}

.dark-mode .profit-label,
.dark-mode .profit-value {
  color: #ffffff !important;
}

/* =====================================================
   DARK MODE - PRESUPUESTO ESTADÍSTICAS
   ===================================================== */
.dark-mode .presupuesto-container .stat-card {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
}

.dark-mode .presupuesto-container .stat-label {
  color: #a0aec0 !important;
}

.dark-mode .presupuesto-container .stat-value {
  color: #ffffff !important;
}

.dark-mode .presupuesto-container .stat-description {
  color: #7f8c9d !important;
}

/* =====================================================
   DARK MODE - ROI Y MENSAJES PRESUPUESTO
   ===================================================== */
.dark-mode .roi-card {
  background: linear-gradient(135deg, rgba(78, 205, 196, 0.2) 0%, rgba(56, 239, 125, 0.2) 100%) !important;
}

.dark-mode .roi-value {
  color: #4ECDC4 !important;
}

.dark-mode .tip-message,
.dark-mode .feedback-message {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%) !important;
}

.dark-mode .tip-message p,
.dark-mode .feedback-message p {
  color: #e0e0e0 !important;
}

/* =====================================================
   DARK MODE - OVERRIDE UNIVERSAL PARA TODOS LOS FONDOS BLANCOS
   ===================================================== */
/* Selectores universales para tarjetas y contenedores */
.dark-mode [class*="card"],
.dark-mode [class*="Card"],
.dark-mode [class*="section"]:not(.content-wrapper):not(.main-clean):not(.main-with-sidebar),
.dark-mode [class*="panel"],
.dark-mode [class*="container"] > div > div[class*="card"],
.dark-mode [class*="container"] > div > div[class*="Card"] {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
}

/* Excluir elementos que deben mantener su color */
.dark-mode .stat-icon,
.dark-mode .topic-icon,
.dark-mode .document-icon,
.dark-mode .tutor-icon,
.dark-mode .goal-icon,
.dark-mode .cost-icon,
.dark-mode .profit-card,
.dark-mode .level-badge,
.dark-mode .topic-status,
.dark-mode .back-btn,
.dark-mode .back-button,
.dark-mode .add-btn,
.dark-mode .set-btn,
.dark-mode .save-btn,
.dark-mode [class*="btn"]:not(.back-btn),
.dark-mode [class*="button"]:not(.back-button) {
  background: unset;
}

/* Override para textos en cualquier contenedor oscuro */
.dark-mode [class*="card"] h1,
.dark-mode [class*="card"] h2,
.dark-mode [class*="card"] h3,
.dark-mode [class*="Card"] h1,
.dark-mode [class*="Card"] h2,
.dark-mode [class*="Card"] h3,
.dark-mode [class*="section"] h2,
.dark-mode [class*="section"] h3 {
  color: #ffffff !important;
}

.dark-mode [class*="card"] p,
.dark-mode [class*="card"] span:not(.stat-icon):not(.topic-icon):not(.document-icon):not(.tutor-icon),
.dark-mode [class*="Card"] p,
.dark-mode [class*="section"] p:not(.subtitle) {
  color: #a0aec0 !important;
}

/* =====================================================
   DARK MODE - LECCIONES FORZAR
   ===================================================== */
#game-layout-container.dark-mode .topics-card,
#game-layout-container.dark-mode .document-card,
#game-layout-container.dark-mode .tutor-card,
#game-layout-container.dark-mode .page-header {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
  box-shadow: 0 10px 40px rgba(0,0,0,0.4) !important;
}

#game-layout-container.dark-mode .topic-item {
  background: rgba(255,255,255,0.05) !important;
}

#game-layout-container.dark-mode .document-content,
#game-layout-container.dark-mode .tutor-content {
  background: rgba(255,255,255,0.05) !important;
}

/* =====================================================
   DARK MODE - PRESUPUESTO FORZAR
   ===================================================== */
#game-layout-container.dark-mode .cost-card,
#game-layout-container.dark-mode .goal-card,
#game-layout-container.dark-mode .stat-card,
#game-layout-container.dark-mode .right-panel > div,
#game-layout-container.dark-mode .stats-grid > div,
#game-layout-container.dark-mode .content-grid > div {
  background: linear-gradient(135deg, #1e1e3f 0%, #2a2a5a 100%) !important;
  box-shadow: 0 10px 40px rgba(0,0,0,0.4) !important;
}

#game-layout-container.dark-mode .cost-list,
#game-layout-container.dark-mode .cost-item {
  background: rgba(255,255,255,0.05) !important;
}

/* Mantener profit-card con gradiente verde */
#game-layout-container.dark-mode .profit-card {
  background: linear-gradient(135deg, #38EF7D 0%, #4ECDC4 100%) !important;
}
</style>


