function Avatar({ username, size = 40 }) {
    const initial = username ? username.trim().charAt(0).toUpperCase() : '?'

    return (
        <span
            className='avatar'
            style={{ width: size, height: size, fontSize: size * 0.42 }}
        >
            {initial}
        </span>
    )
}

export default Avatar
