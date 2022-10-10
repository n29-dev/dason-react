import { Route, Routes } from 'react-router-dom';
import AuthRoute from './middleware/authRoute';
import GuestRoute from './middleware/guestRoute';
import HomePage from './views/homePage';
import RegistrationPage from './views/registrationPage';

function Router() {
    return (
        <Routes>
            <Route path="/register" element={<GuestRoute element={RegistrationPage} />} />

            {/* authenticated routes */}
            <Route path="/" element={<AuthRoute redirectPath="/register" />}>
                <Route path="/" element={<HomePage />} />
            </Route>
        </Routes>
    );
}

export default Router;
