// frontend/src/config/api.js

const isProduction = import.meta.env.MODE === "production";

export const API_URL = isProduction
  ? "https://tu-backend.azurewebsites.net" // 🌐 dominio de Azure
  : "http://127.0.0.1:8000"; // 🧑‍💻 entorno local
