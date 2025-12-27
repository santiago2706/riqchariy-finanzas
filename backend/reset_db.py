from database import engine, Base
import models
# Explicitly import all models if needed, but 'import models' should trigger their definition if they are top-level.
from models import User, Institution, Classroom, ProductDB

print("Resetting database...")
try:
    Base.metadata.drop_all(bind=engine)
    print("Tables dropped.")
    Base.metadata.create_all(bind=engine)
    print("Tables created.")
except Exception as e:
    print(f"Error: {e}")
