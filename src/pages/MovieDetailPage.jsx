import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Button, Row, Col } from 'react-bootstrap'
import LoadingState from '../components/movies/LoadingState.jsx'
import ErrorState from '../components/movies/ErrorState.jsx'
import MovieRow from '../components/movies/MovieRow.jsx'
import { buildImageUrl } from '../services/tmdbService.js'
import useFavorite from '../hooks/useFavorite.js'
import {
    fetchMovieDetails,
    fetchRecommendations,
    clearMovieDetail,
    selectMovieDetail,
    selectMovieDetailStatus,
    selectMovieDetailError,
    selectRecommendations,
} from '../features/movieDetail/movieDetailSlice.js'

const STATUS_LABELS = {
    Released: 'Sorti',
    'Post Production': 'En post-production',
    'In Production': 'En production',
    Planned: 'Prévu',
    Rumored: 'Rumeur',
    Canceled: 'Annulé',
}

const languageNames = new Intl.DisplayNames(['fr'], { type: 'language' })
const currencyFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function formatRuntime(minutes) {
    if (!minutes) return null
    const hours = Math.floor(minutes / 60)
    const rest = minutes % 60
    return `${hours}h${String(rest).padStart(2, '0')}`
}

function formatLanguage(code) {
    if (!code) return null
    try {
        return languageNames.of(code)
    } catch {
        return code
    }
}

function MovieDetailPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const movie = useSelector(selectMovieDetail)
    const status = useSelector(selectMovieDetailStatus)
    const error = useSelector(selectMovieDetailError)
    const recommendations = useSelector(selectRecommendations)
    const { isFavorite, toggle } = useFavorite(movie ?? {})

    useEffect(() => {
        dispatch(fetchMovieDetails(id))
        dispatch(fetchRecommendations(id))
        return () => dispatch(clearMovieDetail())
    }, [dispatch, id])

    if (status === 'loading' || status === 'idle') return <LoadingState label='Chargement du film...' />
    if (status === 'failed') return <ErrorState message={error} />
    if (!movie) return null

    const trailer = movie.videos?.results?.find((video) => video.type === 'Trailer' && video.site === 'YouTube')
    const cast = movie.credits?.cast?.slice(0, 8) ?? []

    return (
        <div className='movie-detail'>
            { movie.backdrop_path && (
                <div
                    className='movie-detail__backdrop'
                    style={{ backgroundImage: `url(${buildImageUrl(movie.backdrop_path, 'w1280')})` }}
                />
            ) }

            <Row className='g-4 movie-detail__content'>
                <Col md={4} lg={3}>
                    { movie.poster_path && (
                        <img
                            src={buildImageUrl(movie.poster_path, 'w342')}
                            alt={movie.title}
                            className='img-fluid rounded shadow'
                        />
                    ) }
                </Col>
                <Col md={8} lg={9}>
                    <h1>{movie.title}</h1>
                    { movie.tagline && <p className='fst-italic text-muted'>{movie.tagline}</p> }

                    <div className='d-flex flex-wrap gap-2 mb-3'>
                        <Badge bg='warning' text='dark'>
                            ★ {movie.vote_average?.toFixed(1)} ({movie.vote_count} votes)
                        </Badge>
                        { movie.release_date && <Badge bg='secondary'>{movie.release_date.slice(0, 4)}</Badge> }
                        { formatRuntime(movie.runtime) && (
                            <Badge bg='secondary'>{formatRuntime(movie.runtime)}</Badge>
                        ) }
                        { movie.genres?.map((genre) => (
                            <Badge bg='info' text='dark' key={genre.id}>{genre.name}</Badge>
                        )) }
                    </div>

                    <p className='mb-4'>{movie.overview || 'Pas de synopsis disponible.'}</p>

                    <div className='d-flex flex-wrap gap-3 mb-4'>
                        <Button
                            variant={isFavorite ? 'danger' : 'outline-primary'}
                            onClick={toggle}
                        >
                            { isFavorite ? '♥ Retirer des favoris' : '♡ Ajouter aux favoris' }
                        </Button>
                        { movie.homepage && (
                            <Button variant='outline-light' href={movie.homepage} target='_blank' rel='noreferrer'>
                                Site officiel ↗
                            </Button>
                        ) }
                    </div>

                    <dl className='movie-detail__facts row mb-4'>
                        { movie.status && (
                            <>
                                <dt className='col-sm-3'>Statut</dt>
                                <dd className='col-sm-9'>{STATUS_LABELS[movie.status] ?? movie.status}</dd>
                            </>
                        ) }
                        { formatLanguage(movie.original_language) && (
                            <>
                                <dt className='col-sm-3'>Langue originale</dt>
                                <dd className='col-sm-9 text-capitalize'>{formatLanguage(movie.original_language)}</dd>
                            </>
                        ) }
                        { movie.budget > 0 && (
                            <>
                                <dt className='col-sm-3'>Budget</dt>
                                <dd className='col-sm-9'>{currencyFormatter.format(movie.budget)}</dd>
                            </>
                        ) }
                        { movie.revenue > 0 && (
                            <>
                                <dt className='col-sm-3'>Recettes</dt>
                                <dd className='col-sm-9'>{currencyFormatter.format(movie.revenue)}</dd>
                            </>
                        ) }
                        { movie.production_companies?.length > 0 && (
                            <>
                                <dt className='col-sm-3'>Production</dt>
                                <dd className='col-sm-9'>
                                    {movie.production_companies.map((company) => company.name).join(', ')}
                                </dd>
                            </>
                        ) }
                    </dl>

                    { trailer && (
                        <div className='mb-4'>
                            <h2 className='h5'>Bande-annonce</h2>
                            <div className='ratio ratio-16x9'>
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title='Bande-annonce'
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    ) }

                    { cast.length > 0 && (
                        <div>
                            <h2 className='h5'>Casting</h2>
                            <Row className='g-3'>
                                { cast.map((member) => (
                                    <Col xs={6} sm={4} md={3} key={member.credit_id}>
                                        <div className='cast-card'>
                                            { member.profile_path ? (
                                                <img
                                                    src={buildImageUrl(member.profile_path, 'w185')}
                                                    alt={member.name}
                                                    className='img-fluid rounded'
                                                />
                                            ) : (
                                                <div className='cast-card__placeholder'>?</div>
                                            ) }
                                            <p className='small mb-0 mt-1 fw-semibold'>{member.name}</p>
                                            <p className='small text-muted'>{member.character}</p>
                                        </div>
                                    </Col>
                                )) }
                            </Row>
                        </div>
                    ) }
                </Col>
            </Row>

            { recommendations.items.length > 0 && (
                <div className='mt-5'>
                    <MovieRow title='Vous aimerez aussi' movies={recommendations.items} />
                </div>
            ) }

            <Link to='/' className='d-inline-block mt-2'>&larr; Retour à l'accueil</Link>
        </div>
    )
}

export default MovieDetailPage
