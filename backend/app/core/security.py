# ==============================================================================
# SECURITY.PY - AUTENTICACIÓN Y SEGURIDAD
# ==============================================================================
"""
Este archivo maneja toda la seguridad del backend.

Responsabilidades:
    1. Hashing de contraseñas con bcrypt
    2. Verificación de contraseñas
    3. Creación de tokens JWT
    4. Verificación y decodificación de tokens JWT

Uso:
    from app.core.security import (
        hash_password,
        verify_password,
        create_access_token,
        decode_access_token
    )
    
    # Hashear contraseña al registrar usuario
    hashed = hash_password("mi-contraseña")
    
    # Verificar contraseña al hacer login
    is_valid = verify_password("mi-contraseña", hashed)
    
    # Crear token después de login exitoso
    token = create_access_token(data={"sub": user_id})

Dependencias:
    - passlib[bcrypt]: Para hashing de contraseñas
    - python-jose[cryptography]: Para tokens JWT
"""

from datetime import datetime, timedelta
from typing import Optional, Dict, Any

from jose import jwt, JWTError
from passlib.context import CryptContext

# TODO: Importar settings cuando esté listo
# from app.core.config import settings


# ==============================================================================
# CONFIGURACIÓN DE HASHING DE CONTRASEÑAS
# ==============================================================================
# CryptContext maneja el hashing de contraseñas de forma segura
# bcrypt es el algoritmo recomendado por su resistencia a ataques

pwd_context = CryptContext(
    schemes=["bcrypt"],     # Algoritmo de hashing
    deprecated="auto"       # Marcar esquemas antiguos como deprecated
)


# ==============================================================================
# CONSTANTES DE JWT (Temporales - usar settings en producción)
# ==============================================================================
# TODO: Reemplazar por settings.SECRET_KEY, settings.JWT_ALGORITHM, etc.
SECRET_KEY = "tu-clave-secreta-cambiar-en-produccion"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 horas


# ==============================================================================
# FUNCIONES DE HASHING DE CONTRASEÑAS
# ==============================================================================

def hash_password(password: str) -> str:
    """
    Hashea una contraseña para almacenarla de forma segura.
    
    Args:
        password: Contraseña en texto plano
        
    Returns:
        Hash de la contraseña (string)
        
    Ejemplo:
        hashed = hash_password("mi-contraseña-segura")
        # Resultado: "$2b$12$LQv3c1yqBWVHxkd0LHAkCO..."
    """
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica si una contraseña coincide con su hash.
    
    Args:
        plain_password: Contraseña en texto plano (ingresada por usuario)
        hashed_password: Hash almacenado en la base de datos
        
    Returns:
        True si la contraseña es correcta, False si no
        
    Ejemplo:
        is_valid = verify_password("mi-contraseña", hashed_stored)
    """
    return pwd_context.verify(plain_password, hashed_password)


# ==============================================================================
# FUNCIONES DE JWT
# ==============================================================================

def create_access_token(
    data: Dict[str, Any],
    expires_delta: Optional[timedelta] = None
) -> str:
    """
    Crea un token JWT con los datos proporcionados.
    
    Args:
        data: Diccionario con datos a incluir en el token
              Típicamente: {"sub": user_id} donde "sub" es el subject
        expires_delta: Tiempo de expiración personalizado (opcional)
        
    Returns:
        Token JWT como string
        
    Ejemplo:
        token = create_access_token(data={"sub": "user123"})
        # Resultado: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    """
    to_encode = data.copy()
    
    # Calcular tiempo de expiración
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Agregar claim de expiración
    to_encode.update({"exp": expire})
    
    # Crear y retornar el token
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Decodifica y verifica un token JWT.
    
    Args:
        token: Token JWT a verificar
        
    Returns:
        Diccionario con los datos del token si es válido
        None si el token es inválido o expirado
        
    Ejemplo:
        payload = decode_access_token(token)
        if payload:
            user_id = payload.get("sub")
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        # Token inválido, expirado o manipulado
        return None
