import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../features/movies/moviesSlice.js'
import movieDetailReducer from '../features/movieDetail/movieDetailSlice.js'
import favoritesReducer from '../features/favorites/favoritesSlice.js'
import homeReducer from '../features/home/homeSlice.js'
import authReducer from '../features/auth/authSlice.js'

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        movieDetail: movieDetailReducer,
        favorites: favoritesReducer,
        home: homeReducer,
        auth: authReducer,
    },
})

export default store
