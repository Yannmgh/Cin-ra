import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeroBanner from '../components/movies/HeroBanner.jsx'
import MovieRow from '../components/movies/MovieRow.jsx'
import SkeletonRow from '../components/movies/SkeletonRow.jsx'
import {
    fetchTrending,
    fetchTopRated,
    fetchNowPlaying,
    fetchUpcoming,
    selectTrending,
    selectTopRated,
    selectNowPlaying,
    selectUpcoming,
} from '../features/home/homeSlice.js'

function HomePage() {
    const dispatch = useDispatch()
    const trending = useSelector(selectTrending)
    const topRated = useSelector(selectTopRated)
    const nowPlaying = useSelector(selectNowPlaying)
    const upcoming = useSelector(selectUpcoming)

    useEffect(() => {
        dispatch(fetchTrending())
        dispatch(fetchTopRated())
        dispatch(fetchNowPlaying())
        dispatch(fetchUpcoming())
    }, [dispatch])

    const featuredMovie = trending.items[trending.featuredIndex] ?? null

    if (trending.status === 'loading' && trending.items.length === 0) {
        return (
            <div>
                <div className='hero-banner skeleton mb-5' />
                <SkeletonRow />
            </div>
        )
    }

    return (
        <div>
            <HeroBanner movie={featuredMovie} />
            <MovieRow title='Tendances du moment' movies={trending.items} />
            <MovieRow title="À l'affiche" movies={nowPlaying.items} />
            <MovieRow title='Les mieux notés' movies={topRated.items} />
            <MovieRow title='Bientôt disponibles' movies={upcoming.items} />
        </div>
    )
}

export default HomePage
