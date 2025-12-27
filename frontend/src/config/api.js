// frontend/src/config/api.js

const isProduction = import.meta.env.MODE === "production";

export const API_URL = isProduction
  ? "https://riqchariy-backend-headc9h8b7dye6h8.canadacentral-01.azurewebsites.net" // 🌐 dominio de Azure
  : "http://127.0.0.1:8000"; // 🧑‍💻 entorno local
