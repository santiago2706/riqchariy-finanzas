<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
        Crear cuenta
      </h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tu nombre"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Correo</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="tucorreo@example.com"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Registrarme
        </button>
      </form>

      <p class="text-sm text-gray-500 text-center mt-4">
        ¿Ya tienes cuenta?
        <a href="/login" class="text-blue-600 hover:underline">Inicia sesión</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  name: "",
  email: "",
  password: "",
});

function handleRegister() {
  // Aquí puedes conectar con tu API o backend
  console.log("Datos enviados:", form);
  alert(`Usuario ${form.name} registrado correctamente`);
}
</script>