import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    getTrendingMovies,
    getTopRatedMovies,
    getNowPlayingMovies,
    getUpcomingMovies,
} from '../../services/tmdbService.js'

export const fetchTrending = createAsyncThunk('home/fetchTrending', () => getTrendingMovies())
export const fetchTopRated = createAsyncThunk('home/fetchTopRated', () => getTopRatedMovies())
export const fetchNowPlaying = createAsyncThunk('home/fetchNowPlaying', () => getNowPlayingMovies())
export const fetchUpcoming = createAsyncThunk('home/fetchUpcoming', () => getUpcomingMovies())

const emptyRow = { items: [], status: 'idle', error: null }

const initialState = {
    // featuredIndex : calculé une seule fois à la réception des données (dans le reducer,
    // pas pendant le rendu ni dans un effect) pour mettre en avant un film différent à chaque visite.
    trending: { ...emptyRow, featuredIndex: 0 },
    topRated: { ...emptyRow },
    nowPlaying: { ...emptyRow },
    upcoming: { ...emptyRow },
}

// Les 4 rangées partagent exactement la même forme d'état : on factorise
// le pending/fulfilled/rejected au lieu de le répéter 4 fois.
function addRowCases(builder, thunk, key) {
    builder
        .addCase(thunk.pending, (state) => {
            state[key].status = 'loading'
            state[key].error = null
        })
        .addCase(thunk.fulfilled, (state, action) => {
            state[key].status = 'succeeded'
            state[key].items = action.payload.results
        })
        .addCase(thunk.rejected, (state, action) => {
            state[key].status = 'failed'
            state[key].error = action.error.message
        })
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrending.pending, (state) => {
                state.trending.status = 'loading'
                state.trending.error = null
            })
            .addCase(fetchTrending.fulfilled, (state, action) => {
                state.trending.status = 'succeeded'
                state.trending.items = action.payload.results
                state.trending.featuredIndex = Math.floor(
                    Math.random() * Math.min(5, action.payload.results.length || 1),
                )
            })
            .addCase(fetchTrending.rejected, (state, action) => {
                state.trending.status = 'failed'
                state.trending.error = action.error.message
            })

        addRowCases(builder, fetchTopRated, 'topRated')
        addRowCases(builder, fetchNowPlaying, 'nowPlaying')
        addRowCases(builder, fetchUpcoming, 'upcoming')
    },
})

export default homeSlice.reducer

export const selectTrending = (state) => state.home.trending
export const selectTopRated = (state) => state.home.topRated
export const selectNowPlaying = (state) => state.home.nowPlaying
export const selectUpcoming = (state) => state.home.upcoming
