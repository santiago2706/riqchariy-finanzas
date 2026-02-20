<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// --- ESTADO DE LA APLICACIÓN ---

// Lista estática de todas las lecciones disponibles (de la Versión 2)
const lessons = ref([
    { id: 1, title: 'Ganancia, Gasto y Pérdida', level: 'Semilla', status: 'Activo', icon: '💰', content: 'La Ganancia es cuando te entra más dinero del que gastas. El Gasto es todo el dinero que sale. La Pérdida ocurre cuando el gasto es mayor que la ganancia. Ejemplo: Si vendes 5 soles y compras 7 soles en caramelos, tienes una pérdida de 2 soles.' },
    { id: 2, title: 'El Riesgo Inesperado', level: 'Brote', status: 'Inicia', icon: '⚠️', content: 'El fondo de emergencia es crucial. Sin él, un gasto inesperado puede llevarte a la quiebra. Analizaremos escenarios de riesgo.' },
    { id: 3, title: 'La Competencia', level: 'Semilla', status: 'Completado', icon: '🏆', content: 'Foco pedagógico: La oferta y la demanda. Entiende cómo los precios de tus productos se ven afectados por lo que venden otros.' },
    { id: 4, title: 'Interés Compuesto', level: 'Árbol', status: 'Pendiente', icon: '📈', content: 'El interés compuesto es la octava maravilla del mundo. Aprende a usarlo para que tu dinero crezca exponencialmente a lo largo del tiempo.' },
]);

// La lección seleccionada actualmente (Inicialmente la primera)
const activeTopic = ref(lessons.value[0]);

// Estado para el resumen IA
const iaSummary = ref('Generando resumen...');
const isLoading = ref(true);

// --- LÓGICA DE INTERACCIÓN ---

// 1. Simulación de la función de la IA (Backend) para resumir el documento
const fetchSummaryFromIA = async (content) => {
    isLoading.value = true;
    // Simulación de la llamada a la API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulación de la respuesta de la IA (adaptada al contenido actual)
    const summary = `**Resumen de Pato:** Para el nivel **${activeTopic.value.level}**, la lección sobre "${activeTopic.value.title}" enfatiza: ${content.substring(0, 80)}... La clave es la disciplina en el ahorro y la inversión.`;

    isLoading.value = false;
    return summary;
};

// Función para cambiar la lección activa
const selectLesson = async (lesson) => {
    activeTopic.value = lesson;
    iaSummary.value = await fetchSummaryFromIA(lesson.content);
};

// Función para volver al dashboard
const goToDashboard = () => {
    router.push({ name: 'dashboard' });
};

// Obten el color del estado
const getStatusColor = (status) => {
    const colors = {
        'Activo': 'status-active',
        'Inicia': 'status-start',
        'Completado': 'status-completed',
        'Pendiente': 'status-pending'
    };
    return colors[status] || 'status-pending';
};

// --- CICLO DE VIDA ---
onMounted(async () => {
    // Generar el resumen para la lección activa inicial al cargar
    iaSummary.value = await fetchSummaryFromIA(activeTopic.value.content);
});
</script>

<template>
    <div class="lecciones-container">
        <!-- Header Section -->
        <div class="page-header">
            <button class="back-button" @click="goToDashboard">
                ← Volver al Dashboard
            </button>
            <div class="header-content">
                <h1>📚 Catálogo de Lecciones</h1>
                <p class="subtitle">Nivel: <span class="level-badge">{{ activeTopic.level }}</span></p>
            </div>
            <p class="header-description">
                Aquí podrás acceder al contenido interactivo adaptado a tu Nivel, directamente desde la base de datos de lecciones.
            </p>
        </div>

        <div class="content-grid">
            <!-- Temas Disponibles -->
            <div class="topics-card">
                <h2>📖 Temas Disponibles</h2>
                <div class="topics-list">
                    <div 
                        v-for="lesson in lessons" 
                        :key="lesson.id"
                        @click="selectLesson(lesson)"
                        :class="['topic-item', { 'topic-active': lesson.id === activeTopic.id }]"
                    >
                        <div class="topic-icon">{{ lesson.icon }}</div>
                        <div class="topic-info">
                            <p class="topic-title">{{ lesson.title }}</p>
                            <div class="topic-meta">
                                <span class="topic-level">{{ lesson.level }}</span>
                                <span :class="['topic-status', getStatusColor(lesson.status)]">
                                    {{ lesson.status }}
                                </span>
                            </div>
                        </div>
                        <div class="topic-arrow">→</div>
                    </div>
                </div>
            </div>

            <!-- Contenido Principal -->
            <div class="main-content">
                <!-- Documento -->
                <div class="document-card">
                    <div class="document-header">
                        <span class="document-icon">📄</span>
                        <h2>Documento: {{ activeTopic.title }}</h2>
                    </div>
                    <div class="document-content">
                        <p>{{ activeTopic.content }}</p>
                    </div>
                </div>

                <!-- Tutor IA -->
                <div class="tutor-card">
                    <div class="tutor-header">
                        <span class="tutor-icon">🤖</span>
                        <h2>Tutor Pato: Resumen IA</h2>
                    </div>
                    <div class="tutor-content">
                        <div v-if="isLoading" class="loading-state">
                            <div class="loading-spinner"></div>
                            <span>Generando resumen...</span>
                        </div>
                        <div v-else class="summary-content">
                            <p v-html="iaSummary"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.lecciones-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header */
