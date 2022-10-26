import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading from '../components/helpers/loading';

function GuestRoute({ redirectPath = '/', element: Component }) {
    const { user } = useSelector((store) => store);
    const { isLoading } = useSelector((store) => store.loading);

    if (isLoading) {
        return <Loading />;
    }

    if (user?.uid) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Component />;
}

export default GuestRoute;
