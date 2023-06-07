import {useEffect, useState} from "react";
import axios from 'axios';

const ConditionForm = (props) => {
    const CONDITION_CHOICES = [  ['good', 'Good'],
        ['meduim', 'Medium'],
        ['poor', 'Poor'],
        ['in_repair', 'In Repair'],
        ['stolen', 'Stolen'],
        ['reserve', 'Reserved'],
    ];
    const TYPE_CHOICES = [
        ["lecture_halls", "Lecture Halls"],
        ["practice_rooms", "Practice Rooms"],
        ["lab_rooms", "Lab Rooms"],
        ["administration", "Administration"],
        ["reservation_room", "Reservation Room"],
        ["it_room", "IT Room"],
        ["corridors", "Corridors"],
    ];
    const [condition, setCondition] = useState(props.selectedEquipment.condition);
    const [serialNumber, setSerialNumber] = useState(props.selectedEquipment.num_serie);
    const [location, setLocation] = useState(props.selectedEquipment.Location);
    const [description, setDescription] = useState(props.selectedEquipment.discription);
    const [previewImage, setPreviewImage] = useState(props.selectedEquipment.image);
    const [message, setMessage] = useState(null);
    const [locationType, setLocationType] = useState([]);
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [newLocation, setNewLocation] = useState("");


    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/location/");
                setLocations(response.data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
    }, []);
    useEffect(() => {
        if (locationType) {
            const filtered = locations.filter((location) => location.type === locationType);
            setFilteredLocations(filtered);
        } else {
            setFilteredLocations(locations);
        }
    }, [locationType, locations]);
    console.log(props.selectedEquipment);
    const handleSubmit = (event) => {
        const updatedLocation = newLocation ? newLocation : location;
        event.preventDefault();
        const updatedCondition = {
            id: props.selectedEquipment.id,
            created_by: props.selectedEquipment.created_by,
            name: props.selectedEquipment.name,
            brand: props.selectedEquipment.brand,
            model: props.selectedEquipment.model,
            categorie: props.selectedEquipment.categorie,
            reference: props.selectedEquipment.reference,
            num_serie: serialNumber,
            condition: condition,
            facture_number: props.selectedEquipment.facture_number,
            date_purchase: props.selectedEquipment.date_purchase,
            Location: updatedLocation,
            date_assignment: props.selectedEquipment.date_assignment,
            discription: description,
            image: event.target.image.files[0],
            is_reserved: props.selectedEquipment.is_reserved,
            is_requested: props.selectedEquipment.is_requested,
        }
        console.log(updatedCondition.image)
        console.log(updatedCondition)
        fetch(`http://127.0.0.1:8000/inventory/${props.selectedEquipment.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorozitation': `Token ${cookies.token}`
            },
            body: JSON.stringify(updatedCondition)
        })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    props.handleUpdateCondition(data.data);
                    setMessage(<p style={{color: 'green', paddingBottom: '10px'}}>{data.message}</p>);
                    console.log(data);
                } catch (error) {
                    console.log(text);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    const handleCancel = () => {
        props.setConditionForm(false)
    };

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setPreviewImage(imageUrl);
    };
    const handleConditionChange = (event) => {
        const selectedOption = event.target.value;
        const selectedValue = CONDITION_CHOICES.find(([value, label]) => value === selectedOption)[0];
        setCondition(selectedValue);
        console.log(selectedValue)
    }
    const handleSerialNumberChange = (event) => {
        setSerialNumber(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    const handleLocationChange = (event) => {
        const selectedLocation = event.target.value;
        setNewLocation(selectedLocation);
        console.log("Selected Location:", selectedLocation);
    };


    return(
        <>
            <div className="add-form">
                <h2>Update equipment condition</h2>
                {message && message}
                <form onSubmit={handleSubmit} onClick={() => setMessage(null)}>
                    <div className="form-container-form-infos-input-img">
                        <label htmlFor="image">
                            {previewImage ? (
                                <img className="preview-image" src={previewImage} alt="Preview"/>
                            ) : (
                                <svg width="83" height="83" viewBox="0 0 83 83" fill="none"
                                >
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
                    <div className="add-form-input">
                        <label htmlFor="serialnumber">Current location</label>
                        <input
                            disabled={true}
                            type="text"
                            id="location"
                            className="add-form-input-input"
                            value={location}
                        />
                    </div>
                    <div className="add-form-input">
                        <label htmlFor="name">Condition</label>
                        <select
                            id="condition"
                            className="add-form-input-input"
                            value={condition}
                            onChange={handleConditionChange}
                        >
                            <option value="">Select condition</option>
                            {CONDITION_CHOICES.map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="add-form-input">
                        <label htmlFor="type">Type</label>
                        <select
                            id="type"
                            className="add-form-input-input"
                            value={locationType}
                            onChange={(event) => {
                                setLocationType(event.target.value);
                                console.log("Selected Location Type:", event.target.value);
                                const filtered = locations.filter((location) => location.type === event.target.value);
                                setFilteredLocations(filtered);
                                if (filtered.length === 1) {
                                    setNewLocation(filtered[0].name);
                                    console.log("Selected Location:", filtered[0].name);
                                }
                            }}
                            /*onFocus={() => {
                                setError(null);
                                setSuccessMessage(null);
                            }}*/
                            /*onFocus={() => {
                                setError(null);
                                setSuccessMessage(null);
                            }}*/
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
                        <label htmlFor="type">New location</label>
                        <select
                            id="type"
                            className="add-form-input-input"
                            value={newLocation}
                            onChange={handleLocationChange}
                            onClick={handleLocationChange}
                        >
                            <option value="">-- Select location --</option> // Add the default option
                            {filteredLocations.map((location) => (
                                <option value={location.name} key={location.id}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="add-form-input">
                        <label htmlFor="serialnumber">Serial number</label>
                        <input
                            type="number"
                            id="serialnumber"
                            className="add-form-input-input"
                            value={serialNumber}
                            onChange={handleSerialNumberChange}
                        />
                    </div>
                    <div className="add-form-input">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            className="add-form-input-input"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                    <div className="add-form-actions">
                        <button type="submit" className="add-form-actions-submit">
                            Update condition
                        </button>
                        <button
                            className="add-form-actions-discard"
                            onClick={handleCancel}
                        >
                            Discard
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default ConditionForm;