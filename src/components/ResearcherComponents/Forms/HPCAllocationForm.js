import {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

const HPCAllocationForm = (props) => {
    const [locations, setLocations] = useState([]);
    const [references, setReferences] = useState([]);
    const [usedReferences, setUsedReferences] = useState([]);
    const [selectedReference, setSelectedReference] = useState("");
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [message, setMessage] = useState(null)
    const [cookies] = useCookies(["token"]);


    useEffect(() => {
        fetch('http://172.20.10.4:8000/location/')
            .then(response => response.json())
            .then(data => {
                setLocations(data);
            })
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://172.20.10.4:8000/allocatehpc/');
                const data = response.data;
                const usedReferences = data.map(item => item.reference)
                console.log(usedReferences)
                setUsedReferences(usedReferences)

            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const filterEquipmentsByLocation = () => {
            const itRoom = locations.filter(location => location.type === "it_room");
            const itRoomNames = itRoom.map(item => item.name);
            console.log(itRoomNames);

            fetch("http://172.20.10.4:8000/inventory/")
                .then(response => response.json())
                .then(data => {
                    const filteredEquipments = data.filter(equipment => itRoomNames.includes(equipment.Location));
                    console.log(filteredEquipments);
                    const reference = filteredEquipments.map(item => item.reference);
                    console.log(reference)
                    setReferences(reference);
                })
                .catch(error => console.error(error));
        };
        filterEquipmentsByLocation();
    }, [locations]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            reference: selectedReference,
            start_date: selectedStartDate,
            purpose: 'for researching',
        };
        const config = {
            headers: {
                Authorization: `Token ${cookies.token}`,
            },
        };

        console.log(data)

        // Send the POST request
        axios.post("http://172.20.10.4:8000/allocatehpc/", data, config)
            .then((response) => {
                // Handle the response
                console.log("Allocation successful");
                setMessage(<p style={{color: 'green'}}>Allocation successful!</p>)
            })
            .catch((error) => {
                // Handle errors
                console.error("Allocation error:", error);
                setMessage(<p style={{color: 'red'}}>Allocation error</p>)
            });
    };

    return(
        <div className="add-form" onClick={() => setMessage(null)}>
            <h2>New HPC allocation</h2>
            {message && message}
            <form onSubmit={handleSubmit}>
                <div className="add-form-input">
                    <label htmlFor="type">HPC</label>
                    <select
                        id="type"
                        className="add-form-input-select"
                        value={selectedReference}
                        onChange={(event) => setSelectedReference(event.target.value)}
                    >
                        <option value="">Select HPC</option>
                        {references.map((reference, index) => {
                            if (!usedReferences.includes(reference)) {
                                return (
                                    <option key={index} value={reference}>
                                        {reference}
                                    </option>
                                );
                            }
                            return null;
                        })}
                    </select>
                </div>
                <div className="add-form-input">
                    <label className="input-label">Date and Time</label>
                    <input
                        type="datetime-local"
                        className="add-form-input-input"
                        value={selectedStartDate}
                        onChange={(event) => setSelectedStartDate(event.target.value)}
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

export default HPCAllocationForm;