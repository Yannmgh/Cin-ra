import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { discoverMovies, searchMovies, getGenres } from '../../services/tmdbService.js'

export const fetchGenres = createAsyncThunk('movies/fetchGenres', async () => {
    const data = await getGenres()
    return data.genres
})

export const fetchDiscoverMovies = createAsyncThunk(
    'movies/fetchDiscoverMovies',
    async ({ page = 1, genreId } = {}) => discoverMovies({ page, genreId }),
)

export const fetchSearchMovies = createAsyncThunk(
    'movies/fetchSearchMovies',
    async ({ query, page = 1 }) => searchMovies({ query, page }),
)

const initialState = {
    genres: {
        items: [],
        status: 'idle',
    },
    discover: {
        items: [],
        page: 1,
        totalPages: 1,
        genreId: null,
        status: 'idle',
        error: null,
    },
    search: {
        items: [],
        page: 1,
        totalPages: 1,
        query: '',
        status: 'idle',
        error: null,
    },
}

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setDiscoverGenre(state, action) {
            state.discover.genreId = action.payload
            state.discover.page = 1
        },
        setDiscoverPage(state, action) {
            state.discover.page = action.payload
        },
        setSearchQuery(state, action) {
            state.search.query = action.payload
            state.search.page = 1
        },
        setSearchPage(state, action) {
            state.search.page = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.genres.status = 'loading'
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.genres.status = 'succeeded'
                state.genres.items = action.payload
            })
            .addCase(fetchGenres.rejected, (state) => {
                state.genres.status = 'failed'
            })

            .addCase(fetchDiscoverMovies.pending, (state) => {
                state.discover.status = 'loading'
                state.discover.error = null
            })
            .addCase(fetchDiscoverMovies.fulfilled, (state, action) => {
                state.discover.status = 'succeeded'
                state.discover.items = action.payload.results
                state.discover.page = action.payload.page
                state.discover.totalPages = action.payload.total_pages
            })
            .addCase(fetchDiscoverMovies.rejected, (state, action) => {
                state.discover.status = 'failed'
                state.discover.error = action.error.message
            })

            .addCase(fetchSearchMovies.pending, (state) => {
                state.search.status = 'loading'
                state.search.error = null
            })
            .addCase(fetchSearchMovies.fulfilled, (state, action) => {
                state.search.status = 'succeeded'
                state.search.items = action.payload.results
                state.search.page = action.payload.page
                state.search.totalPages = action.payload.total_pages
            })
            .addCase(fetchSearchMovies.rejected, (state, action) => {
                state.search.status = 'failed'
                state.search.error = action.error.message
            })
    },
})

export const { setDiscoverGenre, setDiscoverPage, setSearchQuery, setSearchPage } = moviesSlice.actions
export default moviesSlice.reducer

export const selectGenres = (state) => state.movies.genres.items
export const selectDiscover = (state) => state.movies.discover
export const selectSearch = (state) => state.movies.search
