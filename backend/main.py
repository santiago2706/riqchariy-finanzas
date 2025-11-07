from fastapi import FastAPI, Query
from pydantic import BaseModel
import random
import json # ¡Importante! Para leer tu archivo
from typing import List # Buena práctica

# --- Constante para la ruta del archivo ---
PRODUCTS_FILE = "products.json"

# --- Modelos de Datos (Pydantic) ---

class Product(BaseModel):
    """
    ¡ACTUALIZADO!
    Este modelo ahora coincide 100% con tu 'products.json'.
    """
    id: str
    name: str
    region: str
    price: float
    cost: float # ¡Añadido!
    local_demand: str  # "alta", "media", "baja"
    offer_stage: str   # "Brote", "Desarrollo", "Estable"

class EstadoJuegoInput(BaseModel):
    dia_actual: int
    products: List[Product]

class NuevoEstadoMercado(BaseModel):
    nuevo_dia: int
    evento_regional: str | None
    products: List[Product]

class EstadoJuegoGuardado(BaseModel):
    day: int
    products: List[Product]
    marketEvent: str | None
    balance: float
    
class InventarioItem(BaseModel):
    """
    Define cómo se ve un item en el inventario del jugador
    (coincide con tu simulación de fetchGameState)
    """
    product: Product # El objeto Product completo
    quantity: int

class EstadoJuegoGuardado(BaseModel):
    """
    ¡ACTUALIZADO!
    Este modelo ahora coincide 100% con tu simulación de frontend.
    """
    day: int
    inventario: List[InventarioItem] # <-- Coincide con tu frontend
    marketEvent: str | None
    saldo: float                     # <-- Coincide con tu frontend

class EstadoJuegoParaGuardar(BaseModel):
    """
    ¡NUEVO!
    Lo que el frontend nos enviará al guardar.
    """
    saldo: float
    inventario: List[InventarioItem] # Recibimos la misma estructura
    day: int

# --- Creación de la App ---
app = FastAPI()


# --- Lógica de Carga de Datos ---

