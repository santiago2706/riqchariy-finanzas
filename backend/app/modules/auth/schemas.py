# ==============================================================================
# SCHEMAS.PY - MODELOS PYDANTIC PARA AUTENTICACIÓN
# ==============================================================================
"""
Este archivo define los modelos Pydantic para validar datos de entrada/salida.

¿Qué son los schemas?
    Son clases que definen la estructura de los datos que:
    1. Recibe la API (Request)
    2. Devuelve la API (Response)
    
    Pydantic valida automáticamente los datos y genera errores claros.

Convenciones de nombres:
    - *Request  → Datos que envía el frontend
    - *Response → Datos que devuelve el backend
    - *Base     → Campos compartidos entre request y response

Uso:
    from app.modules.auth.schemas import LoginRequest, AuthResponse
    
    @router.post("/login", response_model=AuthResponse)
    async def login(request: LoginRequest):
        ...
"""

from typing import Optional
from pydantic import BaseModel, EmailStr, Field


# ==============================================================================
# MODELOS DE USUARIO
# ==============================================================================

class UserBase(BaseModel):
    """
    Campos base de un usuario.
    Estos campos son compartidos entre diferentes schemas.
    """
    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Nombre completo del usuario",
        examples=["Juan Pérez"]
    )
    gmail: EmailStr = Field(
        ...,
        description="Correo electrónico del usuario",
        examples=["usuario@gmail.com"]
    )
    region: Optional[str] = Field(
        None,
        max_length=50,
        description="Región geográfica del usuario",
        examples=["Lima", "Cusco", "Arequipa"]
    )


class UserResponse(UserBase):
    """
    Datos del usuario que se devuelven en las respuestas.
    No incluye datos sensibles como la contraseña.
    """
    id: str = Field(
        ...,
        description="ID único del usuario",
        examples=["user_123abc"]
    )
    
    class Config:
        """Configuración para serialización."""
        from_attributes = True  # Permite convertir desde objetos ORM


# ==============================================================================
# MODELOS DE LOGIN
# ==============================================================================

class LoginRequest(BaseModel):
    """
    Datos requeridos para iniciar sesión.
    
    El frontend envía estos datos al endpoint POST /auth/login
    """
    gmail: EmailStr = Field(
        ...,
        description="Email del usuario",
        examples=["usuario@gmail.com"]
    )
    password: str = Field(
        ...,
        min_length=6,
        description="Contraseña del usuario",
        examples=["contraseña123"]
    )


# ==============================================================================
# MODELOS DE REGISTRO
# ==============================================================================

class RegisterRequest(UserBase):
    """
    Datos requeridos para registrar un nuevo usuario.
    
    Hereda de UserBase y agrega la contraseña.
    """
    password: str = Field(
        ...,
        min_length=6,
        max_length=100,
        description="Contraseña del usuario (mínimo 6 caracteres)",
        examples=["contraseña123"]
    )


# ==============================================================================
# MODELOS DE RESPUESTA
# ==============================================================================

class AuthResponse(BaseModel):
    """
    Respuesta estándar para endpoints de autenticación.
    
    Se usa tanto para login como para registro.
    """
    success: bool = Field(
        ...,
        description="Indica si la operación fue exitosa"
    )
    user: Optional[UserResponse] = Field(
        None,
        description="Datos del usuario autenticado"
    )
    token: Optional[str] = Field(
        None,
        description="Token JWT para autenticación"
    )
    message: str = Field(
        ...,
        description="Mensaje descriptivo del resultado",
        examples=["Login exitoso", "Credenciales incorrectas"]
    )


class ErrorResponse(BaseModel):
    """
    Respuesta estándar para errores.
    
    FastAPI usa este formato automáticamente para HTTPException.
    """
    detail: str = Field(
        ...,
        description="Descripción del error",
        examples=["Credenciales incorrectas"]
    )
