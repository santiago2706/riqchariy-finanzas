# ==============================================================================
# MÓDULO AUTH - AUTENTICACIÓN
# ==============================================================================
"""
Módulo de autenticación para Riqchariy Finanzas.

Este módulo maneja:
    - Login de usuarios
    - Registro de nuevos usuarios
    - Gestión de tokens JWT

Estructura del módulo:
    auth/
    ├── __init__.py   → Este archivo
    ├── router.py     → Endpoints: /auth/login, /auth/register
    ├── schemas.py    → Modelos de petición/respuesta
    └── service.py    → Lógica de negocio

Endpoints expuestos:
    POST /auth/login     → Autenticar usuario
    POST /auth/register  → Registrar nuevo usuario

Futuras extensiones:
    - POST /auth/refresh   → Refrescar token
    - POST /auth/logout    → Cerrar sesión
    - POST /auth/forgot    → Recuperar contraseña
    - GET  /auth/me        → Obtener perfil actual
"""
