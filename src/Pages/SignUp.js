import AuthentificationForm from "../components/Forms/AuthentificationForm";
import {Link} from "react-router-dom";
import React from "react";

const SignUp = (props) => {
    return(
        <div className="login-login">
            <section className="login-gradients-purple-sky2">
                <img src="./playground_assets/LoginImages/loginBigLogo.png"
                     className="login-login-logo1"
                />
            </section>
            <section className="login-form">
                <div className="login-form1">
                    <div className="login-form-header">
                        <img
                            alt="outputonlinepngtools13186"
                            src="./playground_assets/LoginImages/loginSmallLogo.png"
                            className="login-form-small-logo"
                        />
                        <div className="login-text Heading1SemiBold">
                            <div>Create a new account</div>
                        </div>
                        <div className="login-form-text02">
                            <div>Welcome to our platform, Please enter your infos</div>
                        </div>
                    </div>
                    <div className="login-form-inputfield">
                        <AuthentificationForm />
                        <div className="login-form-action-sign-up">
                            <p>
                                Already have an account?
                            </p>
                            <Link to="/Login" className="login-form-action-button2">
                                Sign In
                            </Link>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
export default SignUp;