import { Spinner } from 'react-bootstrap'

function LoadingState({ label = 'Chargement...' }) {
    return (
        <div className='d-flex align-items-center justify-content-center gap-2 text-muted py-5'>
            <Spinner animation='border' size='sm' />
            {label}
        </div>
    )
}

export default LoadingState
