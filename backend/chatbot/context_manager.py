from sqlalchemy.orm import Session
from models import TemaFinanciero  # ✅ Importación absoluta (sin '..')

def buscar_contexto(db: Session, pregunta: str):
    """
    Busca en la base de datos un tema financiero que coincida con la pregunta del usuario.
    Si encuentra una coincidencia parcial en el nombre del tema, devuelve su descripción.
    """
    temas = db.query(TemaFinanciero).all()
    for tema in temas:
        if tema.nombre.lower() in pregunta.lower():
            return tema.descripcion
    return None
