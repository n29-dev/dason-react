import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AuthRoute({ redirectPath = '/login', children }) {
    const { user } = useSelector((store) => store);

    if (user?.uid) {
        return children || <Outlet />;
    }

    return <Navigate to={redirectPath} replace />;
}

export default AuthRoute;
