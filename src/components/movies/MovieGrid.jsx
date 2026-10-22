import { Row, Col } from 'react-bootstrap'
import MovieCard from './MovieCard.jsx'

function MovieGrid({ movies }) {
    if (movies.length === 0) {
        return <p className='text-muted'>Aucun film à afficher.</p>
    }

    return (
        <Row className='g-4'>
            { movies.map((movie) => (
                <Col key={movie.id} xs={6} md={4} lg={3}>
                    <MovieCard movie={movie} />
                </Col>
            )) }
        </Row>
    )
}

export default MovieGrid
