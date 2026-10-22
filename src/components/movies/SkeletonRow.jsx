import SkeletonCard from './SkeletonCard.jsx'

function SkeletonRow({ count = 6 }) {
    return (
        <div className='movie-row__track'>
            { Array.from({ length: count }).map((_, index) => (
                <div className='movie-row__item' key={index}>
                    <SkeletonCard />
                </div>
            )) }
        </div>
    )
}

export default SkeletonRow
