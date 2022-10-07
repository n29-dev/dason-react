import { useSelector } from 'react-redux';
import Sidebar from '../sidebar';
import Header from './header';

function Layout({ children }) {
    const { open } = useSelector((store) => store.sidebar);

    return (
        <div className="dason-main-wrapper">
            <div
                className={`dason-inner grid auto h-[100vh] grid-cols-[auto,_1fr] ${open ? 'overflow-hidden' : ''}`}
                data-sidebar-state={open ? 'open' : 'collapsed'}
            >
                <Header />
                <Sidebar open={open} />
                <main className="col-start-2 col-end-3 bg-[#f4f5f8] p-6 overflow-x-hidden overflow-y-scroll">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;
