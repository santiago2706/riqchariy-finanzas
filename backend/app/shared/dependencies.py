# ==============================================================================
# DEPENDENCIES.PY - DEPENDENCIAS FASTAPI REUTILIZABLES
# ==============================================================================
"""
Este archivo contiene dependencias de FastAPI que se inyectan en los endpoints.

¿Qué son las dependencias en FastAPI?
    Son funciones que se ejecutan ANTES del endpoint y pueden:
    1. Validar autenticación
    2. Obtener conexión a base de datos
    3. Verificar permisos
    4. Extraer datos comunes de la petición

Uso en un endpoint:
    from app.shared.dependencies import get_current_user
    
    @router.get("/mi-perfil")
    async def get_profile(current_user = Depends(get_current_user)):
        return {"user": current_user}

Ventajas:
    - Código reutilizable en múltiples endpoints
    - Separación clara de responsabilidades
    - Fácil de testear
"""

from typing import Optional
from fastapi import Depends, Header, HTTPException, status

# TODO: Importar cuando esté listo
# from app.core.security import decode_access_token


# ==============================================================================
# DEPENDENCIA: OBTENER TOKEN DEL HEADER
# ==============================================================================
async def get_token_from_header(
    authorization: Optional[str] = Header(None)
) -> Optional[str]:
    """
    Extrae el token JWT del header Authorization.
    
    Formato esperado del header:
        Authorization: Bearer <token>
    
    Args:
        authorization: Header Authorization de la petición
        
    Returns:
        El token JWT sin el prefijo "Bearer ", o None si no existe
        
    Ejemplo de uso:
        @router.get("/protected")
        async def protected_route(token: str = Depends(get_token_from_header)):
            ...
    """
    if authorization is None:
        return None
    
    # Verificar formato "Bearer <token>"
    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        return None
    
    return parts[1]


# ==============================================================================
# DEPENDENCIA: OBTENER USUARIO ACTUAL (OPCIONAL)
# ==============================================================================
async def get_current_user_optional(
    token: Optional[str] = Depends(get_token_from_header)
) -> Optional[dict]:
    """
    Obtiene el usuario actual si está autenticado.
    No lanza error si no hay token - retorna None.
    
    Útil para endpoints que funcionan diferente para usuarios logueados.
    
    Returns:
        Datos del usuario si está autenticado, None si no
        
    Ejemplo:
        @router.get("/productos")
        async def get_products(user = Depends(get_current_user_optional)):
            if user:
                # Mostrar precios personalizados
            else:
                # Mostrar precios públicos
    """
    if token is None:
        return None
    
    # TODO: Implementar decodificación del token
    # payload = decode_access_token(token)
    # if payload is None:
    #     return None
    # return payload
    
    return None  # Placeholder


# ==============================================================================
# DEPENDENCIA: OBTENER USUARIO ACTUAL (REQUERIDO)
# ==============================================================================
async def get_current_user(
    token: Optional[str] = Depends(get_token_from_header)
) -> dict:
    """
    Obtiene el usuario actual. REQUIERE autenticación.
    Lanza HTTPException 401 si no hay token o es inválido.
    
    Usar en endpoints protegidos que requieren login.
    
    Returns:
        Datos del usuario autenticado
        
    Raises:
        HTTPException 401: Si no hay token o es inválido
        
    Ejemplo:
        @router.get("/mi-perfil")
        async def get_my_profile(user = Depends(get_current_user)):
            return {"email": user["email"]}
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No autenticado o token inválido",
        headers={"WWW-Authenticate": "Bearer"},  # Header estándar OAuth2
    )
    
    if token is None:
        raise credentials_exception
    
    # TODO: Implementar decodificación del token
    # payload = decode_access_token(token)
    # if payload is None:
    #     raise credentials_exception
    # return payload
    
    raise credentials_exception  # Placeholder hasta implementar


# ==============================================================================
# DEPENDENCIA: CONEXIÓN A BASE DE DATOS (Para cuando se agregue BD)
# ==============================================================================
# async def get_db():
#     """
#     Proporciona una sesión de base de datos para cada petición.
#     
#     La sesión se crea al inicio del endpoint y se cierra automáticamente
#     al finalizar, incluso si hay errores.
#     
#     Uso:
#         @router.get("/users")
#         async def get_users(db: AsyncSession = Depends(get_db)):
#             result = await db.execute(select(User))
#             return result.scalars().all()
#     """
#     async with async_session() as session:
#         try:
#             yield session
#         finally:
#             await session.close()
