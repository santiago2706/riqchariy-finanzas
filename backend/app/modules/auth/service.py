# ==============================================================================
# SERVICE.PY - LÓGICA DE NEGOCIO DE AUTENTICACIÓN
# ==============================================================================
"""
Este archivo contiene la lógica de negocio para autenticación.

¿Qué es un Service?
    Es una capa que separa la lógica de negocio de los endpoints.
    Esto permite:
    1. Reutilizar lógica en diferentes endpoints
    2. Testear la lógica independientemente de HTTP
    3. Mantener los endpoints (router) limpios

Patrón de diseño:
    Router (HTTP) → Service (Lógica) → Repository (BD)
    
    Actualmente no hay BD, pero cuando se agregue:
    - Service llamará a Repository para operaciones de BD
    - Service encapsula las reglas de negocio

Uso:
    from app.modules.auth.service import AuthService
    
    auth_service = AuthService()
    result = await auth_service.login(email, password)
"""

from typing import Optional, Dict, Any

# TODO: Importar cuando estén listos
# from app.core.security import hash_password, verify_password, create_access_token
# from app.modules.auth.schemas import LoginRequest, RegisterRequest, UserResponse


class AuthService:
    """
    Servicio de autenticación.
    
    Métodos disponibles:
        - login(): Autenticar usuario existente
        - register(): Registrar nuevo usuario
        - get_user_by_email(): Buscar usuario por email
    
    Ejemplo de uso:
        auth_service = AuthService()
        result = await auth_service.login("email@test.com", "password123")
    """
    
    def __init__(self):
        """
        Inicializar el servicio.
        
        Aquí puedes inyectar dependencias como:
            - Sesión de base de datos
            - Repositorios
            - Servicios externos
        """
        # TODO: Inyectar repositorio cuando se agregue BD
        # self.user_repository = UserRepository(db_session)
        pass
    
    async def login(
        self,
        email: str,
        password: str
    ) -> Dict[str, Any]:
        """
        Autenticar un usuario con email y contraseña.
        
        Args:
            email: Email del usuario
            password: Contraseña en texto plano
            
        Returns:
            Diccionario con success, user, token, message
            
        Raises:
            HTTPException 401: Si las credenciales son incorrectas
            
        Flujo:
            1. Buscar usuario por email
            2. Verificar que el usuario existe
            3. Verificar que la contraseña es correcta
            4. Generar token JWT
            5. Retornar datos del usuario y token
        """
        # TODO: Implementar cuando se agregue BD
        # 1. Buscar usuario
        # user = await self.user_repository.get_by_email(email)
        # if not user:
        #     raise UnauthorizedException("Usuario no encontrado")
        
        # 2. Verificar contraseña
        # if not verify_password(password, user.hashed_password):
        #     raise UnauthorizedException("Contraseña incorrecta")
        
        # 3. Generar token
        # token = create_access_token(data={"sub": str(user.id)})
        
        # 4. Retornar respuesta
        # return {
        #     "success": True,
        #     "user": UserResponse.model_validate(user),
        #     "token": token,
        #     "message": "Login exitoso"
        # }
        
        return {
            "success": False,
            "user": None,
            "token": None,
            "message": "Servicio pendiente de implementación"
        }
    
    async def register(
        self,
        name: str,
        email: str,
        password: str,
        region: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Registrar un nuevo usuario.
        
        Args:
            name: Nombre completo del usuario
            email: Email del usuario
            password: Contraseña en texto plano
            region: Región geográfica (opcional)
            
        Returns:
            Diccionario con success, user, token, message
            
        Raises:
            HTTPException 409: Si el email ya está registrado
            
        Flujo:
            1. Verificar que el email no existe
            2. Hashear la contraseña
            3. Crear el usuario en BD
            4. Generar token JWT
            5. Retornar datos del usuario y token
        """
        # TODO: Implementar cuando se agregue BD
        # 1. Verificar email único
        # existing = await self.user_repository.get_by_email(email)
        # if existing:
        #     raise ConflictException("Este email ya está registrado")
        
        # 2. Hashear contraseña
        # hashed_password = hash_password(password)
        
        # 3. Crear usuario
        # user = await self.user_repository.create(
        #     name=name,
        #     email=email,
        #     hashed_password=hashed_password,
        #     region=region
        # )
        
        # 4. Generar token
        # token = create_access_token(data={"sub": str(user.id)})
        
        # 5. Retornar respuesta
        # return {
        #     "success": True,
        #     "user": UserResponse.model_validate(user),
        #     "token": token,
        #     "message": "Registro exitoso"
        # }
        
        return {
            "success": False,
            "user": None,
            "token": None,
            "message": "Servicio pendiente de implementación"
        }
    
    async def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """
        Buscar un usuario por su email.
        
        Args:
            email: Email del usuario a buscar
            
        Returns:
            Datos del usuario si existe, None si no
            
        Uso:
            user = await auth_service.get_user_by_email("test@example.com")
            if user:
                print(f"Encontrado: {user['name']}")
        """
        # TODO: Implementar cuando se agregue BD
        # return await self.user_repository.get_by_email(email)
        return None
