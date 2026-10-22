function Logo({ size = 32, showWordmark = true, className = '' }) {
    return (
        <span className={`logo d-inline-flex align-items-center gap-2 ${className}`}>
            <svg width={size} height={size} viewBox='0 0 48 48' aria-hidden='true'>
                <rect width='48' height='48' rx='12' fill='#0a0a0e' stroke='var(--accent)' strokeWidth='1.5' />
                <circle cx='24' cy='24' r='15' fill='none' stroke='var(--accent)' strokeWidth='2.5' />
                <path d='M20 16.5 L33 24 L20 31.5 Z' fill='var(--accent)' />
            </svg>
            { showWordmark && <span className='logo__wordmark'>Cinéra</span> }
        </span>
    )
}

export default Logo
