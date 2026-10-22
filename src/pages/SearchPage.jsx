import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Form, Button, InputGroup } from 'react-bootstrap'
import useForm from '../hooks/useForm.js'
import MovieGrid from '../components/movies/MovieGrid.jsx'
import Pagination from '../components/movies/Pagination.jsx'
import SkeletonGrid from '../components/movies/SkeletonGrid.jsx'
import ErrorState from '../components/movies/ErrorState.jsx'
import {
    fetchSearchMovies,
    setSearchQuery,
    setSearchPage,
    selectSearch,
} from '../features/movies/moviesSlice.js'

const DEBOUNCE_DELAY = 500

function SearchPage() {
    const dispatch = useDispatch()
    const search = useSelector(selectSearch)
    const [searchParams, setSearchParams] = useSearchParams()
    const { values, handleChange, setValues } = useForm({ query: searchParams.get('q') ?? '' })
    const debounceRef = useRef(null)

    // Un film cherché via l'URL (lien navbar, ou navigation précédent/suivant) synchronise la recherche.
    useEffect(() => {
        const urlQuery = searchParams.get('q')
        if (urlQuery && urlQuery !== search.query) {
            setValues({ query: urlQuery })
            dispatch(setSearchQuery(urlQuery))
        }
    }, [searchParams, search.query, dispatch, setValues])

    // Recherche automatique après une courte pause de frappe (debounce).
    useEffect(() => {
        const trimmed = values.query.trim()
        if (debounceRef.current) clearTimeout(debounceRef.current)

        if (!trimmed) return undefined

        debounceRef.current = setTimeout(() => {
            if (trimmed !== search.query) {
                dispatch(setSearchQuery(trimmed))
                setSearchParams({ q: trimmed })
            }
        }, DEBOUNCE_DELAY)

        return () => clearTimeout(debounceRef.current)
    }, [values.query, search.query, dispatch, setSearchParams])

    useEffect(() => {
        if (search.query) {
            dispatch(fetchSearchMovies({ query: search.query, page: search.page }))
        }
    }, [dispatch, search.query, search.page])

    function handleSubmit(event) {
        event.preventDefault()
        const trimmed = values.query.trim()
        if (!trimmed) return
        if (debounceRef.current) clearTimeout(debounceRef.current)
        dispatch(setSearchQuery(trimmed))
        setSearchParams({ q: trimmed })
    }

    return (
        <div>
            <h1 className='mb-4'>Rechercher un film</h1>
            <Form onSubmit={handleSubmit} className='mb-4'>
                <InputGroup style={{ maxWidth: 480 }}>
                    <Form.Control
                        type='search'
                        name='query'
                        placeholder='Titre du film...'
                        value={values.query}
                        onChange={handleChange}
                        autoFocus
                    />
                    <Button type='submit' variant='primary'>Rechercher</Button>
                </InputGroup>
            </Form>

            { search.status === 'loading' && <SkeletonGrid /> }
            { search.status === 'failed' && <ErrorState message={search.error} /> }
            { search.status === 'succeeded' && search.items.length === 0 && (
                <p className='text-muted'>Aucun résultat pour « {search.query} ».</p>
            ) }
            { search.status === 'succeeded' && search.items.length > 0 && (
                <>
                    <MovieGrid movies={search.items} />
                    <Pagination
                        page={search.page}
                        totalPages={search.totalPages}
                        onPageChange={(page) => dispatch(setSearchPage(page))}
                    />
                </>
            ) }
        </div>
    )
}

export default SearchPage
