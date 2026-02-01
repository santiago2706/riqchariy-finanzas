# ==============================================================================
# PAQUETE CORE - CONFIGURACIÓN CENTRAL
# ==============================================================================
"""
Este paquete contiene la configuración central del backend.

Módulos incluidos:
    - config.py    → Variables de entorno y configuración global
    - security.py  → Autenticación JWT, hashing de contraseñas

Uso:
    from app.core.config import settings
    from app.core.security import create_access_token, verify_password

Nota:
    Cuando se agregue base de datos, crear aquí:
    - database.py  → Conexión y sesión de SQLAlchemy
"""
