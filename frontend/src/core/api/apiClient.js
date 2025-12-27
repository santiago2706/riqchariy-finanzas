// src/services/apiClient.js
import axios from "axios";
import { API_URL } from "../../config/api"; // ✅ Usa la ruta relativa correcta

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // ⏱️ Mantén el timeout si quieres evitar esperas infinitas
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Interceptor opcional para incluir token JWT automáticamente
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
