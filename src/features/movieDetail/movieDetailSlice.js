import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMovieDetails, getRecommendations } from '../../services/tmdbService.js'

export const fetchMovieDetails = createAsyncThunk(
    'movieDetail/fetchMovieDetails',
    async (id) => getMovieDetails(id),
)

export const fetchRecommendations = createAsyncThunk(
    'movieDetail/fetchRecommendations',
    async (id) => getRecommendations(id),
)

const initialState = {
    data: null,
    status: 'idle',
    error: null,
    recommendations: {
        items: [],
        status: 'idle',
    },
}

const movieDetailSlice = createSlice({
    name: 'movieDetail',
    initialState,
    reducers: {
        clearMovieDetail() {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetails.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            .addCase(fetchRecommendations.pending, (state) => {
                state.recommendations.status = 'loading'
            })
            .addCase(fetchRecommendations.fulfilled, (state, action) => {
                state.recommendations.status = 'succeeded'
                state.recommendations.items = action.payload.results
            })
            .addCase(fetchRecommendations.rejected, (state) => {
                state.recommendations.status = 'failed'
            })
    },
})

export const { clearMovieDetail } = movieDetailSlice.actions
export default movieDetailSlice.reducer

export const selectMovieDetail = (state) => state.movieDetail.data
export const selectMovieDetailStatus = (state) => state.movieDetail.status
export const selectMovieDetailError = (state) => state.movieDetail.error
export const selectRecommendations = (state) => state.movieDetail.recommendations
