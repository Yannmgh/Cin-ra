import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import Logo from '../components/layout/Logo.jsx'
import useForm from '../hooks/useForm.js'
import { loginUser, selectAuthStatus, selectAuthError } from '../features/auth/authSlice.js'

function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const status = useSelector(selectAuthStatus)
    const error = useSelector(selectAuthError)
    const { values, handleChange } = useForm({ username: '', password: '' })

    async function handleSubmit(event) {
        event.preventDefault()
        const result = await dispatch(loginUser(values))

        if (loginUser.fulfilled.match(result)) {
            const redirectTo = location.state?.from?.pathname ?? '/'
            navigate(redirectTo, { replace: true })
        }
    }

    return (
        <div className='auth-page'>
            <Card className='auth-card'>
                <Card.Body className='p-4 p-md-5'>
                    <div className='auth-card__logo'>
                        <Logo size={36} />
                    </div>
                    <Card.Title as='h1' className='h3 text-center mb-4'>Content de vous revoir</Card.Title>
                    { error && <Alert variant='danger'>{error}</Alert> }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Nom d'utilisateur</Form.Label>
                            <Form.Control
                                name='username'
                                value={values.username}
                                onChange={handleChange}
                                autoFocus
                                required
                            />
                        </Form.Group>
                        <Form.Group className='mb-4'>
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type='password'
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button
                            type='submit'
                            variant='primary'
                            className='w-100'
                            disabled={status === 'loading'}
                        >
                            { status === 'loading' ? 'Connexion...' : 'Se connecter' }
                        </Button>
                    </Form>
                    <p className='text-center mt-4 mb-0 small text-muted'>
                        Pas encore de compte ? <Link to='/register'>Créer un compte</Link>
                    </p>
                </Card.Body>
            </Card>
        </div>
    )
}

export default LoginPage
