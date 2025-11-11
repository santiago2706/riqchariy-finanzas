# =====================================================
# 🧠 Riqch'ariy Finanzas - Backend Principal
# =====================================================
from fastapi import FastAPI, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
from typing import List, Optional
import random
import json
from sqlalchemy.orm import Session

# =====================================================
# ⚙️ IMPORTS INTERNOS
# =====================================================
import models
from database import engine, get_db 
from auth import router as auth_router
from chatbot.router import router as chatbot_router

# =====================================================
# ⚙️ CONFIGURACIÓN DE LA APP
# =====================================================
app = FastAPI(
    title="Riqch'ariy Finanzas - Backend AI",
    description="Simulación económica educativa con IA y autenticación de usuarios",
    version="1.0.0"
)

# =====================================================
# 🔒 CORS
# =====================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# 🗂️ INICIALIZACIÓN DE MODELOS Y ROUTERS
# =====================================================
models.Base.metadata.create_all(bind=engine)

app.include_router(auth_router, tags=["Auth"])
app.include_router(chatbot_router, prefix="/chatbot", tags=["Chatbot"])

# =====================================================
# 📦 CONFIGURACIÓN DE PRODUCTOS
# =====================================================
PRODUCTS_FILE = "products.json"

# =====================================================
# 🧩 MODELOS PYDANTIC
# =====================================================
class Product(BaseModel):
    id: str
    name: str
    region: str
    price: float
    cost: float
    local_demand: str
    offer_stage: str
    
    class Config:
        from_attributes = True

class EstadoJuegoInput(BaseModel):
    dia_actual: int
    products: List[Product]

class NuevoEstadoMercado(BaseModel):
    nuevo_dia: int
    evento_regional: Optional[str]
    pedagogical_focus: Optional[str]
    products: List[Product]

class InventarioItem(BaseModel):
    product: Product
    quantity: int

class EstadoJuegoGuardado(BaseModel):
    day: int
    inventario: List[InventarioItem]
    marketEvent: Optional[str]
    saldo: float

class EstadoJuegoParaGuardar(BaseModel):
    saldo: float
    inventario: List[InventarioItem]
    day: int


