import React from 'react';
import './CSS/login.css';
import {Link, Navigate} from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";

const Login = () => {
    return (
        <form>
            <div className="login-login" style={{overflow: 'hidden'}}>
                <section className="login-gradients-purple-sky2">
                    <img src="./playground_assets/LoginImages/loginBigLogo.png"
                         className="login-login-logo1"
                    />
                </section>
                <section className="login-form" style={{marginTop: '10%'}}>
                    <div className="login-form1">
                        <div className="login-form-header">
                            <img
                                alt="outputonlinepngtools13186"
                                src="./playground_assets/LoginImages/loginSmallLogo.png"
                                className="login-form-small-logo"
                            />
                            <div className="login-text Heading1SemiBold">
                                <div>Log in to your account</div>
                            </div>
                            <div className="login-form-text02">
                                <div>Welcome! Please enter your details.</div>
                            </div>
                        </div>
                        <div className="login-form-inputfield">
                            <LoginForm/>
                            <div className="login-form-action-sign-up">
                                <p>
                                    Don’t have an account?
                                </p>
                                <Link to="/SignUp" className="login-form-action-button2">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
};

export default Login;
