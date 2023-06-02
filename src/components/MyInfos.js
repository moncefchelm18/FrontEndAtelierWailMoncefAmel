import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

const MyInfos = (props) => {
    const [userId, setUserId] = useState(null);
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('')
    const [previewImage, setPreviewImage] = useState(null);
    const [cookies] = useCookies(['token']);

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setPreviewImage(imageUrl);
    }
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/connecteduser/', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${cookies.token}` // Assuming you have access to cookies containing the token
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log(userData)
                    setUserId(userData.id);
                    setPassword(userData.password);
                    setFirstName(userData.name);
                    setLastName(userData.lastname);
                    setEmail(userData.email);
                    setPhone(userData.phonenumber);
                    setNationalId(userData.national_card_number);
                    setAddress(userData.address);
                    setRole(userData.role)
                } else {
                    console.error('Failed to fetch user info:', response.statusText);
                }
            } catch (error) {
                console.error('Error occurred while fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [cookies.token]);
    // console.log(userInfo)
    const handleSubmit = async (event) => {
        console.log(userId);
        event.preventDefault();
        const updatedData = {
            // img: previewImage,
            password: password,
            name: firstName,
            lastname: lastName,
            email: email,
            phonenumber: phone,
            national_card_number: nationalId,
            address: address,
            role: role,
        };
        console.log(updatedData);
        try {
            const response = await fetch(`http://127.0.0.1:8000/profiles/users/${userId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                console.log(response)
            } else {
            }
        } catch (error) {
            alert(error.toString());
            console.log(error);
        }



    }
    return(
        <>
            <div className="form-container">
                <div className="form-container-form">
                    <h2>Manage my infos</h2>
                    <div className="form-container-form-infos">
                        <form onSubmit={handleSubmit}>
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
                            <div className="form-container-form-infos-input">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="firstName" value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}/>
                            </div>
                            <div className="form-container-form-infos-input">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}/>
                            </div>
                            <div className="form-container-form-infos-input">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="form-container-form-infos-input">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            <div className="form-container-form-infos-input">
                                <label htmlFor="nationalId">National ID</label>
                                <input type="text" id="nationalId" value={nationalId}
                                       onChange={(e) => setNationalId(e.target.value)}/>
                            </div>
                            <div className="form-container-form-infos-input">
                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" value={address}
                                       onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                            <div className="add-form-actions">
                                <button type="submit" className="add-form-actions-submit">Update</button>
                                <button className="add-form-actions-discard">Discard</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MyInfos;