import {useState} from "react";
import '../CSS/myAccount.css';

const ManagersForm = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
        console.log("Email:", email);
        console.log("Phone:", phone);
        console.log("National ID:", nationalId);
        console.log("Address:", address);
    }
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setPreviewImage(imageUrl);
    }
    return(
        <div className="add-form">
            <h2>New Manager</h2>
            <form>
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
                                      stroke-linecap="round" stroke-linejoin="round"
                                      stroke-dasharray="5 5"/>
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
                <div className="add-form-input">
                    <label htmlFor="firstname">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        className="add-form-input-input"
                        placeholder="Enter first name"
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
                    />
                </div>
                <div className="add-form-input">
                    <label htmlFor="type">
                        Type
                    </label>
                    <select id="type" className="add-form-input-select">
                        <option value="" disabled selected hidden>Select a type</option>
                        <option value="General Manager">General Manager</option>
                        <option value="Allocation Manager">Allocation Manager</option>
                    </select>
                </div>

                <div className="add-form-input">
                    <label htmlFor="phone">
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        className="add-form-input-input"
                        placeholder="Enter phone number"
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