# 🚀 Propuestas de Mejora — Frontend Riqch'ariy

**Fecha:** 20 de febrero de 2026  
**Autor:** Equipo de Desarrollo  
**Estado actual:** El frontend cuenta con Dashboard gamificado, Chatbot (Pato), Módulo de Lecciones, Tiendita Virtual (Kiosco), Módulo de Presupuesto, dark mode y sistema de logros.

---

## Resumen

Este documento presenta 13 propuestas de mejora organizadas por prioridad. Cada propuesta incluye descripción, beneficio esperado, complejidad estimada y archivos que se verían afectados.

---

## 🔥 Prioridad Alta — UX / Funcionalidad

### 1. Sistema de Notificaciones (Toasts)

| Campo | Detalle |
|-------|---------|
| **Problema** | Las acciones del usuario (comprar, vender, añadir costos, logros) no brindan feedback visual claro |
| **Propuesta** | Implementar un sistema de toasts animados (éxito ✅, error ❌, info ℹ️) que aparezcan brevemente en pantalla |
| **Beneficio** | Mejora significativa en la experiencia de usuario; el estudiante sabe que su acción fue exitosa |
| **Complejidad** | 🟢 Baja (1-2 días) |
| **Archivos** | Nuevo componente `ToastNotification.vue`, composable `useToast.js`, integrar en stores |

---

### 2. Onboarding Interactivo para Nuevos Usuarios

| Campo | Detalle |
|-------|---------|
| **Problema** | Los estudiantes nuevos no saben por dónde empezar ni qué hace cada módulo |
| **Propuesta** | Tutorial paso a paso con tooltips iluminados (spotlight) que guíe al estudiante por Dashboard → Lecciones → Kiosco → Presupuesto |
| **Beneficio** | Reduce la curva de aprendizaje; aumenta la retención de usuarios nuevos |
| **Complejidad** | 🟡 Media (3-4 días) |
| **Archivos** | Nuevo componente `OnboardingOverlay.vue`, `useOnboarding.js`, modificar `DashboardView.vue` |
| **Referencia** | Librería sugerida: [driver.js](https://driverjs.com/) (ligera, sin dependencias) |

---

### 3. Sonidos y Efectos de Gamificación

| Campo | Detalle |
|-------|---------|
| **Problema** | La app es gamificada pero silenciosa; falta inmersión |
| **Propuesta** | Agregar efectos de sonido sutiles: al comprar/vender (caja registradora 🔔), al subir de nivel (fanfarria 🎺), al completar lección (campana ✨), al recibir monedas (coin drop 🪙) |
| **Beneficio** | Mayor engagement y sensación de logro; la gamificación se siente más real |
| **Complejidad** | 🟢 Baja (1-2 días) |
| **Archivos** | Nuevo composable `useSound.js`, carpeta `assets/sounds/`, integrar en stores del kiosco y logros |
| **Nota** | Incluir toggle para silenciar en Configuración |

---

### 4. Transiciones Animadas entre Páginas

| Campo | Detalle |
|-------|---------|
| **Problema** | Al navegar entre módulos el cambio es abrupto (sin animación) |
| **Propuesta** | Agregar `<Transition>` al `<router-view>` en `GameLayout.vue` con efecto fade + slide sutil |
| **Beneficio** | La navegación se siente más fluida y profesional |
| **Complejidad** | 🟢 Baja (medio día) |
| **Archivos** | `GameLayout.vue`, `main.css` (clases de transición) |

---

## 🎮 Prioridad Media — Gamificación

### 5. Tabla de Clasificación (Leaderboard)

| Campo | Detalle |
|-------|---------|
| **Problema** | No hay competencia social entre estudiantes; falta motivación por comparación |
| **Propuesta** | Ranking por aula mostrando: posición, nombre, nivel, monedas, logros desbloqueados. Top 3 con medallas 🥇🥈🥉 |
| **Beneficio** | Competencia sana que motiva a los estudiantes a avanzar más |
| **Complejidad** | 🟡 Media (3-4 días) |
| **Archivos** | Nueva vista `LeaderboardView.vue`, endpoint API, ruta en `router/index.js` |
| **Requiere** | Endpoint backend que devuelva ranking por aula/colegio |

---

### 6. Sistema de Rachas (Streaks) 🔥

| Campo | Detalle |
|-------|---------|
| **Problema** | No hay incentivo para el uso diario de la plataforma |
| **Propuesta** | Contador de días consecutivos de uso. Mostrar en el Dashboard: *"🔥 Llevas 5 días seguidos aprendiendo"*. Bonificación de monedas al alcanzar rachas (3, 7, 14, 30 días) |
| **Beneficio** | Aumenta la retención diaria; hábito de estudio |
| **Complejidad** | 🟡 Media (2-3 días) |
| **Archivos** | Nuevo componente `StreakBadge.vue`, lógica en `useAuthStore.js`, campo en BD de usuario |
| **Requiere** | Campo `last_login_date` y `current_streak` en la tabla de usuarios |

---

### 7. Misiones Diarias / Semanales

| Campo | Detalle |
|-------|---------|
| **Problema** | El estudiante no tiene objetivos claros del día |
| **Propuesta** | Panel de misiones con tareas como: *"Completa 1 lección"* (+10 🪙), *"Vende 3 productos"* (+15 🪙), *"Ahorra S/50 en presupuesto"* (+20 🪙). Reseteo diario automático |
| **Beneficio** | Dirección clara para el estudiante; motivación por recompensas concretas |
| **Complejidad** | 🔴 Alta (5-7 días) |
| **Archivos** | Nueva vista/componente `DailyMissions.vue`, store `useMissionsStore.js`, endpoint API |
| **Requiere** | Diseño de misiones por nivel, backend para tracking de progreso |

---

## 🎨 Prioridad Media — Pulir Visual

### 8. Skeleton Loaders

| Campo | Detalle |
|-------|---------|
| **Problema** | Los spinners de carga se sienten genéricos y anticuados |
| **Propuesta** | Reemplazar spinners con skeleton loaders (bloques grises animados que imitan la forma del contenido). Aplicar en: Dashboard, Kiosco, Lecciones |
| **Beneficio** | Percepción de carga más rápida; se ve más profesional |
| **Complejidad** | 🟢 Baja (1-2 días) |
| **Archivos** | Nuevo componente `SkeletonLoader.vue`, variantes para cards, listas, stats |

---

### 9. Animaciones de Celebración (Confeti)

| Campo | Detalle |
|-------|---------|
| **Problema** | Desbloquear logros o subir de nivel pasa desapercibido |
| **Propuesta** | Animación de confeti/partículas al: subir de nivel, desbloquear logro, completar todas las lecciones de un nivel |
| **Beneficio** | Momento de celebración que refuerza el logro; mayor satisfacción |
| **Complejidad** | 🟢 Baja (1 día) |
| **Archivos** | Nuevo componente `ConfettiEffect.vue` |
| **Referencia** | Librería: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) (3KB) |

