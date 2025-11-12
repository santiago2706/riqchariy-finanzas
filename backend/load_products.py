import json
from database import SessionLocal
from models import ProductDB

# 1️⃣ Cargar archivo JSON
with open("products.json", "r", encoding="utf-8") as file:
    productos = json.load(file)

# 2️⃣ Crear sesión de base de datos
db = SessionLocal()

# 3️⃣ Insertar productos
for p in productos:
    producto = ProductDB(
        id=p["id"],
        name=p["name"],
        region=p["region"],
        price=p["price"],
        cost=p["cost"],
        local_demand=p["local_demand"],
        offer_stage=p["offer_stage"]
    )
    db.add(producto)

# 4️⃣ Confirmar transacción
db.commit()
db.close()

print(f"✅ {len(productos)} productos insertados correctamente en la tabla 'products'.")
