import '../css/notfound.css'

import { useNavigate } from 'react-router-dom';

function NotFound() {
    let navigate = useNavigate();
    return (
        <div className="notfound-container">
            <div className="notfound">
                <span className="notfound-text">Page not found...</span>
                <button onClick={() => navigate('/') }className="notfound-btn">Go Back</button>
            </div>
        </div>
    )
}

export default NotFound;