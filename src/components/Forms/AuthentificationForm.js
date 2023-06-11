import {Link} from "react-router-dom";
import React, {useRef, useState} from "react";

const AuthentificationForm = (props) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedType, setSelectedType] = useState('Student');
    const [nationalId, setNationalId] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState(null);
    const formRef = useRef(null);


    const handleFormSubmit = (event) => {
        event.preventDefault();
        formRef.current.scrollIntoView({ behavior: 'smooth' });
        if (!password || !firstName || !lastName || !email || !phone || !nationalId || !address /*|| !event.target.image.files[0]*/) {
            setMessage(<p style={{color: 'red', padding:'10px 0px'}}>Please fill all the fields!</p>)
            return;
        }
        const phoneRegex = /^(05|06|07)\d{8}$/;
        if (!phoneRegex.test(phone)) {
            setMessage(<p style={{color: 'red', padding:'10px 0px'}}>Phone number must start with '05', '06', or '07' and have 10 digits.</p>)
            return;
        }
        if (password.length < 8){
            setMessage(<p style={{ color: 'red', padding: '10px 0px' }}>Password must have at least 8 digits</p>);
        }
        if (!(nationalId.length === 18)){
            setMessage(<p style={{ color: 'red', padding: '10px 0px' }}>National id must have 18 digits</p>);
        }
        if (password !== confirmPassword) {
            setMessage(<p style={{ color: 'red' }}>Make sure password match!</p>)
            return;
        }
        if (!email.endsWith('@univ-constantine2.dz')) {
            setMessage(<p style={{ color: 'red', padding: '10px 0px' }}>Email must have the domain 'univ-constantine2.dz'.</p>);
            return;
        }
        let url = "";
        if (selectedType === "Student") {
            url = "http://172.20.10.4:8000/profiles/Student/";
        } else if (selectedType === "Researcher") {
            url = "http://172.20.10.4:8000/profiles/Researcher/";
        }

        const data = new FormData();
        data.append("password", password);
        data.append("email", email);
        data.append("name", firstName);
        data.append("lastname", lastName);
        data.append("phonenumber", phone);
        data.append("national_card_number", nationalId);
        data.append("address", address);
        if (event.target.image.files[0]) {
            data.append('image', event.target.image.files[0]);
        }

        fetch(url, {
            method: "POST",
            body: data,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setMessage(<p style={{color: 'green'}}>Account created successfully!</p>)
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setPreviewImage(imageUrl);
    }
    const handlePhoneDigits = (event) => {
        const phoneValue = event.target.value;
        if (phoneValue.length < 10) {
            setPhone(phoneValue);
        } else {
            setPhone(phoneValue.slice(0, 10));
        }
    }

    const handleNationalIdChange = (event) => {
        const value = event.target.value;
        /*if (value.length <= 18) {
            setNationalId(value);
        } else {
            setNationalId(value.slice(0, 18));
        }*/
        setNationalId(value)
    };
    return (
        <form
            ref={formRef}
            onSubmit={handleFormSubmit}
            onClick={() => setMessage(null)}
        >
            {message && message}
            <div className="form-container-form-infos-input-img">
                <label htmlFor="image">
                    {previewImage ? (
                        <img className="preview-image" src={previewImage} alt="Preview"/>
                    ) : (
                        <svg width="83" height="83" viewBox="0 0 83 83" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M49.7692 44.8132C54.85 41.9818 58.2928 36.562 58.2944 30.3312C58.2921 21.1764 50.8741 13.7588 41.721 13.7588C32.5654 13.7588 25.1466 21.1767 25.1466 30.3322C25.1466 36.5624 28.5879 41.9826 33.6702 44.8141C23.4109 48.1928 16.002 57.8486 16 69.2413H19.4305C19.4522 56.9292 29.4094 46.972 41.7196 46.9502C54.0298 46.9719 63.9869 56.9292 64.0077 69.2413H67.439C67.4371 57.8476 60.0281 48.1926 49.7688 44.8132H49.7692ZM28.5739 30.3322C28.5882 23.0726 34.4608 17.2007 41.7213 17.1868C48.9794 17.2004 54.8528 23.0729 54.8637 30.3322C54.8525 37.5903 48.9795 43.4637 41.7213 43.4756C34.4613 43.4629 28.5888 37.5899 28.5739 30.3322Z"
                                fill="#777777"/>
                            <rect x="0.5" y="0.5" width="82" height="82" rx="41" stroke="#9D9D9D"
                                  strokeLinecap="round" strokeLinejoin="round"
                                  strokeDasharray="5 5"/>
                        </svg>
                    )}
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    style={{opacity: 0, position: 'absolute', zIndex: -1}}
                    onChange={handleImageChange}
                />
                <div className="input-image-text">
                    <p className="input-label">Drag image here</p>
                    <p className="input-or">or</p>
                    <label htmlFor="image" className="input-browse">Browse image</label>
                </div>
            </div>
            <div className="login-form-inputfield-label">
                <label htmlFor="firstname" className="login-form-inputfield-label-text">
                    Firstname
                </label>
                <input
                    type="text"
                    id="firstname"
                    className="login-form-inputfield-input"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
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
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </div>
            <div className="login-form-inputfield-label">

                <label htmlFor="email" className="login-form-inputfield-label-text">
                    Professional Email
                </label>

                <input
                    type="email"
                    id="email"
                    className="login-form-inputfield-input"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className="login-form-inputfield-label">
                <label htmlFor="password" className="login-form-inputfield-label-text">
                    Password
                </label>
                <input
                    required
                    type="password"
                    id="password"
                    className="login-form-inputfield-input"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div className="login-form-inputfield-label">
                <label htmlFor="password" className="login-form-inputfield-label-text">
                    Confirm password
                </label>
                <input
                    required
                    type="password"
                    id="confirmpassword"
                    className="login-form-inputfield-input"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
            </div>

            <div className="login-form-inputfield-label">
                <label htmlFor="type" className="login-form-inputfield-label-text">
                    Type
                </label>
                <select
                    id="type"
                    className="login-form-inputfield-input"
                    value={selectedType}
                    onChange={(event) => setSelectedType(event.target.value)}
                >
                    <option disabled>
                        You are a...
                    </option>
                    <option value="Student">Student</option>
                    <option value="Researcher">Researcher</option>
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
                    min={0}
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
                    min={0}
                    pattern="[0-9]{18}"
                    onChange={handleNationalIdChange}
                />
            </div>
            <div className="login-form-inputfield-label">
                <label htmlFor="address" className="login-form-inputfield-label-text">
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    className="login-form-inputfield-input"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
            </div>
            <div className="login-form-action">
                <button type="submit" style={{cursor: "pointer"}} className="login-form-action-button1">
                    Sign Up
                </button>
            </div>
        </form>
    );
};

export default AuthentificationForm;
