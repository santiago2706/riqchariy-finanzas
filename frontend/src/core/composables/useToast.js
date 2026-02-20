import { reactive } from 'vue'

/**
 * Sistema global de notificaciones toast.
 * Uso: const toast = useToast()
 *      toast.success('¡Producto comprado!')
 *      toast.error('Saldo insuficiente')
 *      toast.info('Modo oscuro activado')
 *      toast.warning('Estás gastando de más')
 */

// Estado reactivo global (singleton)
const toasts = reactive([])
let toastId = 0

function addToast(message, type = 'info', duration = 3000) {
    const id = ++toastId
    const toast = { id, message, type, visible: true }

    toasts.push(toast)

    // Máximo 3 toasts visibles — eliminar el más antiguo
    if (toasts.length > 3) {
        toasts.shift()
    }

    // Auto-remover después de la duración
    setTimeout(() => {
        removeToast(id)
    }, duration)

    return id
}

function removeToast(id) {
    const index = toasts.findIndex(t => t.id === id)
    if (index > -1) {
        toasts.splice(index, 1)
    }
}

export function useToast() {
    return {
        toasts,
        success: (message, duration) => addToast(message, 'success', duration),
        error: (message, duration) => addToast(message, 'error', duration),
        info: (message, duration) => addToast(message, 'info', duration),
        warning: (message, duration) => addToast(message, 'warning', duration),
        remove: removeToast,
    }
}
