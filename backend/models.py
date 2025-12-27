from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey
from sqlalchemy.orm import relationship
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
    
    # Hierarchy updates
    institution_id = Column(Integer, ForeignKey("institutions.id"), nullable=True)
    classroom_id = Column(Integer, ForeignKey("classrooms.id"), nullable=True)
    
    # Relationships
    institution = relationship("Institution", back_populates="members")
    classroom = relationship("Classroom", foreign_keys=[classroom_id], back_populates="students")
    # For teachers managing classrooms
    managed_classrooms = relationship("Classroom", foreign_keys="Classroom.teacher_id", back_populates="teacher")

    @staticmethod
    def hash_password(password: str) -> str:
        return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    def verify_password(self, password: str) -> bool:
        return bcrypt.checkpw(password.encode("utf-8"), self.password.encode("utf-8"))

class Institution(Base):
    __tablename__ = "institutions"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)
    region = Column(String(50))
    subscription_plan = Column(String(50), default="Free")
    
    members = relationship("User", back_populates="institution")
    classrooms = relationship("Classroom", back_populates="institution")

class Classroom(Base):
    __tablename__ = "classrooms"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    institution_id = Column(Integer, ForeignKey("institutions.id"))
    teacher_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    institution = relationship("Institution", back_populates="classrooms")
    teacher = relationship("User", foreign_keys=[teacher_id], back_populates="managed_classrooms")
    students = relationship("User", foreign_keys="User.classroom_id", back_populates="classroom")

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