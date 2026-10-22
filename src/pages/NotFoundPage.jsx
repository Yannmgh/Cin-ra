import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div className='text-center py-5'>
            <h1>404</h1>
            <p className='text-muted mb-4'>Cette page n'existe pas.</p>
            <Link to='/'>Retour à l'accueil</Link>
        </div>
    )
}

export default NotFoundPage
