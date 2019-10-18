import React from 'react';
import Router from 'next/router';
import { Check } from 'react-feather';
import Layout from '../components/Layout';
import { useAuth } from '../utils/auth';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            error: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    async submitUser() {
        const response = await this.props.signup({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        });

        if (response.success) {
            Router.push('/');
        } else {
            this.setState({ error: response.data });
        }
    }

    render() {
        return (
            <Layout>
                <div className="outer">
                    <div className="inner">
                        <h2>Create New User</h2>
                        <div className="input-container">
                            <input className="top" placeholder="Name" name="name" onChange={this.handleInputChange} />
                        </div>
                        <div className="input-container">
                            <input className="middle" placeholder="Email" name="email" onChange={this.handleInputChange} />
                        </div>
                        <div className="input-container">
                            <input className="bottom" placeholder="Password" type="password" name="password" onChange={this.handleInputChange} />
                            <div className="submit-button" onClick={this.submitUser}>
                                <Check size={20} />
                            </div>
                        </div>
                        <div className="error">
                            {this.state.error}
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
}

export default useAuth(Signup);