import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'tmdb-favorites'

function loadFavorites() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : {}
    } catch {
        return {}
    }
}

function saveFavorites(byUser) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(byUser))
    } catch {
        // Stockage indisponible (navigation privée, quota dépassé...) : on ignore silencieusement.
    }
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        byUser: loadFavorites(),
    },
    reducers: {
        toggleFavorite(state, action) {
            const { username, movie } = action.payload
            if (!username) return

            const list = state.byUser[username] ?? []
            const index = list.findIndex((item) => item.id === movie.id)

            state.byUser[username] = index === -1
                ? [...list, movie]
                : list.filter((item) => item.id !== movie.id)

            saveFavorites(state.byUser)
        },
    },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer

export const selectFavoritesForUser = (username) => (state) => state.favorites.byUser[username] ?? []
