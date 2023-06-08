import { useEffect, useState } from "react";
import {useCookies} from "react-cookie";
import Loading from "../../Loading";

const LocationsForm = (props) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [cookies] = useCookies(['token']);
    const [loading, setLoading] = useState(null);

    // Error and success messages
    const ErrorMessage = ({ title }) => {
        return <div style={{ color: "red" }}>{title}</div>;
    };

    const SuccessMessage = () => {
        return (
            <div style={{ color: "green" }}>Location added successfully!</div>
        );
    };

    // When submitting the form
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || !type || !description) {
            setError(<ErrorMessage title={"Please fill all columns."} />);
            return;
        }

        const data = {
            id: Math.random(),
            name: name,
            discription: description,
            type: type,
            created_on: new Date(),
        };
        setLoading(true);
        fetch('http://172.20.10.4:8000/location/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${cookies.token}`
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Location already exists.');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                props.getUpdatedData(data);
                setSuccessMessage(<SuccessMessage />);
                setError(null);
            })
            .catch((error) => {
                console.error(error);
                setError(<ErrorMessage title={error.message} />);
                setSuccessMessage(null);
            });
        setLoading(false);
    };

    const TYPE_CHOICES = [
        ["lecture_halls", "Lecture Halls"],
        ["practice_rooms", "Practice Rooms"],
        ["lab_rooms", "Lab Rooms"],
        ["administration", "Administration"],
        ["reservation_room", "Reservation Room"],
        ["it_room", "IT Room"],
        ["corridors", "Corridors"],
        ["stocks", "Stocks"],
    ];
    return (
        <>
            {loading ? <Loading/> : (
                <>
                    <div className="add-form">
                        <h2>New equipment location</h2>
                        {error && error}
                        {successMessage && successMessage}
                        <form onSubmit={handleSubmit}>
                            <div className="add-form-input">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    className="add-form-input-input"
                                    placeholder="Enter location name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    onFocus={() => {
                                        setError(null);
                                        setSuccessMessage(null);
                                    }}
                                />
                            </div>
                            <div className="add-form-input">
                                <label htmlFor="type">Type</label>
                                <select
                                    id="type"
                                    className="add-form-input-input"
                                    value={type}
                                    onChange={(event) => setType(event.target.value)}
                                    onFocus={() => {
                                        setError(null);
                                        setSuccessMessage(null);
                                    }}
                                >
                                    <option value="">--Select type--</option>
                                    {TYPE_CHOICES.map(([value, label]) => (
                                        <option value={value} key={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="add-form-input">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    className="add-form-input-input"
                                    placeholder="Write a description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    onFocus={() => {
                                        setError(null);
                                        setSuccessMessage(null);
                                    }}
                                />
                            </div>
                            <div className="add-form-actions">
                                <button type="submit" className="add-form-actions-submit">Add Location</button>
                                <button className="add-form-actions-discard" onClick={props.handleCancelForm}>Discard</button>

                            </div>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default LocationsForm;
