# ==============================================================================
# MÓDULO GAME - ESTADO DEL JUEGO
# ==============================================================================
"""
Módulo de gestión del estado del juego educativo.

Este módulo maneja:
    - Guardar progreso del juego
    - Cargar partida guardada
    - Gestión del inventario y saldo

Estructura del módulo:
    game/
    ├── __init__.py   → Este archivo
    ├── router.py     → Endpoints: /api/game/save, /api/game/load
    ├── schemas.py    → Modelos de petición/respuesta
    └── service.py    → Lógica de negocio

Endpoints expuestos:
    POST /api/game/save  → Guardar estado actual del juego
    GET  /api/game/load  → Cargar estado guardado

Datos que se guardan:
    - saldo: Dinero disponible del jugador
    - inventario: Lista de productos comprados
    - day: Día actual del juego (progresión)

Futuras extensiones:
    - GET  /api/game/history   → Historial de partidas
    - POST /api/game/reset     → Reiniciar partida
    - GET  /api/game/stats     → Estadísticas del jugador
"""
