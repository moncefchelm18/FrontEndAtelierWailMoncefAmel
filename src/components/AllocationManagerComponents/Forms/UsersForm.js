import {useRef, useState} from "react";
import '../../AdminComponents/CSS/myAccount.css';
import {useCookies} from "react-cookie";

const ManagersForm = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [address, setAddress] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedType, setSelectedType] = useState('General Manager');
    const [message, setMessage] = useState(null)
    const [cookies] = useCookies(['token']);
    const formRef = useRef(null);
    const handleFormSubmit = (event) => {
        event.preventDefault();

        formRef.current.scrollIntoView({ behavior: 'smooth' });
        if (!password || !firstName || !lastName || !email || !phone || !nationalId || !address) {
            setMessage(<p style={{color: 'red', padding:'10px 0px'}}>Please fill all the fields!</p>)
            return;
        }
        const phoneRegex = /^(05|06|07)\d{8}$/;
        if (!phoneRegex.test(phone)) {
            setMessage(<p style={{color: 'red', padding:'10px 0px'}}>Phone number must start with '05', '06', or '07' and have 10 digits.</p>)
            return;
        }

        let url = "";
        console.log(selectedType)
        if (selectedType === "Student") {
            url = "http://172.20.10.4:8000/profiles/Student/";
        } else if (selectedType === "Researcher") {
            url = "http://172.20.10.4:8000/profiles/Researcher/";
        }

        const data = {
            password: password,
            name: firstName,
            lastname: lastName,
            email: email,
            phonenumber: phone,
            national_card_number: nationalId,
            address: address
        };
        console.log(url);
        console.log(data)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${cookies.token}` // Assuming you have access to cookies containing the token
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                console.log(response)
                if (response.ok) {
                    // Manager added successfully
                    // Perform any additional actions or update state as needed
                    console.log('User added successfully');
                }
                else {
                    // Error occurred during manager addition
                    console.error('Error adding manager:', response.statusText);
                }
            })
            .catch(error => {
                // Error occurred during the request
                console.error('Request failed:', error);
            });
    };

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setPreviewImage(imageUrl);
    }
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const handleNationalIdChange = (event) => {
        setNationalId(event.target.value);
    };
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    return(
        <div className="add-form">
            <h2>New User</h2>
            <form
                ref={formRef}
                onSubmit={handleFormSubmit}
                onClick={() => setMessage(null)}
            >
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
                {message && message}
                <div className="add-form-input">
                    <label htmlFor="type">
                        Type
                    </label>
                    <select
                        id="type"
                        className="add-form-input-select"
                        value={selectedType}
                        onChange={(event) => setSelectedType(event.target.value)}
                    >
                        <option value="Student">Student</option>
                        <option value="Researcher">Researcher</option>
                    </select>
                </div>
                <div className="add-form-input">
                    <label htmlFor="firstname">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        className="add-form-input-input"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                </div>
                <div className="add-form-input">
                    <label htmlFor="lastname">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        className="add-form-input-input"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={handleLastNameChange}
                    />
                </div>
                <div className="add-form-input">
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="add-form-input-input"
                        placeholder="Enter email address"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="add-form-input">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="add-form-input-input"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="add-form-input">
                    <label htmlFor="phone">
                        Phone
                    </label>
                    <input
                        type="number"
                        id="phone"
                        className="add-form-input-input"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </div>
                <div className="add-form-input">
                    <label htmlFor="nationalId">
                        National ID
                    </label>
                    <input
                        type="number"
                        id="nationalId"
                        className="add-form-input-input"
                        placeholder="Enter national ID number"
                        value={nationalId}
                        onChange={handleNationalIdChange}
                    />
                </div>
                <div className="add-form-input">
                    <label htmlFor="address">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        className="add-form-input-input"
                        placeholder="Enter address"
                        value={address}
                        onChange={handleAddressChange}
                    />
                </div>
                <div className="add-form-actions">
                    <button type="submit" className="add-form-actions-submit">Add</button>
                    <button className="add-form-actions-discard" onClick={props.handleCancelForm} >Discard</button>
                </div>
            </form>
        </div>
    );
}
export default ManagersForm;