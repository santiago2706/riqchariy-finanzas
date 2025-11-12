import os
import sys
from logging.config import fileConfig
from sqlalchemy import pool
from alembic import context

# --------------------------------------------------------------------------
# 🔧 Configuración base
# --------------------------------------------------------------------------
config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# --------------------------------------------------------------------------
# 💡 Ajuste para importar tus módulos correctamente
# --------------------------------------------------------------------------
# Agrega el path del backend al sistema
sys.path.append(os.getcwd())

# --------------------------------------------------------------------------
# 🧩 Importa tus módulos reales del proyecto
# --------------------------------------------------------------------------
from database import Base, engine  # tu Base y motor de SQLAlchemy
import models  # importa todos tus modelos para autogenerate

# --------------------------------------------------------------------------
# 🎯 Define la metadata objetivo (para detectar cambios)
# --------------------------------------------------------------------------
target_metadata = Base.metadata


# --------------------------------------------------------------------------
# 🚀 Migraciones en modo OFFLINE
# --------------------------------------------------------------------------
def run_migrations_offline():
    """Ejecuta las migraciones sin conexión directa (solo genera SQL)."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


# --------------------------------------------------------------------------
# 🚀 Migraciones en modo ONLINE
# --------------------------------------------------------------------------
def run_migrations_online():
    """Ejecuta las migraciones conectándose a la base real."""
    connectable = engine  # usamos el mismo engine de tu database.py

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


# --------------------------------------------------------------------------
# ⚙️ Ejecutar según el modo (offline/online)
# --------------------------------------------------------------------------
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
