import MovieCard from './MovieCard.jsx'

function MovieRow({ title, movies }) {
    if (!movies || movies.length === 0) return null

    return (
        <section className='movie-row mb-5'>
            <h2 className='movie-row__title h4 mb-3'>{title}</h2>
            <div className='movie-row__track'>
                { movies.map((movie) => (
                    <div className='movie-row__item' key={movie.id}>
                        <MovieCard movie={movie} compact />
                    </div>
                )) }
            </div>
        </section>
    )
}

export default MovieRow
