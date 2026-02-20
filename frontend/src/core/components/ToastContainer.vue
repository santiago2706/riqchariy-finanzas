<script setup>
import { useToast } from '@/core/composables/useToast'

const { toasts, remove } = useToast()

const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
}
</script>

<template>
    <div class="toast-container" aria-live="polite">
        <TransitionGroup name="toast">
            <div
                v-for="toast in toasts"
                :key="toast.id"
                :class="['toast-item', `toast-${toast.type}`]"
            >
                <span class="toast-icon">{{ icons[toast.type] }}</span>
                <span class="toast-message">{{ toast.message }}</span>
                <button class="toast-close" @click="remove(toast.id)" aria-label="Cerrar">×</button>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.toast-container {
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    pointer-events: none;
}

.toast-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1.2rem;
    border-radius: 14px;
    min-width: 280px;
    max-width: 400px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    pointer-events: auto;
    font-weight: 600;
    font-size: 0.9rem;
    backdrop-filter: blur(10px);
}

/* --- Tipos --- */
.toast-success {
    background: linear-gradient(135deg, #d4edda, #c3f0c8);
    color: #155724;
    border-left: 4px solid #28a745;
}

.toast-error {
    background: linear-gradient(135deg, #f8d7da, #f5c6cb);
    color: #721c24;
    border-left: 4px solid #dc3545;
}

.toast-info {
    background: linear-gradient(135deg, #d1ecf1, #bee5eb);
    color: #0c5460;
    border-left: 4px solid #17a2b8;
}

.toast-warning {
    background: linear-gradient(135deg, #fff3cd, #ffeeba);
    color: #856404;
    border-left: 4px solid #ffc107;
}

.toast-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
}

.toast-message {
    flex: 1;
    line-height: 1.3;
}

.toast-close {
    background: none;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s;
    padding: 0 0.2rem;
    line-height: 1;
    color: inherit;
}

.toast-close:hover {
    opacity: 1;
}

/* --- Animaciones --- */
.toast-enter-active {
    transition: all 0.35s cubic-bezier(0.21, 1.02, 0.73, 1);
}

.toast-leave-active {
    transition: all 0.25s ease-in;
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(80px) scale(0.9);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(80px) scale(0.9);
}

.toast-move {
    transition: transform 0.3s ease;
}

/* --- Responsive --- */
@media (max-width: 480px) {
    .toast-container {
        top: auto;
        bottom: 80px;
        right: 10px;
        left: 10px;
    }

    .toast-item {
        min-width: auto;
        max-width: 100%;
    }
}
</style>
