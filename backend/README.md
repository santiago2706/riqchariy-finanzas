# Backend - Riqchariy Finanzas

## 📋 Descripción

Backend API REST construido con **FastAPI** para la plataforma educativa Riqchariy Finanzas.

## 🏗️ Estructura del Proyecto

```
backend/
├── app/
│   ├── __init__.py          # Paquete principal
│   ├── main.py               # Entry point FastAPI
│   ├── core/                 # Configuración central
│   │   ├── config.py         # Variables de entorno
│   │   └── security.py       # JWT, autenticación
│   ├── modules/              # Módulos de dominio
│   │   ├── auth/             # Autenticación
│   │   ├── game/             # Estado del juego
│   │   ├── market/           # Mercado/Kiosco
│   │   └── chatbot/          # Chatbot IA
│   └── shared/               # Utilidades compartidas
│       ├── dependencies.py   # Dependencias FastAPI
│       └── exceptions.py     # Excepciones HTTP
├── tests/                    # Pruebas unitarias
├── requirements.txt          # Dependencias Python
└── .env.example              # Plantilla de variables
```

## 🚀 Inicio Rápido

```bash
# 1. Crear entorno virtual
python -m venv venv
venv\Scripts\activate  # Windows

# 2. Instalar dependencias
pip install -r requirements.txt

# 3. Copiar variables de entorno
copy .env.example .env

# 4. Ejecutar servidor
uvicorn app.main:app --reload
```

## 📡 Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/login` | Login de usuario |
| POST | `/auth/register` | Registro de usuario |
| POST | `/api/game/save` | Guardar partida |
| GET | `/api/game/load` | Cargar partida |
| POST | `/api/mercado/actualizar` | Actualizar precios |
| POST | `/api/mercado/avanzar-dia` | Avanzar día |
| POST | `/api/chatbot` | Chat con IA |

## 📚 Documentación API

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
