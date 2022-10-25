import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import MessageObserver from '../observers/messageObserver';

function AuthRoute({ redirectPath = '/login', children }) {
    const { currentUser } = useSelector((store) => store.users);

    if (currentUser?.uid) {
        return <MessageObserver>{children || <Outlet />}</MessageObserver>;
    }

    return <Navigate to={redirectPath} replace />;
}

export default AuthRoute;
