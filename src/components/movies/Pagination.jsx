import { Pagination as BsPagination } from 'react-bootstrap'

// TMDB plafonne toujours total_pages à 500, même si le vrai total est plus grand.
const TMDB_MAX_PAGES = 500

function Pagination({ page, totalPages, onPageChange }) {
    const cappedTotal = Math.min(totalPages, TMDB_MAX_PAGES)
    if (cappedTotal <= 1) return null

    const start = Math.max(1, page - 2)
    const end = Math.min(cappedTotal, start + 4)
    const pages = []
    for (let p = start; p <= end; p++) pages.push(p)

    return (
        <BsPagination className='justify-content-center my-4'>
            <BsPagination.Prev disabled={page <= 1} onClick={() => onPageChange(page - 1)} />
            { start > 1 && <BsPagination.Ellipsis disabled /> }
            { pages.map((p) => (
                <BsPagination.Item key={p} active={p === page} onClick={() => onPageChange(p)}>
                    {p}
                </BsPagination.Item>
            )) }
            { end < cappedTotal && <BsPagination.Ellipsis disabled /> }
            <BsPagination.Next disabled={page >= cappedTotal} onClick={() => onPageChange(page + 1)} />
        </BsPagination>
    )
}

export default Pagination
