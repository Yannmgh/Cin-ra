import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Le site est servi depuis https://<user>.github.io/Cin-ra/ (page de projet,
  // pas un domaine racine) : il faut indiquer ce sous-dossier pour que les assets
  // (JS/CSS/images) se chargent avec le bon chemin.
  base: '/Cin-ra/',
  plugins: [react()],
})
