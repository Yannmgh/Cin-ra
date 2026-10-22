import { Link } from 'react-router-dom'
import { Button, Badge } from 'react-bootstrap'
import { buildImageUrl } from '../../services/tmdbService.js'
import useFavorite from '../../hooks/useFavorite.js'

function HeroBanner({ movie }) {
    const { isFavorite, toggle } = useFavorite(movie ?? {})

    if (!movie) return null

    return (
        <div
            className='hero-banner mb-5'
            style={movie.backdrop_path ? { backgroundImage: `url(${buildImageUrl(movie.backdrop_path, 'original')})` } : undefined}
        >
            <div className='hero-banner__overlay'>
                <div className='hero-banner__content'>
                    <Badge bg='primary' text='dark' className='mb-3'>Tendance du moment</Badge>
                    <h1 className='hero-banner__title'>{movie.title}</h1>
                    <p className='hero-banner__overview'>{movie.overview}</p>
                    <div className='d-flex flex-wrap gap-3'>
                        <Button as={Link} to={`/movie/${movie.id}`} variant='primary' size='lg'>
                            ▶ Voir les détails
                        </Button>
                        <Button
                            variant={isFavorite ? 'light' : 'outline-light'}
                            size='lg'
                            onClick={toggle}
                        >
                            { isFavorite ? '♥ Dans mes favoris' : '♡ Ajouter aux favoris' }
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner
