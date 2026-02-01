# ==============================================================================
# ROUTER.PY - ENDPOINTS DE AUTENTICACIÓN
# ==============================================================================
"""
Este archivo define los endpoints HTTP para autenticación.

Endpoints:
    POST /auth/login     → Autenticar usuario existente
    POST /auth/register  → Registrar nuevo usuario

Uso:
    Este router se registra en main.py:
    app.include_router(auth_router, prefix="/auth", tags=["Autenticación"])

Flujo de login:
    1. Frontend envía email y password
    2. Backend verifica credenciales
    3. Si son correctas, genera token JWT
    4. Frontend almacena token en localStorage
    5. Frontend envía token en cada petición

Flujo de registro:
    1. Frontend envía datos del usuario
    2. Backend valida datos únicos (email)
    3. Backend hashea la contraseña
    4. Backend crea el usuario
    5. Backend genera token JWT
    6. Usuario queda autenticado automáticamente
"""

from fastapi import APIRouter, Depends, HTTPException, status

# TODO: Importar cuando estén listos
# from app.modules.auth.schemas import (
#     LoginRequest,
#     RegisterRequest,
#     AuthResponse,
# )
# from app.modules.auth.service import AuthService


# ==============================================================================
# CREAR ROUTER
# ==============================================================================
router = APIRouter()


# ==============================================================================
# ENDPOINT: LOGIN
# ==============================================================================
@router.post("/login")
async def login(
    # request: LoginRequest  # TODO: Descomentar cuando schemas esté listo
):
    """
    Autenticar un usuario existente.
    
    Request body:
        {
            "gmail": "usuario@ejemplo.com",
            "password": "contraseña123"
        }
    
    Response exitoso (200):
        {
            "success": true,
            "user": {
                "id": "123",
                "name": "Juan",
                "email": "usuario@ejemplo.com",
                "region": "Lima"
            },
            "token": "eyJhbGciOiJIUzI1NiIs...",
            "message": "Login exitoso"
        }
    
    Response error (401):
        {
            "detail": "Credenciales incorrectas"
        }
    """
    # TODO: Implementar lógica de login
    # 1. Buscar usuario por email
    # 2. Verificar contraseña
    # 3. Generar token JWT
    # 4. Retornar respuesta
    
    return {
        "success": False,
        "message": "Endpoint pendiente de implementación"
    }


# ==============================================================================
# ENDPOINT: REGISTER
# ==============================================================================
@router.post("/register")
async def register(
    # request: RegisterRequest  # TODO: Descomentar cuando schemas esté listo
):
    """
    Registrar un nuevo usuario.
    
    Request body:
        {
            "name": "Juan Pérez",
            "gmail": "usuario@ejemplo.com",
            "password": "contraseña123",
            "region": "Lima"
        }
    
    Response exitoso (201):
        {
            "success": true,
            "user": {
                "id": "123",
                "name": "Juan Pérez",
                "email": "usuario@ejemplo.com",
                "region": "Lima"
            },
            "token": "eyJhbGciOiJIUzI1NiIs...",
            "message": "Registro exitoso"
        }
    
    Response error (409):
        {
            "detail": "Este email ya está registrado"
        }
    """
    # TODO: Implementar lógica de registro
    # 1. Verificar que email no existe
    # 2. Hashear contraseña
    # 3. Crear usuario en BD
    # 4. Generar token JWT
    # 5. Retornar respuesta
    
    return {
        "success": False,
        "message": "Endpoint pendiente de implementación"
    }
