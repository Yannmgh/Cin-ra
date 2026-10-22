import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import AppNavbar from './components/layout/AppNavbar.jsx'
import Footer from './components/layout/Footer.jsx'
import RequireAuth from './components/auth/RequireAuth.jsx'
import HomePage from './pages/HomePage.jsx'
import DiscoverPage from './pages/DiscoverPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import MovieDetailPage from './pages/MovieDetailPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import './App.css'

function App() {
  return (
    <>
      <AppNavbar />
      <Container className='pb-5 flex-grow-1'>
        <Routes>
          {/* L'accueil reste public (vitrine) ; tout le reste nécessite un compte. */}
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/discover'
            element={<RequireAuth><DiscoverPage /></RequireAuth>}
          />
          <Route
            path='/search'
            element={<RequireAuth><SearchPage /></RequireAuth>}
          />
          <Route
            path='/movie/:id'
            element={<RequireAuth><MovieDetailPage /></RequireAuth>}
          />
          <Route
            path='/favorites'
            element={<RequireAuth><FavoritesPage /></RequireAuth>}
          />
          <Route
            path='/profile'
            element={<RequireAuth><ProfilePage /></RequireAuth>}
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Container>
      <Footer />
    </>
  )
}

export default App
