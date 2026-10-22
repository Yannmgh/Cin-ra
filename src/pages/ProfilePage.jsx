import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button, Row, Col } from 'react-bootstrap'
import Avatar from '../components/layout/Avatar.jsx'
import { buildImageUrl } from '../services/tmdbService.js'
import { selectCurrentUser, logout } from '../features/auth/authSlice.js'
import { selectFavoritesForUser } from '../features/favorites/favoritesSlice.js'

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

function ProfilePage() {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const favorites = useSelector(selectFavoritesForUser(currentUser?.username))

    function handleLogout() {
        // Pas besoin de navigate() : on est forcément sur une page protégée (le
        // profil), donc RequireAuth prend le relais tout seul vers /login.
        dispatch(logout())
    }

    if (!currentUser) return null

    const memberSince = currentUser.createdAt ? dateFormatter.format(new Date(currentUser.createdAt)) : null

    return (
        <div>
            <h1 className='mb-4'>Mon profil</h1>

            <Card className='shadow-sm border-0 mb-4'>
                <Card.Body className='p-4'>
                    <div className='d-flex align-items-center gap-3 mb-4'>
                        <Avatar username={currentUser.username} size={64} />
                        <div>
                            <h2 className='h4 mb-1'>{currentUser.username}</h2>
                            <p className='text-muted mb-0'>{currentUser.email}</p>
                        </div>
                    </div>

                    <Row className='g-3 mb-4'>
                        <Col xs={6} md={4}>
                            <div className='profile-stat'>
                                <p className='profile-stat__value'>{favorites.length}</p>
                                <p className='profile-stat__label'>Favori{favorites.length > 1 ? 's' : ''}</p>
                            </div>
                        </Col>
                        { memberSince && (
                            <Col xs={6} md={4}>
                                <div className='profile-stat'>
                                    <p className='profile-stat__value profile-stat__value--small'>{memberSince}</p>
                                    <p className='profile-stat__label'>Membre depuis</p>
                                </div>
                            </Col>
                        ) }
                    </Row>

                    <Button variant='outline-light' onClick={handleLogout}>
                        Se déconnecter
                    </Button>
                </Card.Body>
            </Card>

            <div className='d-flex align-items-center justify-content-between mb-3'>
                <h2 className='h5 mb-0'>Mes favoris</h2>
                { favorites.length > 0 && (
                    <Link to='/favorites' className='small'>Tout voir →</Link>
                ) }
            </div>

            { favorites.length === 0 ? (
                <p className='text-muted'>
                    Tu n'as pas encore de favoris. <Link to='/discover'>Découvrir des films</Link>
                </p>
            ) : (
                <div className='profile-favorites-preview'>
                    { favorites.slice(0, 6).map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id} className='profile-favorites-preview__item'>
                            { movie.poster_path ? (
                                <img src={buildImageUrl(movie.poster_path, 'w185')} alt={movie.title} />
                            ) : (
                                <div className='profile-favorites-preview__placeholder'>{movie.title}</div>
                            ) }
                        </Link>
                    )) }
                </div>
            ) }
        </div>
    )
}

export default ProfilePage
