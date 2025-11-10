// src/services/authApi.js
import apiClient from "./apiClient";

// login (body JSON)
export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/login", {
      gmail: email,
      password,
    });
    return response.data; // { success, user, token, message }
  } catch (error) {
    console.error("Error en login:", error);
    // devolver estructura esperada por el store
    return { success: false, message: error.response?.data?.detail || "Error al conectar con el servidor" };
  }
};

// register (body JSON)
export const register = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
    return response.data; // { success, user, token, message }
  } catch (error) {
    console.error("Error en register:", error);
    return { success: false, message: error.response?.data?.detail || "Error al registrar el usuario" };
  }
};
