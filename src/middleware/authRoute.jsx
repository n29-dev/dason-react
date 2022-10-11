import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../components/globals/loading';

function AuthRoute({ redirectPath = '/login', children }) {
    const { user } = useSelector((store) => store);
    const { isLoading } = useSelector((store) => store.loading);

    if (isLoading) {
        return <Loading />;
    }

    if (user?.uid) {
        return children || <Outlet />;
    }

    return <Navigate to={redirectPath} replace />;
}

export default AuthRoute;
