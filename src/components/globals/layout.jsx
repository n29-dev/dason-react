import Sidebar from '../sidebar';
import Header from './header';

function Layout({ children }) {
    return (
        <div className="dason-main-wrapper">
            <div className="dason-inner grid auto grid-cols-[auto,_auto] h-[100vh] overflow-hidden">
                <Header />
                <Sidebar />
                <main className="col-start-2 col-end-3">{children}</main>
            </div>
        </div>
    );
}

export default Layout;
