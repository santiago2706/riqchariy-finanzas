from sqlalchemy import Column, Integer, String, Text, Float # 👈 Agrega Float
from database import Base
import bcrypt

class TemaFinanciero(Base):
    # ... (Tu código para TemaFinanciero) ...
    __tablename__ = "temas_financieros"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), unique=True, index=True)
    descripcion = Column(Text)

class User(Base):
    # ... (Tu código para User) ...
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    apellido = Column(String(255), nullable=False)
    edad = Column(Integer, nullable=False)
    gmail = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(100), nullable=False)
    
    # Columnas agregadas para Tipo de Perfil y Región de Juego
    role = Column(String(50), nullable=False, default="Estudiante")
    region = Column(String(50), nullable=False, default="Lima")
    # --------------------------------

    @staticmethod
    def hash_password(password: str) -> str:
        return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    def verify_password(self, password: str) -> bool:
        return bcrypt.checkpw(password.encode("utf-8"), self.password.encode("utf-8"))

# 🚨 CLASE FALTANTE: AÑADE ESTA CLASE PARA RESOLVER EL ERROR
class ProductDB(Base):
    __tablename__ = "products"
    id = Column(String, primary_key=True, index=True)
    name = Column(String(255))
    region = Column(String(50))
    price = Column(Float) # Debe ser Float
    cost = Column(Float)   # Debe ser Float
    local_demand = Column(String(50))
    offer_stage = Column(String(50))