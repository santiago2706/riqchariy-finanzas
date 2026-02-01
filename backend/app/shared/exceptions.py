# ==============================================================================
# EXCEPTIONS.PY - EXCEPCIONES HTTP PERSONALIZADAS
# ==============================================================================
"""
Este archivo contiene excepciones HTTP personalizadas para la API.

¿Por qué usar excepciones personalizadas?
    1. Mensajes de error consistentes en toda la API
    2. Código más legible y mantenible
    3. Fácil de cambiar mensajes globalmente
    4. Mejor experiencia para el frontend

Uso:
    from app.shared.exceptions import NotFoundException, UnauthorizedException
    
    # En un service o router:
    if not user:
        raise NotFoundException(detail="Usuario no encontrado")

Códigos HTTP comunes:
    - 400 Bad Request:     Datos de entrada inválidos
    - 401 Unauthorized:    No autenticado
    - 403 Forbidden:       Sin permisos
    - 404 Not Found:       Recurso no existe
    - 409 Conflict:        Conflicto (ej: email ya registrado)
    - 422 Unprocessable:   Error de validación (automático de Pydantic)
    - 500 Internal Error:  Error del servidor
"""

from fastapi import HTTPException, status


# ==============================================================================
# EXCEPCIONES DE AUTENTICACIÓN (4xx)
# ==============================================================================

class UnauthorizedException(HTTPException):
    """
    Error 401: Usuario no autenticado.
    
    Usar cuando:
        - No hay token JWT en el header
        - El token es inválido o expirado
        - Las credenciales de login son incorrectas
    
    Ejemplo:
        if not verify_password(password, user.hashed_password):
            raise UnauthorizedException(detail="Contraseña incorrecta")
    """
    def __init__(self, detail: str = "No autenticado"):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={"WWW-Authenticate": "Bearer"},
        )


class ForbiddenException(HTTPException):
    """
    Error 403: Usuario autenticado pero sin permisos.
    
    Usar cuando:
        - El usuario no tiene rol necesario
        - Intenta acceder a recursos de otro usuario
        - Acción no permitida para su nivel
    
    Ejemplo:
        if user.role != "admin":
            raise ForbiddenException(detail="Solo administradores")
    """
    def __init__(self, detail: str = "Acceso denegado"):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=detail,
        )


# ==============================================================================
# EXCEPCIONES DE RECURSOS (4xx)
# ==============================================================================

class NotFoundException(HTTPException):
    """
    Error 404: Recurso no encontrado.
    
    Usar cuando:
        - El ID solicitado no existe en BD
        - El archivo o recurso no se encuentra
        - La ruta es válida pero el recurso no existe
    
    Ejemplo:
        user = await get_user_by_id(user_id)
        if not user:
            raise NotFoundException(detail=f"Usuario {user_id} no encontrado")
    """
    def __init__(self, detail: str = "Recurso no encontrado"):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=detail,
        )


class BadRequestException(HTTPException):
    """
    Error 400: Petición inválida.
    
    Usar cuando:
        - Los datos de entrada son incorrectos
        - Falta información requerida
        - Formato de datos incorrecto
    
    Nota: Para validación de schemas usar Pydantic (422 automático)
    
    Ejemplo:
        if amount <= 0:
            raise BadRequestException(detail="El monto debe ser positivo")
    """
    def __init__(self, detail: str = "Petición inválida"):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
        )


class ConflictException(HTTPException):
    """
    Error 409: Conflicto con estado actual.
    
    Usar cuando:
        - Email ya registrado
        - Username ya existe
        - Recurso duplicado
    
    Ejemplo:
        existing_user = await get_user_by_email(email)
        if existing_user:
            raise ConflictException(detail="Este email ya está registrado")
    """
    def __init__(self, detail: str = "Conflicto con recurso existente"):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=detail,
        )


# ==============================================================================
# EXCEPCIONES DE SERVIDOR (5xx)
# ==============================================================================

class InternalServerException(HTTPException):
    """
    Error 500: Error interno del servidor.
    
    Usar cuando:
        - Falla conexión a BD
        - Error inesperado en procesamiento
        - Falla servicio externo crítico
    
    Nota: En producción, no exponer detalles técnicos al usuario
    
    Ejemplo:
        try:
            result = await external_api_call()
        except Exception as e:
            logger.error(f"Error API externa: {e}")
            raise InternalServerException(detail="Error al procesar la solicitud")
    """
    def __init__(self, detail: str = "Error interno del servidor"):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=detail,
        )


class ServiceUnavailableException(HTTPException):
    """
    Error 503: Servicio no disponible.
    
    Usar cuando:
        - Servicio en mantenimiento
        - BD no disponible temporalmente
        - Sobrecarga del sistema
    
    Ejemplo:
        if not is_database_connected():
            raise ServiceUnavailableException(
                detail="Servicio en mantenimiento, intente más tarde"
            )
    """
    def __init__(self, detail: str = "Servicio no disponible"):
        super().__init__(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=detail,
        )
