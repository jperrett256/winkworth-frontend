import Link from 'next/link';
import Login from '../components/Login';
import Account from '../components/Account';
import { withAuth, initAuth } from '../utils/auth';

const Header = ({ auth, dispatch }) => {
    // TODO move this initialisation elsewhere?
    // initialise auth state
    if (Object.entries(auth).length === 0) initAuth(dispatch);

    return (
        <div>
            <h1>FLAT 18</h1>
            <nav>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/about">
                    <a>About</a>
                </Link>
                { auth.authenticated ? <Account /> : <Login /> }
            </nav>
            <style jsx>{`
                div {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 50px;
                }

                h1 {
                    white-space: nowrap;
                }

                nav {
                    display: flex;
                    align-items: center;
                }

                a {
                    margin-right: 15px;
                    position: relative;
                    padding: 5px 10px;
                }

                a:before {
                    content: "";
                    background-color: #444;
                    position: absolute;
                    width: 100%;
                    height: 1px;
                    border-radius: 1px;
                    bottom: -1px;
                    left: 0;
                    z-index: -1;
                    opacity: 0;
                    transform: scaleX(0);
                    transition: transform 0s linear 0.2s, opacity 0.2s ease;
                }

                a:hover:before {
                    opacity: 1;
                    transform: scaleX(1.05);
                    transition: transform 0.2s ease;
                }
            `}</style>
        </div>
    );
};

export default withAuth(Header);