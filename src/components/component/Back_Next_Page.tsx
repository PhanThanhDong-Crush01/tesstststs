import { Link, useNavigate } from 'react-router-dom'

function NavigationButtons() {
    const navigate = useNavigate()

    return (
        <div style={{ color: 'gray', padding: '5px' }}>
            <button onClick={() => navigate(-1)} style={{ padding: '5px' }}>
                Quay lại
            </button>{' '}
            /{' '}
            <button onClick={() => navigate(1)} style={{ padding: '5px' }}>
                Tiến lên
            </button>
        </div>
    )
}

export default NavigationButtons
