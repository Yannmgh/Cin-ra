import { Card, Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useFavorite from '../../hooks/useFavorite.js'
import { buildImageUrl } from '../../services/tmdbService.js'

function MovieCard({ movie, compact = false }) {
    const { isFavorite, toggle } = useFavorite(movie)

    const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '—'

    return (
        <Card className={`movie-card h-100 shadow-sm border-0${compact ? ' movie-card--compact' : ''}`}>
            <Link to={`/movie/${movie.id}`} className='text-decoration-none text-reset'>
                <div className='movie-card__poster'>
                    { movie.poster_path ? (
                        <Card.Img variant='top' src={buildImageUrl(movie.poster_path, 'w342')} alt={movie.title} />
                    ) : (
                        <div className='movie-card__poster-placeholder'>Pas d'affiche</div>
                    ) }
                    <Badge bg='warning' text='dark' className='movie-card__rating'>★ {rating}</Badge>
                </div>
                <Card.Body>
                    <Card.Title className='movie-card__title'>{movie.title}</Card.Title>
                    <Card.Text className='text-muted small mb-0'>{year}</Card.Text>
                    { !compact && movie.overview && (
                        <Card.Text className='movie-card__overview small mt-2 mb-0'>
                            {movie.overview}
                        </Card.Text>
                    ) }
                </Card.Body>
            </Link>
            <Button
                variant={isFavorite ? 'danger' : 'outline-secondary'}
                size='sm'
                className='movie-card__favorite'
                onClick={toggle}
            >
                { isFavorite ? '♥ Retirer des favoris' : '♡ Ajouter aux favoris' }
            </Button>
        </Card>
    )
}

export default MovieCard
