import { useState } from 'react';
import Router from 'next/router';
import { Check } from 'react-feather';
import Layout from '../components/Layout';
import postJSON from '../utils/postJson';

// TODO move into Auth (Auth.signup)?
async function submitUser(user) {
    console.log(user);

    const response = await postJSON('/api/users/signup', user);

    console.log(response);
    if (response.ok) {
        Auth.getData();
        Router.push('/');
    } else if (response.status == 400) {
        return await response.text();
    } else {
        return 'An error occurred, please try again later.';
    }
}

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    return (
        <Layout>
            <div className="outer">
                <div className="inner">
                    <h2>Create New User</h2>
                    <div className="input-container">
                        <input className="top" placeholder="Name" onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <input className="middle" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <input className="bottom" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
                        <div className="submit-button" onClick={() => submitUser({ name, email, password }).then(error => setError(error))}>
                            <Check size={20} />
                        </div>
                    </div>
                    <div className="error">
                        {error}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .outer {
                    display: flex;
                    justify-content: center;
                }

                .inner {
                    display: flex;
                    flex-direction: column;
                    width: 200px;
                }

                h2 {
                    margin-bottom: 30px;
                }

                .input-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    margin-bottom: 12px;
                }

                input {
                    padding: 8px;
                    height: 18px;
                    margin: 0;
                    border: 1px solid #444;
                    border-radius: 5px;
                }

                input.top, input.middle {
                    /* container width - container padding - border width */
                    width: calc(100% - 2 * 8px - 2px);
                }

                input.bottom {
                    /* container width - container padding - gap - button width */
                    width: calc(100% - 2 * 8px - 16px - (18px + 2 * 8px));
                }

                .submit-button {
                    height: calc(18px + 2 * 8px);
                    width: calc(18px + 2 * 8px);
                    border: 1px solid #444;
                    border-radius: 5px;
                    flex-shrink: 0;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    transition: background-color 0.2s ease;
                }

                .submit-button:hover {
                    cursor: pointer;
                    color: white;
                    background-color: #444;
                }

                .error {
                    font-size: 12px;
                }
            `}</style>
        </Layout>
    );
}
