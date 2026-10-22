import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/auth/authSlice.js'

function RequireAuth({ children }) {
    const currentUser = useSelector(selectCurrentUser)
    const location = useLocation()

    if (!currentUser) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children
}

export default RequireAuth
