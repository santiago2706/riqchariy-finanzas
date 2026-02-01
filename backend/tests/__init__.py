# ==============================================================================
# PAQUETE TESTS - PRUEBAS UNITARIAS
# ==============================================================================
"""
Este paquete contiene las pruebas unitarias del backend.

Estructura sugerida:
    tests/
    ├── __init__.py        → Este archivo
    ├── conftest.py        → Fixtures de pytest (próximo paso)
    ├── test_main.py       → Pruebas de endpoints base
    ├── test_auth.py       → Pruebas de autenticación
    ├── test_game.py       → Pruebas del juego
    ├── test_market.py     → Pruebas del mercado
    └── test_chatbot.py    → Pruebas del chatbot

Ejecutar pruebas:
    # Instalar pytest primero
    pip install pytest pytest-asyncio httpx
    
    # Ejecutar todas las pruebas
    pytest
    
    # Ejecutar con verbose
    pytest -v
    
    # Ejecutar un archivo específico
    pytest tests/test_auth.py

Convenciones:
    - Nombres de archivo: test_*.py
    - Nombres de función: test_*
    - Usar fixtures para setup común
"""
