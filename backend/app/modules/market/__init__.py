# ==============================================================================
# MÓDULO MARKET - MERCADO/KIOSCO
# ==============================================================================
"""
Módulo del mercado virtual para el juego educativo.

Este módulo maneja:
    - Actualización de precios del mercado
    - Avance de días (simulación de tiempo)
    - Eventos del mercado (ofertas, escasez, etc.)

Estructura del módulo:
    market/
    ├── __init__.py   → Este archivo
    ├── router.py     → Endpoints: /api/mercado/actualizar, /api/mercado/avanzar-dia
    ├── schemas.py    → Modelos de petición/respuesta
    └── service.py    → Lógica de negocio

Endpoints expuestos:
    POST /api/mercado/actualizar    → Obtener precios actualizados
    POST /api/mercado/avanzar-dia  → Avanzar al siguiente día

Mecánicas del mercado:
    - Los precios fluctúan según oferta/demanda simulada
    - Eventos aleatorios afectan los precios
    - Diferentes regiones tienen diferentes productos

Futuras extensiones:
    - GET  /api/mercado/productos  → Lista de productos disponibles
    - GET  /api/mercado/eventos    → Eventos activos
    - POST /api/mercado/comprar    → Comprar producto
    - POST /api/mercado/vender     → Vender producto
"""
