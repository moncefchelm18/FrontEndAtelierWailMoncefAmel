import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useCookies} from "react-cookie";
// import jwt_decode from 'jsonwebtoken';

const LoginForm = (props) => {
    const [cookies, setCookie] = useCookies(['token', 'role']);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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
            const response = await fetch('http://172.20.10.4:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setCookie('role', '', { path: '/', maxAge: -1 });
                setCookie('token', '', { path: '/', maxAge: -1 });
                const responseData = await response.json();
                const expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);
                setCookie('token', responseData.token, { expires: expirationDate }/*, ''*/);
                setCookie('role', responseData.role, { expires: expirationDate }/*, { path: '/' }*/); // Set cookie with path '/'
            } else {
                const responseData = await response.json();
                setErrorMessage(<p style={{ color: 'red' }}>{responseData.non_field_errors[0]}</p>);
            }

        } catch (error) {
            console.log(error);
            setErrorMessage(<p style={{ color: 'red' }}>{error.toString()}</p>);
        }
    };
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch("http://172.20.10.4:8000/connecteduser/", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${cookies.token}` // Assuming you have access to cookies containing the token
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log(userData);
                    setIsValid(userData.is_active === true); // Update the isValid state based on userData.is_active value
                } else {
                    console.error("Failed to fetch user info:", response.statusText);
                }
            } catch (error) {
                console.error("Error occurred while fetching user info:", error);
            }
        };
        fetchUserInfo();
        setIsLoading(false);
    }, [cookies.token]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If the user is already logged in, redirect to the Admin page
    if (isValid && cookies.token && cookies.role === 'ADMIN') {
        return <Navigate to="/Admin" />;
    }else if(isValid && cookies.token && cookies.role === 'PRINCIPALMANAGER'){
        return <Navigate to="/GeneralManager" />;
    }else if(isValid && cookies.token && cookies.role === 'ALLOCATIONMANAGER'){
        return <Navigate to="/AllocationManager" />;
    } else if(isValid && cookies.token && cookies.role === 'STUDENT'){
        return <Navigate to="/Student" />;
    }else if(isValid && cookies.token && cookies.role === 'RESEARCHER'){
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
