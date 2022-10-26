import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Loading from './components/helpers/loading';
import Router from './router';

function App() {
    const { isLoading } = useSelector((store) => store.loading);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    className: 'notification',
                }}
            />
            <Router />;
        </>
    );
}

export default App;
