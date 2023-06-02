import { useState } from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

const AllocationForm = (props) => {
    const currentDate = new Date();
    const minStartDate = currentDate.toISOString().split("T")[0];
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");
    const [purpose, setPurpose] = useState("");
    const [message, setMessage] = useState(null);
    const [cookies] = useCookies(['token']);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            reference: props.reference,
            start_date: startDate,
            finish_date: finishDate,
            purpose: purpose,
        };// Check if start date and finish date are valid
        const selectedStartDate = new Date(startDate);
        const selectedFinishDate = new Date(finishDate);

        if (!selectedStartDate || !selectedFinishDate || !purpose){
            setMessage(<p style={{ color: "red" }}>Please fill specified columns.</p>)
        }
        if (selectedStartDate > selectedFinishDate || selectedFinishDate - selectedStartDate > 31 * 24 * 60 * 60 * 1000) {
            setMessage(<p style={{ color: "red" }}>The selected dates are invalid. Please ensure the duration does not exceed 31 days.</p>);
            return;
        }

        console.log(data)

        try {
            const response = await axios.post("http://127.0.0.1:8000/allocate/", data, {
                headers: {
                    'Authorization': `Token ${cookies.token}`
                }
            });

            // Handle the response as needed
            console.log(response.data);

            // Clear form inputs
            setStartDate("");
            setFinishDate("");
            setPurpose("");
            setMessage(<p style={{ color: "green" }}>The allocation request has been successfully submitted. Please await approval from the manager.</p>);
        } catch (error) {
            // Handle errors
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(<p style={{ color: "red" }}>{error.response.data.message}</p>);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <>
            <div className="add-form">
                <h2>New HPC allocation</h2>
                <form onSubmit={handleSubmit}>
                    {message && message}
                    <div className="add-form-input">
                        <label className="input-label">Start Date</label>
                        <input
                            type="date"
                            className="add-form-input-input"
                            value={startDate}
                            min={minStartDate}
                            onChange={(event) => setStartDate(event.target.value)}
                        />
                    </div>
                    <div className="add-form-input">
                        <label className="input-label">Finish Date</label>
                        <input
                            type="date"
                            className="add-form-input-input"
                            value={finishDate}
                            min={startDate}
                            onChange={(event) => setFinishDate(event.target.value)}
                        />
                    </div>
                    <div className="add-form-input">
                        <label className="input-label">Purpose</label>
                        <textarea
                            className="add-form-input-input"
                            value={purpose}
                            onChange={(event) => setPurpose(event.target.value)}
                        />
                    </div>
                    <div className="add-form-actions">
                        <button type="submit" className="add-form-actions-submit">
                            Add
                        </button>
                        <button className="add-form-actions-discard" onClick={props.handleCancelForm}>
                            Discard
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AllocationForm;