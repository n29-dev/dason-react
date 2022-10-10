import { Route, Routes } from 'react-router-dom';
import Register from './components/auth/register';
import HomePage from './views/homePage';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default Router;
