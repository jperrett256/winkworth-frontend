import React from 'react';
import { Check } from 'react-feather';
import Link from 'next/link';
import { useAuth } from '../utils/auth';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popupShown: false
        };

        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();

        this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    handleInputKeyPress(event) {
        if (event.key == 'Enter') this.submitUser();
    }

    togglePopup() {
        this.setState({ popupShown: !this.state.popupShown }, () => {
            if (this.state.popupShown) {
                const input = this.emailInput.current;

                input.focus();

                const position = input.value.length;
                input.setSelectionRange(position, position);
            }
        });
    }

    async submitUser() {
        const response = await this.props.login({
            email: this.emailInput.current.value,
            password: this.passwordInput.current.value
        });

        // clear password field on failure
        if (!response.success) {
            this.passwordInput.current.value = '';
        }
    }

    render() {
        return (
            <div className={'outer' + (this.state.popupShown ? ' active' : '')}>
                <div
                    className="button"
                    onClick={this.togglePopup}
                >
                    Log in
                </div>
                <div className="hidden">
                    <div className="nub-outline" />
                    <div className="nub-fill" />
                    <div className="main">
                        <div className="input-container">
                            <input
                                className="top"
                                placeholder="Email"
                                name="email"
                                ref={this.emailInput}
                                onKeyPress={this.handleInputKeyPress}
                            />
                        </div>
                        <div className="input-container">
                            <input
                                className="bottom"
                                placeholder="Password"
                                type="password"
                                name="password"
                                ref={this.passwordInput}
                                onKeyPress={this.handleInputKeyPress}
                            />
                            <div className="submit-button" onClick={this.submitUser}>
                                <Check size={20} />
                            </div>
                        </div>
                        <div className="options">
                            <a>Forgot password?</a>
                            <Link href="/signup">
                                <a>Sign up</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .outer {
                        position: relative;
                    }

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

                    .nub-outline, .nub-fill {
                        display: flex;
                        position: absolute;
                        left: 50%;
                        bottom: calc(-25px - 1px);
                        transform: translate(-50%, 50%) rotate(45deg);
                    }

                    .nub-outline {
                        width: 10px;
                        height: 10px;
                        background-color: #444;
                        z-index: -1;
                    }

                    .nub-fill {
                        width: 8px;
                        height: 8px;
                        background-color: white;
                        z-index: 2;
                    }

                    .outer .hidden {
                        visibility: hidden;
                        opacity: 0;
                        transition: opacity 0.2s ease, visibility 0s linear 0.2s;
                    }

                    .outer.active .hidden {
                        visibility: initial;
                        opacity: 1;
                        transition: opacity 0.2s ease;
                    }

                    .hidden .main {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        position: absolute;
                        bottom: calc(-152px - 25px);
                        right: 0;
                        height: 152px;
                        padding: 20px;
                        box-sizing: border-box;

                        border: 1px solid #444;
                        border-radius: 5px;
                        background-color: white;
                        z-index: 1;
                    }

                    .hidden .input-container {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 200px;
                    }

                    .hidden input {
                        padding: 8px;
                        height: 18px;
                        margin: 0;
                        border: 1px solid #444;
                        border-radius: 5px;
                    }

                    .hidden input.top {
                        /* container width - container padding - border width */
                        width: calc(100% - 2 * 8px - 2px);
                    }

                    .hidden input.bottom {
                        /* container width - container padding - gap - button width */
                        width: calc(100% - 2 * 8px - 16px - (18px + 2 * 8px));
                    }

                    .hidden .submit-button {
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

                    .hidden .submit-button:hover {
                        cursor: pointer;
                        color: white;
                        background-color: #444;
                    }

                    .hidden .options {
                        height: 12px;
                        display: flex;
                        justify-content: space-between;
                        font-size: 12px;
                    }

                    .hidden .options a {
                        position: relative;
                    }

                    .hidden .options a:before {
                        content: "";
                        background-color: #444;
                        position: absolute;
                        width: 100%;
                        height: 1px;
                        border-radius: 1px;
                        bottom: -6px;
                        left: 0;
                        z-index: -1;
                        opacity: 0;
                        transform: scaleX(0);
                        transition: transform 0s linear 0.2s, opacity 0.2s ease;
                    }

                    .hidden .options a:hover:before {
                        opacity: 1;
                        transform: scaleX(1.05);
                        transition: transform 0.2s ease;
                    }
                `}</style>
            </div>
        );
    }
}

export default useAuth(Login);