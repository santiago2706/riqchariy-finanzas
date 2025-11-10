# backend/auth.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr, field_validator # ✅ Importado field_validator
from database import SessionLocal
import models
import secrets

router = APIRouter(prefix="/auth", tags=["Auth"])

# =====================================================
# 📦 DEPENDENCIA DE BASE DE DATOS
# =====================================================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =====================================================
# 🧩 SCHEMAS (Pydantic)
# =====================================================
class RegisterSchema(BaseModel):
    nombre: str
    apellido: str
    edad: int
    gmail: EmailStr
    password: str
    # ✅ CORRECCIÓN: Quitamos los valores por defecto y 'None' para hacerlos requeridos.
    role: str 
    region: str 

    # ✅ VALIDADOR: Asegura que la región sea una de las opciones permitidas.
    @field_validator('region')
    @classmethod
    def validate_region(cls, value: str):
        allowed_regions = ["Lima (Costa)", "Cusco (Sierra)", "Iquitos (Selva)"]
        if value not in allowed_regions:
            # Pydantic automáticamente traduce este ValueError a un 422 con detalles
            raise ValueError(f"Región inválida: '{value}'. Debe ser una de: {', '.join(allowed_regions)}")
        return value


class LoginSchema(BaseModel):
    gmail: EmailStr
    password: str


# =====================================================
# 🔧 HELPER: Convertir modelo a dict seguro
# =====================================================
def user_to_dict(user: models.User):
    return {
        "id": user.id,
        "nombre": user.nombre,
        "apellido": user.apellido,
        "edad": user.edad,
        "gmail": user.gmail,
        "role": user.role,
        "region": user.region,
    }


# =====================================================
# 🧾 REGISTRO DE USUARIO
# =====================================================
@router.post("/register")
def register_user(payload: RegisterSchema, db: Session = Depends(get_db)):
    # 1️⃣ Verificar si ya existe
    existing = db.query(models.User).filter(models.User.gmail == payload.gmail).first()
    if existing:
        raise HTTPException(status_code=400, detail="El usuario ya existe")

    # 2️⃣ Crear nuevo usuario (hasheando la contraseña)
    hashed_pw = models.User.hash_password(payload.password)
    new_user = models.User(
        nombre=payload.nombre,
        apellido=payload.apellido,
        edad=payload.edad,
        gmail=payload.gmail,
        password=hashed_pw,
        role=payload.role,
        region=payload.region,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # 3️⃣ Generar token temporal (puedes reemplazar luego con JWT)
    token = f"fake-token-{secrets.token_hex(16)}"

    return {
        "success": True,
        "user": user_to_dict(new_user),
        "token": token,
        "message": "Usuario registrado correctamente",
    }


# =====================================================
# 🔐 LOGIN DE USUARIO
# =====================================================
@router.post("/login")
def login_user(payload: LoginSchema, db: Session = Depends(get_db)):
    # 1️⃣ Buscar usuario
    user = db.query(models.User).filter(models.User.gmail == payload.gmail).first()
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    # 2️⃣ Verificar contraseña
    if not user.verify_password(payload.password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    # 3️⃣ Generar token temporal
    token = f"fake-token-{secrets.token_hex(16)}"

    return {
        "success": True,
        "user": user_to_dict(user),
        "token": token,
        "message": "Login exitoso",
    }