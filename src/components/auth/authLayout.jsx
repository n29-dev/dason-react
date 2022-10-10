// eslint-disable-next-line import/no-unresolved
import Logo from 'Images/logo-sm.svg';

function AuthLayout({ children }) {
    return (
        <main className="grid grid-cols-[25%_75%] min-h-[100vh] w-full">
            <div className="p-12">
                <div className="text-center pb-12">
                    <a className="inline-flex items-center gap-[5px] text-dark-600" href="#">
                        <span className="w-10 h-10 inline-block">
                            <Logo />
                        </span>
                        <span className="font-bold text-[20px] uppercase">Dason</span>
                    </a>
                </div>
                {children}
            </div>
            <div
                className="w-full h-full"
                style={{
                    backgroundImage: 'linear-gradient(180deg, rgba(144,151,157,1) 0%, rgba(48,61,68,1) 100%)',
                }}
            ></div>
        </main>
    );
}

export default AuthLayout;
