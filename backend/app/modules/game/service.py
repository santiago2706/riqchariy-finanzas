# ==============================================================================
# SERVICE.PY - LÓGICA DE NEGOCIO DEL JUEGO
# ==============================================================================
"""
Este archivo contiene la lógica de negocio para el juego educativo.

Funcionalidades:
    - Guardar estado del juego asociado a un usuario
    - Cargar estado guardado del usuario
    - Obtener estado inicial para nuevos jugadores

Uso:
    from app.modules.game.service import GameService
    
    game_service = GameService()
    
    # Guardar
    await game_service.save_game(user_id, saldo, inventario, day)
    
    # Cargar
    state = await game_service.load_game(user_id, region)

Almacenamiento:
    Cuando se agregue BD, los datos se guardarán en una tabla 'game_states'
    Por ahora, se puede usar un diccionario en memoria para desarrollo.
"""

from typing import Optional, Dict, Any, List
from datetime import datetime

# TODO: Importar cuando estén listos
# from app.modules.game.schemas import InventoryItem, GameState


class GameService:
    """
    Servicio para gestión del estado del juego.
    
    Métodos disponibles:
        - save_game(): Guardar estado actual
        - load_game(): Cargar estado guardado
        - get_initial_state(): Obtener estado inicial
    
    Ejemplo:
        service = GameService()
        await service.save_game("user123", 500.0, [], 1)
    """
    
    # Almacenamiento temporal en memoria (reemplazar por BD)
    _game_states: Dict[str, Dict[str, Any]] = {}
    
    def __init__(self):
        """
        Inicializar el servicio.
        
        Cuando se agregue BD:
            - Inyectar sesión de base de datos
            - Inyectar repositorio de game_states
        """
        pass
    
    async def save_game(
        self,
        user_id: str,
        saldo: float,
        inventario: List[Dict[str, Any]],
        day: int
    ) -> Dict[str, Any]:
        """
        Guardar el estado del juego para un usuario.
        
        Args:
            user_id: ID del usuario
            saldo: Dinero disponible
            inventario: Lista de productos en inventario
            day: Día actual del juego
            
        Returns:
            Confirmación con timestamp del guardado
            
        Notas:
            - Sobrescribe el guardado anterior
            - Cuando se agregue BD, usar transacción
        """
        # Guardar en memoria (temporal)
        self._game_states[user_id] = {
            "saldo": saldo,
            "inventario": inventario,
            "day": day,
            "saved_at": datetime.utcnow().isoformat()
        }
        
        # TODO: Implementar guardado en BD
        # async with db.begin():
        #     existing = await self.repo.get_by_user_id(user_id)
        #     if existing:
        #         await self.repo.update(existing.id, {...})
        #     else:
        #         await self.repo.create({...})
        
        return {
            "status": 200,
            "message": "Juego guardado exitosamente",
            "saved_at": datetime.utcnow().isoformat()
        }
    
    async def load_game(
        self,
        user_id: str,
        region: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Cargar el estado guardado del juego.
        
        Args:
            user_id: ID del usuario
            region: Región para productos regionales (opcional)
            
        Returns:
            Estado del juego o estado inicial si no existe
            
        Notas:
            - Si no hay guardado, retorna estado inicial
            - La región puede afectar productos disponibles
        """
        # Buscar en memoria (temporal)
        saved_state = self._game_states.get(user_id)
        
        if saved_state:
            return {
                "status": 200,
                "data": {
                    "saldo": saved_state["saldo"],
                    "inventario": saved_state["inventario"],
                    "day": saved_state["day"]
                }
            }
        
        # Si no hay guardado, retornar estado inicial
        initial_state = await self.get_initial_state(region)
        return {
            "status": 200,
            "data": initial_state,
            "message": "No hay partida guardada, iniciando nueva"
        }
    
    async def get_initial_state(
        self,
        region: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Obtener estado inicial para un nuevo jugador.
        
        Args:
            region: Región para personalizar saldo inicial
            
        Returns:
            Estado inicial del juego
            
        Notas:
            - El saldo inicial puede variar por región
            - El inventario inicia vacío
            - El día inicia en 1
        """
        # Saldo inicial base (puede variar por región)
        initial_balance = 100.0
        
        # TODO: Personalizar por región
        # if region == "Lima":
        #     initial_balance = 120.0
        # elif region == "Cusco":
        #     initial_balance = 80.0
        
        return {
            "saldo": initial_balance,
            "inventario": [],
            "day": 1
        }
