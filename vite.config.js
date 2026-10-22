import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Le site de prod est servi depuis https://<user>.github.io/Cin-ra/ (page de
  // projet, pas un domaine racine) : il faut indiquer ce sous-dossier pour que les
  // assets (JS/CSS/images) se chargent avec le bon chemin. En dev, on garde "/"
  // pour que localhost:5173 fonctionne normalement sans préfixe.
  base: command === 'build' ? '/Cin-ra/' : '/',
  plugins: [react()],
}))
