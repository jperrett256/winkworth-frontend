import { useAuth } from '../utils/auth';

const Account = ({ logout }) => (
    <div
        className="button"
        onClick={logout}
    >
        Sign out
        <style jsx>{`
            .button {
                border: 1px solid #444;
                border-radius: 5px;
                padding: 5px 10px;
                white-space: nowrap;
                background-color: #444;
                color: white;
                transition: background-color 0.2s ease;
            }

            .button:hover, .active .button {
                cursor: pointer;
                color: #444;
                background-color: white;
            }
        `}</style>
    </div>
);

export default useAuth(Account);
