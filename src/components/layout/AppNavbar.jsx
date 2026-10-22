import { useState } from 'react'
import { Navbar, Nav, Container, Form, NavDropdown } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Logo from './Logo.jsx'
import Avatar from './Avatar.jsx'
import { selectCurrentUser, logout } from '../../features/auth/authSlice.js'

function AppNavbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const [query, setQuery] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        const trimmed = query.trim()
        if (!trimmed) return
        navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    }

    function handleLogout() {
        // Pas de navigate() explicite ici : si on est sur une page publique, on y
        // reste simplement déconnecté ; si on est sur une page protégée (profil,
        // favoris), RequireAuth s'en charge tout seul et renvoie vers /login.
        dispatch(logout())
    }

    return (
        <Navbar expand='lg' className='mb-4 app-navbar' sticky='top'>
            <Container>
                <Navbar.Brand as={NavLink} to='/' className='d-flex align-items-center'>
                    <Logo />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='main-nav' />
                <Navbar.Collapse id='main-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link as={NavLink} to='/' end>Accueil</Nav.Link>
                        <Nav.Link as={NavLink} to='/discover'>Découvrir</Nav.Link>
                        <Nav.Link as={NavLink} to='/favorites'>Favoris</Nav.Link>
                    </Nav>
                    <Form className='d-flex me-3' onSubmit={handleSubmit}>
                        <Form.Control
                            type='search'
                            placeholder='Rechercher un film...'
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </Form>
                    { currentUser ? (
                        <NavDropdown
                            align='end'
                            title={(
                                <span className='d-inline-flex align-items-center gap-2'>
                                    <Avatar username={currentUser.username} size={28} />
                                    <span>{currentUser.username}</span>
                                </span>
                            )}
                        >
                            <NavDropdown.Item as={NavLink} to='/profile'>Mon profil</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Se déconnecter</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <Nav className='d-flex flex-row gap-2'>
                            <Nav.Link as={NavLink} to='/login'>Connexion</Nav.Link>
                            <Nav.Link as={NavLink} to='/register' className='btn btn-primary btn-sm px-3'>
                                Créer un compte
                            </Nav.Link>
                        </Nav>
                    ) }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavbar
