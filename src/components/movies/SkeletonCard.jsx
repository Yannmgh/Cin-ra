function SkeletonCard() {
    return (
        <div className='h-100'>
            <div className='skeleton skeleton-card__poster' />
            <div className='skeleton-card__body'>
                <div className='skeleton skeleton-card__line' style={{ width: '85%' }} />
                <div className='skeleton skeleton-card__line' style={{ width: '40%', marginBottom: 0 }} />
            </div>
        </div>
    )
}

export default SkeletonCard