.page-header {
    background: white;
    border-radius: 30px;
    padding: 2rem 2.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    position: relative;
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
    transition: all 0.3s;
    font-size: 0.9rem;
}

.back-button:hover {
    transform: translateX(-5px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.header-content {
    text-align: center;
    margin-top: 1rem;
}

.page-header h1 {
    font-size: 2.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #4ECDC4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
    font-weight: 900;
}

.subtitle {
    font-size: 1.1rem;
    color: #7f8c8d;
    margin-bottom: 0.5rem;
}

.level-badge {
    background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
    color: white;
    padding: 0.3rem 1rem;
    border-radius: 20px;
    font-weight: 700;
}

.header-description {
    text-align: center;
    color: #7f8c8d;
    font-size: 1rem;
    max-width: 700px;
    margin: 1rem auto 0;
}

/* Content Grid */
.content-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
}

/* Topics Card */
.topics-card {
    background: white;
    border-radius: 25px;
    padding: 2rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    height: fit-content;
}

.topics-card h2 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-weight: 800;
}

.topics-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.topic-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: linear-gradient(to right, #f8f9fa, #fff);
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s;
    border: 2px solid transparent;
}

.topic-item:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.topic-item.topic-active {
    background: linear-gradient(to right, #e8f4ff, #e0f7f5);
    border-color: #667eea;
}

.topic-icon {
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    flex-shrink: 0;
}

.topic-info {
    flex: 1;
}

.topic-title {
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.3rem;
    font-size: 0.95rem;
}

.topic-meta {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.topic-level {
    font-size: 0.75rem;
    color: #7f8c8d;
    background: #f0f0f0;
    padding: 0.2rem 0.5rem;
    border-radius: 8px;
}

.topic-status {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
    border-radius: 10px;
    font-weight: 600;
}

.status-active {
    background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
    color: white;
}

.status-start {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.status-completed {
    background: linear-gradient(135deg, #a8a8a8 0%, #6b6b6b 100%);
    color: white;
}

.status-pending {
    background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
    color: white;
}

.topic-arrow {
    font-size: 1.2rem;
    color: #667eea;
    opacity: 0;
    transition: opacity 0.3s;
}

.topic-item:hover .topic-arrow,
.topic-item.topic-active .topic-arrow {
    opacity: 1;
}

/* Main Content */
.main-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

/* Document Card */
.document-card {
    background: white;
    border-radius: 25px;
    padding: 2rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    border-top: 4px solid #4ECDC4;
}

.document-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
}

.document-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #4ECDC4 0%, #38EF7D 100%);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.document-header h2 {
    font-size: 1.4rem;
    color: #2c3e50;
    font-weight: 800;
}

.document-content {
    background: linear-gradient(to right, #e0f7f5, #f0fff0);
    padding: 1.5rem;
    border-radius: 15px;
}

.document-content p {
    color: #2c3e50;
    font-size: 1rem;
    line-height: 1.7;
}

/* Tutor Card */
.tutor-card {
    background: white;
    border-radius: 25px;
    padding: 2rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    border-top: 4px solid #FFD93D;
}

.tutor-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
}

.tutor-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.tutor-header h2 {
    font-size: 1.4rem;
    color: #2c3e50;
    font-weight: 800;
}

.tutor-content {
    background: linear-gradient(to right, #fff9e6, #fff5cc);
    padding: 1.5rem;
    border-radius: 15px;
}

.loading-state {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #FFA500;
    font-weight: 600;
}

.loading-spinner {
    width: 24px;
    height: 24px;
    border: 3px solid #FFE8CC;
    border-top-color: #FFA500;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.summary-content p {
    color: #2c3e50;
    font-size: 1rem;
    line-height: 1.7;
}

/* Responsive */
@media (max-width: 1024px) {
    .content-grid {
        grid-template-columns: 1fr;
    }
    
    .topics-card {
        order: 2;
    }
    
    .main-content {
        order: 1;
    }
}

@media (max-width: 768px) {
    .lecciones-container {
        padding: 1rem;
    }
    
    .page-header {
        padding: 1.5rem;
        padding-top: 4rem;
    }
    
    .page-header h1 {
        font-size: 1.8rem;
    }
    
    .back-button {
        top: 1rem;
        left: 1rem;
        font-size: 0.8rem;
        padding: 0.5rem 1rem;
    }
}
</style>
