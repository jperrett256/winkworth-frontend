import Header from './Header';
import Meta from './Meta';

const Layout = ({ children }) => (
    <div className="outer">
        <div className="inner">
            <Meta />
            <Header />
            {children}
        </div>
        <style jsx>{`
            .outer {
                display: flex;
                justify-content: center;
                margin-left: 20px;
                margin-right: 20px;
                margin-top: calc(10vh + 20px);
                max-width: 100%;
            }

            .inner {
                display: flex;
                flex-direction: column;
                width: 800px;
            }
        `}</style>
    </div>
);

export default Layout;