import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GenreFilter from '../components/movies/GenreFilter.jsx'
import MovieGrid from '../components/movies/MovieGrid.jsx'
import Pagination from '../components/movies/Pagination.jsx'
import SkeletonGrid from '../components/movies/SkeletonGrid.jsx'
import ErrorState from '../components/movies/ErrorState.jsx'
import {
    fetchGenres,
    fetchDiscoverMovies,
    setDiscoverPage,
    selectDiscover,
} from '../features/movies/moviesSlice.js'

function DiscoverPage() {
    const dispatch = useDispatch()
    const discover = useSelector(selectDiscover)

    useEffect(() => {
        dispatch(fetchGenres())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchDiscoverMovies({ page: discover.page, genreId: discover.genreId }))
    }, [dispatch, discover.page, discover.genreId])

    return (
        <div>
            <h1 className='mb-4'>Découvrir</h1>
            <GenreFilter value={discover.genreId} />

            { discover.status === 'loading' && <SkeletonGrid /> }
            { discover.status === 'failed' && <ErrorState message={discover.error} /> }
            { discover.status === 'succeeded' && (
                <>
                    <MovieGrid movies={discover.items} />
                    <Pagination
                        page={discover.page}
                        totalPages={discover.totalPages}
                        onPageChange={(page) => dispatch(setDiscoverPage(page))}
                    />
                </>
            ) }
        </div>
    )
}

export default DiscoverPage