---

### 10. Mejora de Responsividad Mobile

| Campo | Detalle |
|-------|---------|
| **Problema** | Las vistas de Kiosco y Presupuesto no están completamente optimizadas para celular |
| **Propuesta** | Revisar y optimizar breakpoints, tamaños de fuente, grids y touch targets en todas las vistas del juego |
| **Beneficio** | Mejor experiencia en dispositivos móviles (principal dispositivo de los estudiantes) |
| **Complejidad** | 🟡 Media (2-3 días) |
| **Archivos** | `KioscoView.vue`, `PresupuestoView.vue`, `LeccionesView.vue`, `DashboardView.vue` |

---

## 🛠️ Prioridad Baja — Técnico / Calidad

### 11. Composable Centralizado de Loading

| Campo | Detalle |
|-------|---------|
| **Problema** | Cada store maneja su propio `isLoading` de forma diferente |
| **Propuesta** | Crear `useLoading()` composable reutilizable que encapsule estados de carga, timeouts y errores |
| **Beneficio** | Código más limpio y consistente; menos bugs de estado |
| **Complejidad** | 🟢 Baja (1 día) |

---

### 12. Error Handling Global con Interceptor Axios

| Campo | Detalle |
|-------|---------|
| **Problema** | Los errores de API fallan silenciosamente o muestran mensajes técnicos |
| **Propuesta** | Interceptor en `apiClient.js` que capture errores y muestre mensajes amigables. Manejar: 401 (sesión expirada), 500 (error del servidor), timeout (sin conexión) |
| **Beneficio** | El usuario siempre sabe qué pasó; menos confusión |
| **Complejidad** | 🟢 Baja (1 día) |
| **Archivos** | `apiClient.js`, integrar con sistema de Toasts (#1) |

---

### 13. PWA (Progressive Web App)

| Campo | Detalle |
|-------|---------|
| **Problema** | Los estudiantes deben abrir el navegador cada vez; no funciona sin internet |
| **Propuesta** | Convertir la app en PWA: icono en el celular, splash screen, cache offline para lecciones ya visitadas |
| **Beneficio** | Acceso tipo app nativa; funciona en zonas con internet limitado (colegios rurales) |
| **Complejidad** | 🟡 Media (3-4 días) |
| **Archivos** | `vite.config.js` (plugin vite-pwa), `manifest.json`, service worker |
| **Referencia** | Plugin: [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) |

---

## Roadmap Sugerido

```
Semana 1  →  #1 Toasts + #4 Transiciones + #8 Skeletons
Semana 2  →  #3 Sonidos + #9 Confeti + #12 Error Handling
Semana 3  →  #2 Onboarding + #6 Rachas
Semana 4  →  #5 Leaderboard + #10 Responsive
Futuro    →  #7 Misiones + #13 PWA + #11 Loading
```

---

> **Nota:** Cada propuesta es independiente y puede implementarse por separado. Se recomienda priorizar las de **alto impacto y baja complejidad** (#1, #3, #4) para resultados rápidos.