def load_products_from_json() -> List[Product]:
    """
    ¡NUEVO! Esta función lee tu products.json real.
    """
    try:
        with open(PRODUCTS_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            # Validamos los datos contra el modelo Product
            products = [Product(**item) for item in data]
            print(f"Backend: Cargados {len(products)} productos desde {PRODUCTS_FILE}")
            return products
    except FileNotFoundError:
        print(f"ERROR: {PRODUCTS_FILE} no encontrado. Creando lista vacía.")
        return []
    except json.JSONDecodeError:
        print(f"ERROR: {PRODUCTS_FILE} tiene un formato JSON inválido.")
        return []
    except Exception as e:
        print(f"Error inesperado al cargar productos: {e}")
        return []
    
    # --- Lógica de Filtrado (¡NUEVO!) ---
def filter_products_by_region(all_products: List[Product], region: str) -> List[Product]:
    """
    Filtra la lista de productos para incluir solo los de la
    región específica y los que sean "Globales".
    """
    # Asumimos que tienes productos "Globales" (ej. Agua, Gaseosa)
    # y productos regionales (ej. "Jugo de Selva", "Quinua de Sierra")
    # ¡Ajusta "Global" si usas otro término en tu JSON!
    
    filtered = [
        p for p in all_products 
        if p.region == region or p.region == "Global" 
    ]
    
    print(f"Filtrados {len(filtered)} productos para la región: {region}")
    return filtered

# Cargamos los productos una vez al iniciar el servidor
initial_products_list = load_products_from_json()


# --- Lógica del Motor del Mercado (¡MEJORADO!) ---

def calcular_motor_mercado(dia: int, productos: List[Product]) -> tuple[List[Product], str | None]:
    """
    ¡ACTUALIZADO! La lógica ahora usa tus valores ("alta", "baja", etc.)
    """
    
    evento = None
    if dia % 5 == 0:
        evento = "¡Feria Gastr. de Mistura! Precios de comida suben."
    elif dia % 3 == 0:
        evento = "Tubería rota. ¡Agua y gaseosas escasean!"
    
    productos_actualizados = []
    for p in productos:
        producto_actualizado = p.model_copy() 
        
        # 2a. Actualizar estado de oferta y demanda aleatoriamente
        producto_actualizado.local_demand = random.choice(["alta", "media", "baja"])
        producto_actualizado.offer_stage = random.choice(["Brote", "Desarrollo", "Estable"])
        
        # 2b. Calcular nuevo precio base (dificultad creciente)
        # Usamos el 'cost' (tu costo) como base real, no el 'price'
        precio_base = p.cost + (dia * 0.05) # El margen sube 5 centavos por día
        
        # 2c. Aplicar modificadores (¡ACTUALIZADO a minúsculas!)
        if producto_actualizado.local_demand == "alta":
            precio_base *= 1.5  # +50%
        elif producto_actualizado.local_demand == "media":
            precio_base *= 1.2  # +20%
        else: # "baja"
            precio_base *= 0.9  # -10%
            
        if producto_actualizado.offer_stage == "Brote":
            precio_base *= 1.4 # +40% (Novedad, caro)
        if producto_actualizado.offer_stage == "Estable":
            precio_base *= 1.0 # (Estable, precio normal)
        
        # 2d. Aplicar evento
        if evento and "comida" in evento and ("Jugo" in p.name or "Plátano" in p.name):
            precio_base *= 1.5 # +50%
        if evento and "gaseosas" in evento and "Bebida" in p.name:
            precio_base *= 1.5 # +50%
            
        # 2e. Redondear y asegurar precio mínimo (por encima del costo)
        nuevo_precio = round(precio_base, 2)
        producto_actualizado.price = max(p.cost + 0.10, nuevo_precio) # Siempre 10 centavos sobre el costo
        
        productos_actualizados.append(producto_actualizado)

    return productos_actualizados, evento


# --- Endpoints de la API ---

@app.post("/api/mercado/avanzar-dia")
async def avanzar_dia_mercado(estado_input: EstadoJuegoInput) -> NuevoEstadoMercado:
    print(f"Backend: Recibido 'avanzar-dia' para el día {estado_input.dia_actual}")
    
    productos_actualizados, evento = calcular_motor_mercado(
        estado_input.dia_actual,
        estado_input.products
    )
    
    nuevo_dia_calculado = estado_input.dia_actual + 1
    print(f"Backend: Devolviendo día {nuevo_dia_calculado} y {len(productos_actualizados)} productos.")

    return NuevoEstadoMercado(
        nuevo_dia=nuevo_dia_calculado,
        evento_regional=evento,
        products=productos_actualizados
    )


@app.get("/api/productos/iniciales")
async def obtener_productos_iniciales(region: str = Query(..., min_length=1)) -> List[Product]:
    """
    ¡ACTUALIZADO!
    Ahora requiere un parámetro de consulta (query parameter) llamado 'region'.
    Ejemplo: /api/productos/iniciales?region=Lima
    """
    print(f"Backend: Solicitud de productos iniciales para REGION: {region}")
    
    # Filtramos la lista maestra que cargamos al inicio
    productos_filtrados = filter_products_by_region(initial_products_list, region)
    
    return productos_filtrados


@app.get("/api/game/load", response_model=EstadoJuegoGuardado) # <-- Usa el modelo actualizado
async def cargar_partida_guardada(region: str = Query(..., min_length=1)) -> EstadoJuegoGuardado:
    """
    ¡ACTUALIZADO!
    Simula la carga, pero filtrando por región Y usando la estructura
    que tu frontend (useKioscoStore) espera.
    """
    print(f"Backend: Enviando partida guardada (simulada) para REGION: {region}")
    
    # 1. Carga y filtra productos base
    productos_base = load_products_from_json() 
    productos_filtrados = filter_products_by_region(productos_base, region)
    
    # 2. Simula un inventario basado en esos productos
    sim_inventario = []
    if productos_filtrados:
        # Modificamos el precio como en tu simulación
        producto_simulado = productos_filtrados[0].model_copy()
        producto_simulado.price = 4.10 
        
        sim_inventario.append(InventarioItem(
            product=producto_simulado, # Usamos el producto filtrado y modificado
            quantity=20
        ))
    
    # 3. Devuelve la estructura exacta que el frontend espera
    return EstadoJuegoGuardado(
        day=5,                            # Coincide con tu simulación
        inventario=sim_inventario,        # Coincide con tu simulación
        marketEvent="Sequía - Precios de bebidas altos",
        saldo=999.50                      # Coincide con tu simulación
    )

@app.post("/api/game/save")
async def guardar_partida(estado: EstadoJuegoParaGuardar):
    """
    ¡NUEVO ENDPOINT!
    Recibe el estado del juego desde el frontend para guardarlo.
    """
    # En una app real, guardarías esto en una base de datos
    # asociado al ID del usuario (que vendría en un token JWT).
    print("="*30)
    print("Backend: GUARDANDO PARTIDA (simulación de guardado)")
    print(f"Día: {estado.day}")
    print(f"Saldo: {estado.saldo}")
    print(f"Items en inventario: {len(estado.inventario)}")
    if estado.inventario:
        print(f"  -> Ejemplo item: {estado.inventario[0].product.name} (Qty: {estado.inventario[0].quantity})")
    print("="*30)
    
    # Devolvemos la misma respuesta que tu simulación de frontend
    return {"status": 200, "message": "Juego guardado"}