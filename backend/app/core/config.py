# ==============================================================================
# CONFIG.PY - CONFIGURACIÓN Y VARIABLES DE ENTORNO
# ==============================================================================
"""
Este archivo maneja toda la configuración del backend usando Pydantic Settings.

Responsabilidades:
    1. Cargar variables de entorno desde .env
    2. Validar que las variables requeridas existan
    3. Proporcionar valores por defecto seguros
    4. Exponer un objeto 'settings' para usar en toda la aplicación

Uso:
    from app.core.config import settings
    
    print(settings.PROJECT_NAME)
    print(settings.SECRET_KEY)

Agregar nuevas variables:
    1. Agregar la variable al archivo .env
    2. Agregar el campo correspondiente a la clase Settings
    3. Importar y usar desde cualquier parte del código
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """
    Configuración principal de la aplicación.
    
    Los valores se cargan automáticamente desde:
        1. Variables de entorno del sistema
        2. Archivo .env en la raíz del proyecto
    
    Los campos sin valor por defecto son REQUERIDOS.
    """
    
    # --------------------------------------------------------------------------
    # CONFIGURACIÓN GENERAL
    # --------------------------------------------------------------------------
    PROJECT_NAME: str = "Riqchariy Finanzas API"
    ENVIRONMENT: str = "development"  # development | staging | production
    DEBUG: bool = True
    
    # --------------------------------------------------------------------------
    # SERVIDOR
    # --------------------------------------------------------------------------
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # --------------------------------------------------------------------------
    # SEGURIDAD - JWT
    # --------------------------------------------------------------------------
    # IMPORTANTE: Cambiar SECRET_KEY en producción
    SECRET_KEY: str = "tu-clave-secreta-cambiar-en-produccion"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 horas
    
    # --------------------------------------------------------------------------
    # CORS
    # --------------------------------------------------------------------------
    # Lista de orígenes permitidos (URLs del frontend)
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
    
    # --------------------------------------------------------------------------
    # BASE DE DATOS (Descomentar cuando se configure)
    # --------------------------------------------------------------------------
    # DATABASE_URL: str = "postgresql+asyncpg://user:pass@localhost/db"
    
    # --------------------------------------------------------------------------
    # CONFIGURACIÓN DE PYDANTIC SETTINGS
    # --------------------------------------------------------------------------
    class Config:
        """Configuración para Pydantic Settings."""
        env_file = ".env"                    # Archivo de variables de entorno
        env_file_encoding = "utf-8"          # Encoding del archivo
        case_sensitive = True                # Distinguir mayúsculas/minúsculas
        extra = "ignore"                     # Ignorar variables no definidas


# ==============================================================================
# INSTANCIA GLOBAL DE CONFIGURACIÓN
# ==============================================================================
# Esta instancia se importa en toda la aplicación
# Ejemplo: from app.core.config import settings

settings = Settings()
