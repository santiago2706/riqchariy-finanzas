// src/services/authApi.js
import apiClient from "./apiClient";

// 🔐 Iniciar sesión
export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/login", null, {
      params: { gmail: email, password },
    });
    return response.data; // { success, user, token, message }
  } catch (error) {
    console.error("Error en login:", error);
    return { success: false, message: "Error al conectar con el servidor" };
  }
};

// 🧾 Registrar usuario
export const register = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register", null, {
      params: userData,
    });
    return response.data; // { success, user, token, message }
  } catch (error) {
    console.error("Error en register:", error);
    return { success: false, message: "Error al registrar el usuario" };
  }
};
