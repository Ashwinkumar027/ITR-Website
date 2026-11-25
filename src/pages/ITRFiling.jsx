import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ITRFiling = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/section-1', { replace: true });
    }, [navigate]);

    return null;
};

export default ITRFiling;
