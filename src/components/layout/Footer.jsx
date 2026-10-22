import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Logo from './Logo.jsx'

const currentYear = new Date().getFullYear()

function Footer() {
    return (
        <footer className='app-footer'>
            <Container>
                <Row className='gy-4'>
                    <Col md={4}>
                        <Logo size={28} />
                        <p className='mt-3 mb-0 small'>
                            Découvrez, recherchez et gardez une trace des films que vous aimez.
                        </p>
                    </Col>
                    <Col md={4}>
                        <p className='fw-semibold text-white mb-2'>Navigation</p>
                        <div className='d-flex flex-column gap-1'>
                            <Link to='/'>Accueil</Link>
                            <Link to='/discover'>Découvrir</Link>
                            <Link to='/favorites'>Favoris</Link>
                        </div>
                    </Col>
                    <Col md={4}>
                        <p className='fw-semibold text-white mb-2'>À propos</p>
                        <p className='small mb-1'>
                            Ce produit utilise l'API TMDB mais n'est ni approuvé ni certifié par TMDB.
                        </p>
                        <a href='https://www.themoviedb.org/' target='_blank' rel='noreferrer'>
                            themoviedb.org ↗
                        </a>
                    </Col>
                </Row>
                <p className='small mt-4 mb-0 text-center'>
                    © {currentYear} Cinéra — Projet de démonstration.
                </p>
            </Container>
        </footer>
    )
}

export default Footer
