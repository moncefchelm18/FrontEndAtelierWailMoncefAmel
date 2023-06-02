import React, { useState } from 'react';
import {Navigate} from 'react-router-dom';
import {useCookies} from "react-cookie";
// import jwt_decode from 'jsonwebtoken';

const LoginForm = (props) => {
    const [cookies, setCookie] = useCookies(['token', 'role']);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if(!email || !password){
            // alert('Please fill all columns!')
            setErrorMessage(<p style={{color: 'red'}}>Please fill all columns!</p>)
        }
        const data = {
            username: email,
            password: password
        };

        try {
            // make API call to login endpoint
            const response = await fetch('http://127.0.0.1:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                // store the token and role in cookies
                setCookie('token', responseData.token);
                setCookie('role', responseData.role, { path: '/' }); // Set cookie with path '/'
            } else {
                const responseData = await response.json();
                setErrorMessage(<p style={{ color: 'red' }}>{responseData.non_field_errors[0]}</p>);
            }
        } catch (error) {
            console.log(error);
            // setErrorMessage(<p style={{ color: 'red' }}>{error.toString()}</p>);
        }
    };

    // If the user is already logged in, redirect to the Admin page
    if (cookies.token && cookies.role === 'ADMIN') {
        return <Navigate to="/Admin" />;
    }else if(cookies.token && cookies.role === 'PRINCIPALMANAGER'){
        return <Navigate to="/GeneralManager" />;
    }else if(cookies.token && cookies.role === 'ALLOCATIONMANAGER'){
        return <Navigate to="/AllocationManager" />;
    } else if(cookies.token && cookies.role === 'STUDENT'){
        return <Navigate to="/Student" />;
    }else if(cookies.token && cookies.role === 'RESEARCHER'){
        return <Navigate to="/Researcher" />;
    }


    function handleUsernameChange(event) {
        setEmail(event.target.value);
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }
    return (
        <div >
            <div className="login-form-inputfield-label">
                <label htmlFor="email" className="login-form-inputfield-label-text">
                    Professional Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="username"
                    className="login-form-inputfield-input"
                    value={email}
                    onChange={handleUsernameChange}
                    onClick={() => setErrorMessage(null)}
                />
            </div>
            <div className="login-form-inputfield-label">
                <label htmlFor="password" className="login-form-inputfield-label-text">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="login-form-inputfield-input"
                    value={password}
                    onChange={handlePasswordChange}
                    onClick={() => setErrorMessage(null)}
                />
            </div>
            <div className="login-form-row">
                <p>Forgot password ?</p>
            </div>
            <div className="login-form-action">
                <button type="submit" style={{ cursor: 'pointer' }} className="login-form-action-button1" onClick={handleFormSubmit}>
                    Login
                </button>
            </div>
            {errorMessage && errorMessage}
        </div>
    );
};

export default LoginForm;
