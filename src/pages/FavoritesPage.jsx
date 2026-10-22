import { useSelector } from 'react-redux'
import MovieGrid from '../components/movies/MovieGrid.jsx'
import { selectCurrentUser } from '../features/auth/authSlice.js'
import { selectFavoritesForUser } from '../features/favorites/favoritesSlice.js'

function FavoritesPage() {
    const currentUser = useSelector(selectCurrentUser)
    const favorites = useSelector(selectFavoritesForUser(currentUser?.username))

    return (
        <div>
            <h1 className='mb-4'>Mes favoris</h1>
            { favorites.length === 0 ? (
                <p className='text-muted'>Tu n'as encore ajouté aucun film à tes favoris.</p>
            ) : (
                <MovieGrid movies={favorites} />
            ) }
        </div>
    )
}

export default FavoritesPage
