// src/services/transactionApi.js
import apiClient from "./apiClient";
import { useAuthStore } from "../stores/useAuthStore";
import { useKioscoStore } from "../stores/useKioscoStore";

/**
 * Guarda el estado del juego en el backend
 * POST /api/game/save
 */
export const saveGameToApi = async (saldo, inventario) => {
  const kioscoStore = useKioscoStore();
  const day = kioscoStore.day;

  try {
    const response = await apiClient.post("/api/game/save", {
      saldo,
      inventario,
      day,
    });
    console.log("[API]: Juego guardado con éxito", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al guardar el juego:", error);
    return { status: 500, message: "Error al guardar en el servidor" };
  }
};

/**
 * Carga el estado del juego
 * GET /api/game/load?region=...
 */
export const fetchGameState = async () => {
  const authStore = useAuthStore();
  if (!authStore.user?.region) {
    throw new Error("Usuario no autenticado o sin región");
  }

  try {
    const response = await apiClient.get("/api/game/load", {
      params: { region: authStore.user.region },
    });
    console.log("[API]: Estado de juego cargado", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al cargar el juego:", error);
    throw error;
  }
};

/**
 * Avanza el día del mercado
 * POST /api/mercado/avanzar-dia
 */
export const advanceMarketDay = async (payload) => {
  try {
    const response = await apiClient.post("/api/mercado/avanzar-dia", payload);
    return response.data;
  } catch (error) {
    console.error("Error al avanzar día:", error);
    return { success: false, message: "Error al avanzar el día" };
  }
};
