import { Route, Routes } from 'react-router-dom';
import AuthRoute from './middleware/authRoute';
import GuestRoute from './middleware/guestRoute';
import HomePage from './views/homePage';
import LoginPage from './views/loginPage';
import RegistrationPage from './views/registrationPage';

function Router() {
    return (
        <Routes>
            {/* guest routes */}
            <Route path="/register" element={<GuestRoute element={RegistrationPage} />} />
            <Route path="/login" element={<GuestRoute element={LoginPage} />} />
            {/* authenticated routes */}
            <Route path="/" element={<AuthRoute redirectPath="/login" />}>
                <Route path="/" element={<HomePage />} />
            </Route>
        </Routes>
    );
}

export default Router;
