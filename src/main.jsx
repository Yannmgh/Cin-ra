import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './styles/bootstrap-theme.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import App from './App.jsx'
import store from './app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* basename = import.meta.env.BASE_URL : reprend automatiquement le "base" de vite.config.js
          (ex: "/Cin-ra/" en production sur GitHub Pages, "/" en local) pour que le routeur sache
          qu'il tourne dans un sous-dossier, au lieu de chercher "/" à la racine du domaine. */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
