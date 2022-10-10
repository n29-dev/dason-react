import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './index.css';
import AuthObserver from './observers/authObserver';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AuthObserver>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthObserver>
    </Provider>
);
