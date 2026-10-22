import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import { selectGenres, setDiscoverGenre } from '../../features/movies/moviesSlice.js'

function GenreFilter({ value }) {
    const dispatch = useDispatch()
    const genres = useSelector(selectGenres)

    return (
        <Form.Group className='mb-4' style={{ maxWidth: 280 }}>
            <Form.Label>Genre</Form.Label>
            <Form.Select
                value={value ?? ''}
                onChange={(event) => dispatch(
                    setDiscoverGenre(event.target.value ? Number(event.target.value) : null),
                )}
            >
                <option value=''>Tous les genres</option>
                { genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                )) }
            </Form.Select>
        </Form.Group>
    )
}

export default GenreFilter
