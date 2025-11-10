from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import models  # ✅ Importación absoluta
from database import SessionLocal  # ✅ Importación absoluta

router = APIRouter()

# =====================================================
# ⚙️ DEPENDENCIA DE BASE DE DATOS
# =====================================================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =====================================================
# 🧩 ENDPOINT: REGISTRO DE USUARIOS
# =====================================================
@router.post("/register")
def register_user(
    nombre: str,
    apellido: str,
    edad: int,
    gmail: str,
    password: str,
    db: Session = Depends(get_db)
):
    existing = db.query(models.User).filter(models.User.gmail == gmail).first()
    if existing:
        raise HTTPException(status_code=400, detail="El usuario ya existe")

    hashed_pw = models.User.hash_password(password)
    new_user = models.User(
        nombre=nombre,
        apellido=apellido,
        edad=edad,
        gmail=gmail,
        password=hashed_pw
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Usuario registrado correctamente", "user_id": new_user.id}


# =====================================================
# 🧠 ENDPOINT: LOGIN DE USUARIOS
# =====================================================
@router.post("/login")
def login_user(
    gmail: str,
    password: str,
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.gmail == gmail).first()
    if not user or not user.verify_password(password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    return {"message": f"Bienvenido, {user.nombre}"}
