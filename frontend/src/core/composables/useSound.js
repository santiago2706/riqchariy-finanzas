/**
 * useSound — Sistema de sonidos gamificados con Web Audio API
 * No requiere archivos de audio externos, todo se genera programáticamente.
 * Respeta la preferencia de sonido del usuario (localStorage).
 */

let audioCtx = null

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    }
    // Resume if suspended (browsers block autoplay)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume()
    }
    return audioCtx
}

function isSoundEnabled() {
    const saved = localStorage.getItem('soundEnabled')
    // Default: enabled
    return saved !== 'false'
}

/**
 * Reproduce una nota con oscilador
 */
function playTone(frequency, duration = 0.15, type = 'sine', volume = 0.3, delay = 0) {
    if (!isSoundEnabled()) return

    const ctx = getAudioContext()
    const startTime = ctx.currentTime + delay

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = type
    osc.frequency.setValueAtTime(frequency, startTime)

    gain.gain.setValueAtTime(volume, startTime)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(startTime)
    osc.stop(startTime + duration)
}

/**
 * Efectos de sonido disponibles
 */
const sounds = {
    /** 🪙 Compra — tono ascendente tipo moneda */
    coin() {
        playTone(587, 0.08, 'square', 0.2)        // D5
        playTone(784, 0.15, 'square', 0.2, 0.08)   // G5
    },

    /** 💰 Venta — cascada descendente de monedas */
    cash() {
        playTone(880, 0.08, 'square', 0.15)          // A5
        playTone(698, 0.08, 'square', 0.15, 0.08)    // F5
        playTone(587, 0.15, 'square', 0.15, 0.16)    // D5
    },

    /** ✅ Éxito — acorde mayor */
    success() {
        playTone(523, 0.12, 'sine', 0.2)             // C5
        playTone(659, 0.12, 'sine', 0.2, 0.1)        // E5
        playTone(784, 0.2, 'sine', 0.2, 0.2)         // G5
    },

    /** ❌ Error — tono grave */
    error() {
        playTone(200, 0.15, 'sawtooth', 0.15)
        playTone(150, 0.2, 'sawtooth', 0.15, 0.12)
    },

    /** ⚠️ Warning — dos tonos de alerta */
    warning() {
        playTone(440, 0.1, 'triangle', 0.2)          // A4
        playTone(440, 0.1, 'triangle', 0.2, 0.15)    // A4 repeat
    },

    /** 📊 Transición / avanzar día — barrido suave */
    transition() {
        playTone(330, 0.1, 'sine', 0.15)             // E4
        playTone(440, 0.1, 'sine', 0.15, 0.08)       // A4
        playTone(554, 0.1, 'sine', 0.15, 0.16)       // C#5
        playTone(659, 0.15, 'sine', 0.15, 0.24)      // E5
    },

    /** 🔘 Clic sutil — para toggle o interacciones menores */
    click() {
        playTone(600, 0.05, 'sine', 0.1)
    },

    /** ℹ️ Notificación info — chime suave */
    notify() {
        playTone(880, 0.1, 'sine', 0.12)             // A5
        playTone(1108, 0.15, 'sine', 0.12, 0.08)     // C#6
    },
}

export function useSound() {
    return {
        play: (name) => {
            if (sounds[name]) {
                sounds[name]()
            }
        },
        ...sounds,
        isEnabled: isSoundEnabled,
    }
}
