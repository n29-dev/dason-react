import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function GuestRoute({ redirectPath = '/', element: Component }) {
    const { user } = useSelector((store) => store);

    if (user?.uid) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Component />;
}

export default GuestRoute;
