import {Link} from "react-router-dom";
import React, {useState} from "react";

const AuthentificationForm = (props) => {
    const {showOtherSections, isLogin} = props;
    const [nationalId, setNationalId] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneFieldColor, setphoneFieldColor] = useState("")
    const handlePhoneDigits = (event) =>{
        const phoneValue = event.target.value;
        const style = event.target.style;
        if (phoneValue.length < 10){
            setPhone(phoneValue);
        }
        else {
            setPhone(phoneValue.slice(0, 10));
        }
    }

    const handleNationalIdChange = (event) => {
        const value = event.target.value;
        if (value.length <= 18) {
            setNationalId(value);
        } else {
            setNationalId(value.slice(0, 18));
        }
    };


    return (
        <form>
            {showOtherSections && (
                <>
                    {/*<div className="login-form-inputfield-label2">
                        <input type="file"/>
                        <img htmlFor="firstname"
                             className="login-form-inputfield-label-text"
                             src="./playground_assets/LoginImages/userIcon.png"
                             style={{width:"60px", height: "60px"}}
                        />
                    </div>*/}
                    <div className="login-form-inputfield-label">
                        <label htmlFor="firstname" className="login-form-inputfield-label-text">
                            Firstname
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            className="login-form-inputfield-input"
                        />
                    </div>
                    <div className="login-form-inputfield-label">
                        <label htmlFor="lastname" className="login-form-inputfield-label-text">
                            Lastname
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            className="login-form-inputfield-input"
                        />
                    </div>
                </>)}
            <div className="login-form-inputfield-label">

                <label htmlFor="email" className="login-form-inputfield-label-text">
                    {isLogin? "Email" : "Professional Email"}
                </label>

                <input
                    type="email"
                    id="email"
                    className="login-form-inputfield-input"
                />
            </div>
            <div className="login-form-inputfield-label">
                <label htmlFor="password" className="login-form-inputfield-label-text">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="login-form-inputfield-input"
                />
            </div>
            {showOtherSections && (<>
                    <div className="login-form-inputfield-label">
                        <label htmlFor="type" className="login-form-inputfield-label-text">
                            Type
                        </label>
                        <select
                            id="type"
                            className="login-form-inputfield-input"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                You are a...
                            </option>
                            <option value="student">Student</option>
                            <option value="researcher">Researcher</option>
                        </select>
                    </div>
                <div className="login-form-inputfield-label">
                    <label htmlFor="phone" className="login-form-inputfield-label-text">
                        Phone
                    </label>
                    <input
                        type="number"
                        id="phone"
                        className="login-form-inputfield-input"
                        required
                        value={phone}
                        onChange={handlePhoneDigits}
                    />
                </div>
                <div className="login-form-inputfield-label">
                    <label htmlFor="nationalId" className="login-form-inputfield-label-text">
                        National ID
                    </label>
                    <input
                        type="number"
                        id="nationalId"
                        className="login-form-inputfield-input"
                        value={nationalId}
                        required
                        minLength={18}
                        maxLength={18}
                        pattern="[0-9]{18}"
                        onChange={handleNationalIdChange}
                    />
                </div>

            </>)}

            <div className="login-form-row">
                <p>Forgot password ?</p>
            </div>
            <div className="login-form-action">
                <button type="submit" style={{cursor: "pointer"}} className="login-form-action-button1">
                    Login
                </button>
            </div>
        </form>
    );
};

export default AuthentificationForm;
