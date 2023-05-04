
const HPCAllocationForm = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return(
        <div className="add-form">
            <h2>New HPC allocation</h2>
            <form onSubmit={handleSubmit}>
                <div className="add-form-input">
                    <label className="input-label">Date</label>
                    <input type="date" className="add-form-input-input"/>

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