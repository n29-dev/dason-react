import { useSelector } from 'react-redux';
import Loading from './components/globals/loading';
import Router from './router';

function App() {
    const { isLoading } = useSelector((store) => store.loading);

    if (isLoading) {
        return <Loading />;
    }

    return <Router />;
}

export default App;
