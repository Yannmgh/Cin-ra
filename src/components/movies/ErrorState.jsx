import { Alert } from 'react-bootstrap'

function ErrorState({ message }) {
    return <Alert variant='danger' className='my-4'>{message}</Alert>
}

export default ErrorState
