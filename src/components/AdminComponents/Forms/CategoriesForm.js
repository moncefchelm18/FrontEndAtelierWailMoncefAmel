import React, { useState } from "react";

const CategoriesForm = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [existError, setExistError] = useState(null);
    const [succesMessage, setSuccesMessage] = useState(null)

    // error and succes message
    const ErrorMessage = (props) => {
        return (
            <>
                <div style={{ color: "red" }}>{props.title}</div>
            </>
        );
    };

    const SuccesMessage = () => {
        return (
            <>
                <div style={{ color: "green" }}>Categorie added successfully!</div>
            </>
        )
    }

    // when submit
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || !description) {
            event.preventDefault();
            setError(<ErrorMessage/>)
            return;
        }
        const data = {
            id: Math.random(),
            Id_admin: 1,
            name: name,
            discription: description,
            created_on: new Date(),
        };

        fetch("http://127.0.0.1:8000/categories/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    console.log('hellsqdqsdo');
                    setExistError(true);
                    setSuccesMessage(false);
                    throw new Error('category already exist');
                }
                return response.json()
            })
            .then(data => {
                console.log(data);
                props.getUpdatedData(data);
                setSuccesMessage(<SuccesMessage/>);
                setExistError(false)
                // Do something with the response data, e.g. update state
            })
            .catch(error => {
                console.error(error);
                // setError(error.message);
                // Handle errors
            });
    };

    return(
        <div className="add-form">
            <h2>New equipement categorie</h2>
            {error && <ErrorMessage title={'Please fill all columns.'} />}
            {existError && <ErrorMessage title={'Categorie already exist.'}/>}
            {succesMessage && <SuccesMessage />}
            <form onSubmit={handleSubmit}>
                <div className="add-form-input">
                    <label htmlFor="categorie">
                        Categorie
                    </label>
                    <input
                        type="text"
                        id="categorie"
                        className="add-form-input-input"
                        placeholder="Enter categorie name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        onFocus={() => {
                            setError(null);
                            setSuccesMessage(null);
                        }}
                    />
                </div>
                <div className="add-form-input">
                    <label htmlFor="description">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        className="add-form-input-input"
                        placeholder="write a description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        onFocus={() => {
                            setError(null);
                            setSuccesMessage(null);
                        }}
                    />
                </div>
                <div className="add-form-actions">
                    <button type="submit" className="add-form-actions-submit">Add categorie</button>
                    <button className="add-form-actions-discard" onClick={props.handleCancelForm}>Discard</button>
                </div>
            </form>
        </div>
    )
};

export default CategoriesForm;
