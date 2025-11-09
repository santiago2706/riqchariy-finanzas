import json
import bcrypt

USERS_FILE = "users.json"

def load_users():
    try:
        with open(USERS_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=4)

def find_user_by_email(email):
    users = load_users()
    for u in users:
        if u["gmail"] == email:
            return u
    return None

def create_user(nombre, apellido, edad, gmail, password):
    users = load_users()
    if find_user_by_email(gmail):
        return None  # Ya existe el usuario

    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    new_user = {
        "nombre": nombre,
        "apellido": apellido,
        "edad": edad,
        "gmail": gmail,
        "password": hashed_pw
    }
    users.append(new_user)
    save_users(users)
    return new_user