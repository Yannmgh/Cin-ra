import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const USERS_KEY = 'tmdb-users'
const SESSION_KEY = 'tmdb-session'

// Hash simple côté client (Web Crypto). Ce n'est PAS un équivalent d'un vrai
// backend (bcrypt, salage, etc.) : ça évite juste de stocker le mot de passe
// en clair dans le localStorage. Une vraie authentification a besoin d'un serveur.
async function hashPassword(password) {
    const data = new TextEncoder().encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

function loadUsers() {
    try {
        const raw = localStorage.getItem(USERS_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function saveUsers(users) {
    try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users))
    } catch {
        // Stockage indisponible : on ignore silencieusement.
    }
}

function loadSessionUser() {
    try {
        const username = localStorage.getItem(SESSION_KEY)
        if (!username) return null
        const user = loadUsers().find((u) => u.username === username)
        return user ? { username: user.username, email: user.email, createdAt: user.createdAt } : null
    } catch {
        return null
    }
}

function saveSession(username) {
    try {
        localStorage.setItem(SESSION_KEY, username)
    } catch {
        // ignore
    }
}

function clearSession() {
    try {
        localStorage.removeItem(SESSION_KEY)
    } catch {
        // ignore
    }
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ username, email, password }, { rejectWithValue }) => {
        const users = loadUsers()

        if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
            return rejectWithValue("Ce nom d'utilisateur est déjà pris.")
        }

        const passwordHash = await hashPassword(password)
        const newUser = { username, email, passwordHash, createdAt: new Date().toISOString() }
        saveUsers([...users, newUser])
        saveSession(username)

        return { username, email, createdAt: newUser.createdAt }
    },
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }, { rejectWithValue }) => {
        const user = loadUsers().find((u) => u.username.toLowerCase() === username.toLowerCase())
        if (!user) return rejectWithValue('Utilisateur introuvable.')

        const passwordHash = await hashPassword(password)
        if (passwordHash !== user.passwordHash) return rejectWithValue('Mot de passe incorrect.')

        saveSession(user.username)
        return { username: user.username, email: user.email, createdAt: user.createdAt }
    },
)

const initialState = {
    currentUser: loadSessionUser(),
    status: 'idle',
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.currentUser = null
            clearSession()
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.currentUser = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload ?? action.error.message
            })

            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.currentUser = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload ?? action.error.message
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.currentUser
export const selectAuthStatus = (state) => state.auth.status
export const selectAuthError = (state) => state.auth.error
