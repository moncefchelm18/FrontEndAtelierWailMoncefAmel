import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const MyInfos = (props) => {
    const [userId, setUserId] = useState(null);
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [isActive, setIsActive] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [message, setMessage] = useState(null);

    const [cookies] = useCookies(["token"]);

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setPreviewImage(imageUrl);
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
                    setUserId(userData.id);
                    setPassword(userData.password);
                    setFirstName(userData.name);
                    setLastName(userData.lastname);
                    setEmail(userData.email);
                    setPhone(userData.phonenumber);
                    setNationalId(userData.national_card_number);
                    setAddress(userData.address);
                    setRole(userData.role);
                    setPreviewImage(`http://172.20.10.4:8000${userData.image}`);
                    setIsActive(userData.is_active === true)
                } else {
                    console.error("Failed to fetch user info:", response.statusText);
                }
            } catch (error) {
                console.error("Error occurred while fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, [cookies.token]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedData = new FormData();

        if (event.target.image.files.length > 0) {
            updatedData.append("image", event.target.image.files[0]);
        }

        updatedData.append("password", password);
        updatedData.append("name", firstName);
        updatedData.append("lastname", lastName);
        updatedData.append("email", email);
        updatedData.append("phonenumber", phone);
        updatedData.append("national_card_number", nationalId);
        updatedData.append("address", address);
        updatedData.append("role", role);
        updatedData.append("is_active", true);

        try {
            const response = await axios.put(
                `http://172.20.10.4:8000/profiles/users/${userId}/`,
                updatedData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setMessage(<p style={{color: 'green'}}>Updated successfully!</p>);
            console.log(response);
        } catch (error) {
            alert(error.toString());
            console.log(error);
        }
    };

    return (
        <>
            <div className="form-container">
                <div className="form-container-form" onClick={() => setMessage(null)}>
                    {message && message}
                    <h2>Manage my infos</h2>
                    <div className="form-container-form-infos">
                        <form onSubmit={handleSubmit}>
                            <div className="form-container-form-infos-input-img">
                                <label htmlFor="image">
                                    {previewImage ? (
                                        <img
                                            className="preview-image"
                                            src={previewImage}
                                            alt="Preview"
                                        />
                                    ) : (
                                        <svg
                                            width="83"
                                            height="83"
                                            viewBox="0 0 83 83"
                                            fill="none"
                                        >
                                            <rect
                                                x="0.5"
                                                y="0.5"
                                                width="82"
                                                height="82"
                                                rx="41"
                                                stroke="#9D9D9D"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeDasharray="5 5"
                                            />
                                        </svg>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                                    onChange={handleImageChange}
                                />
                                <div className="input-image-text">
                                    <p className="input-label">Drag image here</p>
                                    <p className="input-or">or</p>
                                    <label htmlFor="image" className="input-browse">
                                        Browse image
                                    </label>
                                </div>
                            </div>
                            <div className="form-container-form-infos-input">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="form-container-form-infos-input">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="form-container-form-infos-input">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-container-form-infos-input">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="form-container-form-infos-input">
                                <label htmlFor="nationalId">National ID</label>
                                <input
                                    type="text"
                                    id="nationalId"
                                    value={nationalId}
                                    onChange={(e) => setNationalId(e.target.value)}
                                />
                            </div>
                            <div className="form-container-form-infos-input">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="add-form-actions">
                                <button type="submit" className="add-form-actions-submit">
                                    Update
                                </button>
                                <button className="add-form-actions-discard">Discard</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyInfos;
