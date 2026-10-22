import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import Logo from '../components/layout/Logo.jsx'
import useForm from '../hooks/useForm.js'
import { registerUser, selectAuthStatus, selectAuthError } from '../features/auth/authSlice.js'

function RegisterPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const status = useSelector(selectAuthStatus)
    const serverError = useSelector(selectAuthError)
    const { values, handleChange } = useForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({})

    async function handleSubmit(event) {
        event.preventDefault()

        const newErrors = {}
        if (!values.username.trim()) newErrors.username = "Le nom d'utilisateur est obligatoire."
        if (!/^\S+@\S+\.\S+$/.test(values.email)) newErrors.email = 'Adresse email invalide.'
        if (values.password.length < 6) newErrors.password = 'Au moins 6 caractères.'
        if (values.confirmPassword !== values.password) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.'

        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return

        const result = await dispatch(registerUser({
            username: values.username.trim(),
            email: values.email.trim(),
            password: values.password,
        }))

        if (registerUser.fulfilled.match(result)) {
            navigate('/', { replace: true })
        }
    }

    return (
        <div className='auth-page'>
            <Card className='auth-card'>
                <Card.Body className='p-4 p-md-5'>
                    <div className='auth-card__logo'>
                        <Logo size={36} />
                    </div>
                    <Card.Title as='h1' className='h3 text-center mb-4'>Créer un compte</Card.Title>
                    { serverError && <Alert variant='danger'>{serverError}</Alert> }
                    <Form onSubmit={handleSubmit} noValidate>
                        <Form.Group className='mb-3'>
                            <Form.Label>Nom d'utilisateur</Form.Label>
                            <Form.Control
                                name='username'
                                value={values.username}
                                onChange={handleChange}
                                isInvalid={Boolean(errors.username)}
                                autoFocus
                            />
                            <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={Boolean(errors.email)}
                            />
                            <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type='password'
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={Boolean(errors.password)}
                            />
                            <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-4'>
                            <Form.Label>Confirmer le mot de passe</Form.Label>
                            <Form.Control
                                type='password'
                                name='confirmPassword'
                                value={values.confirmPassword}
                                onChange={handleChange}
                                isInvalid={Boolean(errors.confirmPassword)}
                            />
                            <Form.Control.Feedback type='invalid'>{errors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            type='submit'
                            variant='primary'
                            className='w-100'
                            disabled={status === 'loading'}
                        >
                            { status === 'loading' ? 'Création...' : 'Créer mon compte' }
                        </Button>
                    </Form>
                    <p className='text-center mt-4 mb-0 small text-muted'>
                        Déjà un compte ? <Link to='/login'>Se connecter</Link>
                    </p>
                </Card.Body>
            </Card>
        </div>
    )
}

export default RegisterPage
