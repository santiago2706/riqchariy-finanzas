// Usamos 'export default' (ESM) para que coincida con vite.config.js
export default {
  plugins: {
    // 1. Usamos el plugin que el error te pidió instalar
    '@tailwindcss/postcss': {},

    // 2. Autoprefixer (buena práctica para compatibilidad con navegadores)
    autoprefixer: {},
  },
}
