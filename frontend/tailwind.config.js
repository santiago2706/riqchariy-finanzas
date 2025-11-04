/** @type {import('tailwindcss').Config} */
// Usamos 'export default' (ESM) para que coincida con vite.config.js
export default {
  // 1. ESTA ES LA SECCIÓN MÁS IMPORTANTE
  // Le dice a Tailwind: "Escanea estos archivos en busca de clases"
  // Esto arregla el error original de 'bg-indigo-600'
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}" // <-- ¡Esta línea llena el "diccionario"!
  ],

  theme: {
    extend: {},
  },
  plugins: [],
}
