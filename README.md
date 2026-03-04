# 📌 RIQCHARIY-FINANZAS

**Plataforma de educación financiera gamificada con simulación real.**

## 📖 Visión General
Riqchariy-Finanzas es una plataforma web educativa que enseña finanzas personales y toma de decisiones económicas reales mediante una experiencia interactiva basada en:
* 🎮 **Minijuegos interactivos**
* 📊 **Simuladores financieros realistas**
* 🤖 **IA que adapta el aprendizaje al usuario**

El proyecto tiene un enfoque educativo, social y escalable, diseñado para generar un impacto real en la forma en que los jóvenes gestionan su dinero.

---

## 🛠️ Stack Tecnológico

### **Frontend**
* **Framework:** Vue 3 o React
* **UI:** TailwindCSS
* **Estado:** Pinia / Redux
* **Motor de Minijuegos:** **Phaser.js** (Elegido para el MVP por ser rápido, liviano y web-first)

### **Backend & Datos (En desarrollo ⚙️)**
* **Entorno:** Node.js + NestJS / Express
* **Base de Datos:** PostgreSQL
* **Autenticación:** JWT / Firebase Auth

---

## 🧱 Arquitectura del Sistema
El sistema utiliza una **arquitectura modular** para garantizar la escalabilidad:

1. **Dashboard del Usuario:** Panel principal para seguimiento de progreso y métricas.
2. **Contenedor de Minijuegos:** Integración mediante **iFrames** para permitir el desarrollo y carga independiente de cada juego.
3. **Simulador Central:** Motor de cálculo que procesa variables como ingresos, inflación, ahorro y deudas.

---

## 🎮 Núcleo de Minijuegos (MVP)
Los minijuegos están diseñados para sesiones de 5 a 10 minutos con feedback inmediato:

* **Presupuesto Mensual:** Gestión de ingresos vs. gastos ante eventos inesperados.
* **Ahorro e Inversión:** Toma de decisiones sobre riesgo, tiempo y diversificación.
* **Crédito y Deuda:** Manejo responsable de tarjetas y préstamos.

---

## 🚀 Estado Actual y Próximos Pasos
* **Frontend:** Estructura base y selección de motor de juegos definida.
* **Backend:** Actualmente en fase de construcción (APIs de usuario, progreso y lógica de simulación).
* **IA:** Planificada para fases posteriores para la detección de patrones de error y ajuste de dificultad.

---

> **Nota:** Este repositorio se encuentra en desarrollo activo. Las funcionalidades de persistencia de datos y rankings globales se habilitarán tras completar el módulo de Backend.
