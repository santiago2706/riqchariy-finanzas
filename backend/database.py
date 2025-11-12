# backend/database.py
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


load_dotenv()
# 1️⃣ Obtener la URL de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./local.db")

# 2️⃣ Crear el motor
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

# 3️⃣ Crear sesión y base
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 🧩 Dependencia para inyectar en endpoints (si la necesitas)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 👀 Solo para depuración
print(f"📡 Conectado a la base de datos → {DATABASE_URL}")
