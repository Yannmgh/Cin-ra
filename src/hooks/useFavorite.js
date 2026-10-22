import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCurrentUser } from '../features/auth/authSlice.js'
import { toggleFavorite, selectFavoritesForUser } from '../features/favorites/favoritesSlice.js'

// Centralise la logique de bascule des favoris : si personne n'est connecté,
// on redirige vers la connexion au lieu de planter silencieusement.
function useFavorite(movie) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector(selectCurrentUser)
    const favorites = useSelector(selectFavoritesForUser(currentUser?.username))
    const isFavorite = favorites.some((item) => item.id === movie.id)

    function toggle() {
        if (!currentUser) {
            navigate('/login')
            return
        }

        dispatch(toggleFavorite({
            username: currentUser.username,
            movie: {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
            },
        }))
    }

    return { isFavorite, toggle, isLoggedIn: Boolean(currentUser) }
}

export default useFavorite