# =====================================================
# 🧠 FUNCIONES AUXILIARES
# =====================================================
def load_products_from_json() -> List[Product]:
    """Carga los productos desde products.json con validación Pydantic."""
    try:
        with open(PRODUCTS_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        products = []
        for item in data:
            try:
                products.append(Product(**item))
            except ValidationError as ve:
                print("=" * 60)
                print(f"🛑 ERROR DE VALIDACIÓN PYDANTIC - ID: {item.get('id', 'N/A')}")
                print(f"Detalles: {ve.errors()}")
                print("=" * 60)
        print(f"✅ {len(products)} productos cargados desde {PRODUCTS_FILE}")
        return products
    except FileNotFoundError:
        print(f"❌ {PRODUCTS_FILE} no encontrado.")
        return []
    except json.JSONDecodeError as jde:
        print(f"❌ JSON inválido → {jde}")
        return []
    except Exception as e:
        print(f"❌ Error inesperado → {e}")
        return []

def calcular_motor_mercado(dia: int, productos: List[Product]) -> tuple[List[Product], Optional[str], Optional[str]]:
    """Genera la nueva simulación del mercado."""
    evento, foco_pedagogico = None, None

    if dia % 5 == 0:
        evento = "¡Feria gastronómica! Precios de comida suben."
        foco_pedagogico = "Ahorro por volumen"
    elif dia % 3 == 0:
        evento = "Tubería rota. ¡Agua y gaseosas escasean!"
        foco_pedagogico = "Fondo de emergencia"
    else:
        foco_pedagogico = random.choice(["Competencia de precios", "Manejo de inventario", None])

    productos_actualizados = []
    for p in productos:
        producto_actualizado = p.model_copy()
        producto_actualizado.local_demand = random.choice(["alta", "media", "baja"])
        producto_actualizado.offer_stage = random.choice(["Brote", "Desarrollo", "Estable"])

        precio_base = p.cost + (dia * 0.05)
        if producto_actualizado.local_demand == "alta":
            precio_base *= 1.5
        elif producto_actualizado.local_demand == "media":
            precio_base *= 1.2
        else:
            precio_base *= 0.9

        if producto_actualizado.offer_stage == "Brote":
            precio_base *= 1.4

        if evento and "comida" in evento and ("Jugo" in p.name or "Plátano" in p.name):
            precio_base *= 1.5
        if evento and "gaseosas" in evento and "Bebida" in p.name:
            precio_base *= 1.5

        producto_actualizado.price = round(max(p.cost + 0.10, precio_base), 2)
        productos_actualizados.append(producto_actualizado)

    return productos_actualizados, evento, foco_pedagogico


def save_products_to_db(products: List[Product], db: Session):
    """Guarda productos desde el JSON a la DB si no existen."""
    for p in products:
        if not db.query(models.ProductDB).filter(models.ProductDB.id == p.id).first():
            db.add(models.ProductDB(
                id=p.id,
                name=p.name,
                region=p.region,
                price=p.price,
                cost=p.cost,
                local_demand=p.local_demand,
                offer_stage=p.offer_stage
            ))
    db.commit()

# =====================================================
# 💡 EVENTO DE INICIO (CARGAR PRODUCTOS EN LA DB)
# =====================================================
@app.on_event("startup")
def startup_event():
    db = next(get_db())
    initial_products_list = load_products_from_json()
    save_products_to_db(initial_products_list, db)
    db.close()
    print("✅ Inserción de productos de inicio verificada.")

# =====================================================
# 🚀 ENDPOINTS DEL JUEGO Y MERCADO
# =====================================================

@app.get("/products", response_model=List[Product])
async def get_all_products(db: Session = Depends(get_db)) -> List[Product]:
    """Devuelve todos los productos disponibles en la DB."""
    db_products = db.query(models.ProductDB).all()
    products_pydantic = [Product.model_validate(p) for p in db_products]
    return products_pydantic


@app.post("/api/mercado/avanzar-dia")
async def avanzar_dia_mercado(estado_input: EstadoJuegoInput) -> NuevoEstadoMercado:
    productos_actualizados, evento, foco = calcular_motor_mercado(
        estado_input.dia_actual, estado_input.products
    )
    return NuevoEstadoMercado(
        nuevo_dia=estado_input.dia_actual + 1,
        evento_regional=evento,
        pedagogical_focus=foco,
        products=productos_actualizados
    )

@app.get("/api/productos/iniciales", response_model=List[Product])
async def obtener_productos_iniciales(
    region: str = Query(..., min_length=1),
    db: Session = Depends(get_db)
) -> List[Product]:
    region_lower = region.lower()
    db_products = db.query(models.ProductDB).filter(
        (models.ProductDB.region.ilike(region_lower)) | (models.ProductDB.region.ilike("global"))
    ).all()
    products_pydantic = [Product.model_validate(p) for p in db_products]
    return products_pydantic


@app.get("/api/game/load", response_model=EstadoJuegoGuardado)
async def cargar_partida_guardada(region: str = Query(..., min_length=1)) -> EstadoJuegoGuardado:
    productos_filtrados = load_products_from_json()
    inventario_simulado = []
    
    product_pydantic = Product.model_validate(productos_filtrados[0].model_dump())
    product_pydantic.price = 4.10
    inventario_simulado.append(InventarioItem(product=product_pydantic, quantity=20))
    
    return EstadoJuegoGuardado(
        day=5,
        inventario=inventario_simulado,
        marketEvent="Sequía - Precios de bebidas altos",
        saldo=999.50
    )


@app.post("/api/game/save")
async def guardar_partida(estado: EstadoJuegoParaGuardar):
    print("=" * 30)
    print("💾 GUARDANDO PARTIDA")
    print(f"Día: {estado.day}")
    print(f"Saldo: {estado.saldo}")
    print(f"Items: {len(estado.inventario)}")
    print("=" * 30)
    return {"status": 200, "message": "Juego guardado"}

# =====================================================
# 🏁 RUTA PRINCIPAL
# =====================================================
@app.get("/")
def root():
    return {"message": "Bienvenido a Riqch'ariy Finanzas API"}