const BASE_URL = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export function buildImageUrl(path, size = 'w500') {
    if (!path) return null
    return `${IMAGE_BASE_URL}/${size}${path}`
}

async function tmdbFetch(path, params = {}) {
    const url = new URL(`${BASE_URL}${path}`)
    url.searchParams.set('language', 'fr-FR')

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            url.searchParams.set(key, value)
        }
    })

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    if (!response.ok) {
        throw new Error(`Erreur TMDB (${response.status})`)
    }

    return response.json()
}

export function getGenres() {
    return tmdbFetch('/genre/movie/list')
}

export function discoverMovies({ page = 1, genreId } = {}) {
    return tmdbFetch('/discover/movie', {
        page,
        sort_by: 'popularity.desc',
        with_genres: genreId || undefined,
    })
}

export function searchMovies({ query, page = 1 }) {
    return tmdbFetch('/search/movie', { query, page })
}

export function getMovieDetails(id) {
    return tmdbFetch(`/movie/${id}`, { append_to_response: 'credits,videos' })
}

export function getRecommendations(id) {
    return tmdbFetch(`/movie/${id}/recommendations`)
}

export function getTrendingMovies(timeWindow = 'week') {
    return tmdbFetch(`/trending/movie/${timeWindow}`)
}

export function getTopRatedMovies(page = 1) {
    return tmdbFetch('/movie/top_rated', { page })
}

export function getNowPlayingMovies(page = 1) {
    return tmdbFetch('/movie/now_playing', { page })
}

export function getUpcomingMovies(page = 1) {
    return tmdbFetch('/movie/upcoming', { page })
}
